require('reflect-metadata');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');
const db = require('./db/db');
const authRouter = require('./routes/auth')
const dataRouter = require('./routes/data')
const profileRouter = require('./routes/profile')
const interactionRouter = require('./routes/interaction')
const adminRouter = require('./routes/admin')
const user = require('./db/user');
const { handleWebSocketMessage } = require('./sockets/handlewebsocketmessage');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

dotenv.config();

const app = express();
const back_port = process.env.BACK_PORT;
const front_port = process.env.FRONT_PORT;
const url1 = process.env.LOCAL_IP;
const url2 = process.env.LOCAL_IP2;
const url3 = process.env.HOST_IP;

app.use(cors({
	origin: [`http://${url1}:${front_port}`, `http://${url2}:${front_port}`, `http://${url3}:${front_port}`],
	methods: ['GET', 'POST', 'PATCH'],
	credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/data', dataRouter);
app.use('/profile', profileRouter);
app.use('/interaction', interactionRouter);
app.use('/admin', adminRouter);
app.use('/uploads', express.static(uploadDir));

db.createTables().catch(err => {
	console.log('Error creating tables: ', err);
	exitServer();
});

const server = http.createServer(app);
const websocket = new WebSocket.Server({ server: server });
server.listen(back_port, '0.0.0.0', () => {
	console.log(`Server is running on http://${url1}:${back_port}, http://${url2}:${back_port} and http://${url3}:${back_port}`);
});

websocket.on('connection', async (ws, req) => {
	const cookies = cookie.parse(req.headers?.cookie);
    const accessToken = cookies?.accessToken;

    if (!accessToken) {
		ws.close(4001);
		return ;
	}
	try {
		const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN_KEY);
		ws.user_id = decoded.id;
		ws.access_token = accessToken;
		ws.data = null;
		ws.chat = null;
		ws.notif = null;
		ws.conversations = null;
		const res_query = await user.selectById(ws.user_id);
		if (!res_query)
			ws.close(4001);
		if (res_query && res_query.status == 'offline')
			await user.connect(ws.user_id, true);
	}
	catch (err) {
		console.log(err);
		ws.close(4001);
	}
    ws.on('message', async (message) => {
        await handleWebSocketMessage(ws, message);
    });

    ws.on('close', async (code) => {
        if (code == 4001 || code == 4002)
			return ;
		try {
			const res_query = await user.selectById(ws.user_id);
			if (res_query && res_query.status == 'online')
				await user.connect(ws.user_id, false);
		}
		catch (err) {
			console.log(err);
		}
    });

    ws.on('error', async (error) => {
        console.log(error);
    });
});

const exitServer = () => {
	console.log('Shutting down server');
	server.close(async () => {
		await db.closePool();
		process.exit(1);
	})
}

module.exports = { websocket }
