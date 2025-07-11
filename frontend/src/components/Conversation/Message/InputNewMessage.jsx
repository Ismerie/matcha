import { useState, useRef } from 'react';
import { API_URL } from '../../../utils/constants';
import Request from '../../../utils/request';
import { useAuthentified } from '../../AuthentifiedContext';

export default function InputNewMessage({roomSelected}) {
    const [newMessage, setNewMessage] = useState("");
    const textareaRef = useRef(null);


    const handleSendNewMessage = async () => {
        if (newMessage.trim() === "") 
            return;

        const res = await Request.sendNewMessage(newMessage, roomSelected.room_id, roomSelected.contact_id);
        if (res.success) {
            setNewMessage("");
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    }

    return (
        <div className='bg-gray-200 p-3 rounded-md m-3 flex items-end mb-16 sm:mb-3'>
            <textarea
                className='bg-gray-200 resize-none w-full outline-none overflow-hidden max-h-48 overflow-y-auto'
                ref={textareaRef}
                rows={1}
                placeholder='Mon message...'
                id="newMessage"
                value={newMessage}
                onChange={(e) => {
                    setNewMessage(e.target.value);
                    const target = e.target;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendNewMessage();
                    }
                }}
            />
            <button className='justify-end ml-2' onClick={handleSendNewMessage}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M18.1437 3.63083C16.9737 3.83896 15.3964 4.36262 13.1827 5.10051L8.17141 6.77094C6.39139 7.36428 5.1021 7.79468 4.19146 8.182C3.23939 8.58693 2.90071 8.86919 2.79071 9.0584C2.45191 9.64118 2.45191 10.361 2.79071 10.9437C2.90071 11.1329 3.23939 11.4152 4.19146 11.8201C5.1021 12.2075 6.39139 12.6379 8.17141 13.2312C8.19952 13.2406 8.22727 13.2498 8.25468 13.2589C8.63431 13.3852 8.94795 13.4895 9.22198 13.6328L14.5454 8.36811C14.8471 8.06974 15.3335 8.07243 15.6319 8.37413C15.9303 8.67583 15.9276 9.16229 15.6259 9.46067L10.3259 14.7022C10.4912 14.994 10.603 15.3302 10.7411 15.7453C10.7502 15.7727 10.7594 15.8005 10.7688 15.8286C11.3621 17.6086 11.7925 18.8979 12.1799 19.8085C12.5848 20.7606 12.867 21.0993 13.0563 21.2093C13.639 21.5481 14.3588 21.5481 14.9416 21.2093C15.1308 21.0993 15.4131 20.7606 15.818 19.8085C16.2053 18.8979 16.6357 17.6086 17.2291 15.8286L18.8995 10.8173C19.6374 8.60363 20.161 7.02627 20.3692 5.85629C20.5783 4.68074 20.4185 4.1814 20.1185 3.88146C19.8186 3.58152 19.3193 3.42171 18.1437 3.63083ZM17.8746 2.11797C19.1768 1.88632 20.3496 1.93941 21.2051 2.79491C22.0606 3.65041 22.1137 4.82322 21.882 6.12542C21.6518 7.41975 21.0903 9.10415 20.3794 11.2367L18.6745 16.3515C18.096 18.0869 17.6465 19.4354 17.232 20.41C16.8322 21.35 16.3882 22.1457 15.7139 22.5377C14.6537 23.1541 13.3442 23.1541 12.284 22.5377C11.6096 22.1457 11.1657 21.35 10.7658 20.41C10.3513 19.4354 9.90184 18.0869 9.32338 16.3515L9.31105 16.3145C9.10838 15.7065 9.04661 15.5416 8.95909 15.4109C8.86114 15.2646 8.73545 15.1389 8.58913 15.0409C8.4584 14.9534 8.29348 14.8916 7.68549 14.689L7.64845 14.6766C5.91306 14.0982 4.56463 13.6487 3.59005 13.2342C2.64996 12.8343 1.85431 12.3904 1.46228 11.716C0.845907 10.6558 0.845908 9.34634 1.46228 8.28611C1.85431 7.61177 2.64996 7.16781 3.59005 6.76797C4.56464 6.35345 5.91309 5.90397 7.64852 5.3255L12.7633 3.62057C14.8959 2.9097 16.5803 2.34822 17.8746 2.11797Z" fill={newMessage.trim() != "" ? "#d81159" : "#d35b87fd"}></path> </g></svg>
            </button>
        </div>
    )                
}
