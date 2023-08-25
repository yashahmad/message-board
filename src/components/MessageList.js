import React, { useState, useEffect } from "react";
import { useMessageContext } from "../context/MessageContext";
import { Pagination } from 'react-bootstrap';

const MessageList = () => {
    const { state, dispatch } = useMessageContext();
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 2;

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = process.env.REACT_APP_AUTH_TOKEN;

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': token,
                },
            });
            const data = await response.json();
            // setMessage(data);
            dispatch({ type: 'SET_MESSAGE', payload: data });
        };
        fetchMessages();
    }, [dispatch])

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = state.messages.slice(indexOfFirstMessage, indexOfLastMessage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {currentMessages.map(message => (
                <div key={message.id}>
                    <Message data={message} />
                </div>
            ))}
            <Pagination>
                {Array.from({ length: Math.ceil(state.messages.length / messagesPerPage) }, (_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

const Message = ({ data }) => {
    const { text, source, timestamp } = data;

    function convertToHours(timestamp) {
        const formattedTime = new Date(timestamp).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return formattedTime;
    }

    return (
        <div>
            <div className="d-flex flex-row">
                <p>💬</p><p className="px-2"><b>{source}</b></p><p className="px-2">{convertToHours(timestamp)}</p><a href=''>Delete</a>
            </div>
            <p className="ps-3">{text}</p>
        </div>
    )
}

export default MessageList;