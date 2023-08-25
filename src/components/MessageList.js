import React,{ useState, useEffect } from "react";

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = process.env.REACT_APP_AUTH_TOKEN;

    const fetchMessages = async () => {
        const response = await fetch(apiUrl,{
            headers: {
                'Authorization': token,
            },
        });
        const data = await response.json();
        setMessages(data);
    };
    useEffect(() => {
        fetchMessages();
    },[])

    return (
        <div>
            {messages.map(message => (
                <div key={message.id}>
                    <Message data={message}/>
                </div>
            ))}
        </div>
    )
}

const Message = ({data}) => {
    const { text, source, timestamp } = data;
    return(
        <div>
            <div className="d-flex flex-row">
                <p>💬</p><p>{source}</p><p>{timestamp}</p> <a href=''>Delete</a>
            </div>
            <p className="ps-3">{text}</p>
        </div>
    )
}

export default MessageList;