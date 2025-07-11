const chat = require('../db/chat');

const firstSelect = async (ws) => {
    try {
        let res_query = await chat.getAllChatsAndMessagesByUserId(ws.user_id);
        if (!res_query)
            ws.close(4001);
        ws.conversations = res_query
        const groupedMessages = groupedMessagesbyIdChat(ws.conversations);
        ws.send(JSON.stringify(groupedMessages));
    }
    catch (err) {
        console.log(err);
        ws.close(4001);
    }
}

const groupedMessagesbyIdChat = (messages) => {
    const grouped = {};
	messages.forEach(messageRow => {
		if (!grouped[messageRow.chat_id]) {
			grouped[messageRow.chat_id] = {
				chatId: messageRow.chat_id,
				user1: messageRow.user1,
				user2: messageRow.user2,
				messages: []
			};
		}
		grouped[messageRow.chat_id].messages.push({
			sender: messageRow.sender,
			receiver: messageRow.receiver,
			message: messageRow.message,
			created: messageRow.created,
			view: messageRow.view
		});
	});

	return Object.values(grouped);
}

const checkNewConversations = async (ws) => {
    try {
        let res_query = await chat.getAllChatsAndMessagesByUserId(ws.user_id);
        if (!res_query)
            ws.close(4001);
        if (res_query.length != ws.conversations?.length) {
            ws.conversations = res_query;
            const groupedMessages = groupedMessagesbyIdChat(ws.conversations);
            ws.send(JSON.stringify(groupedMessages));
        }
    }
    catch (err) {
        console.log(err);
        ws.close(4001);
    }
}

const checkConversations = async (ws) => {
    if (ws.conversations == null) {
        ws.conversations = [];
        await firstSelect(ws);
    }
    else
        await checkNewConversations(ws);
}

module.exports = { checkConversations };
