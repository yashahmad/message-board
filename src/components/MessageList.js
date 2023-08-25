import React, { useState, useEffect } from "react";
import { useMessageContext } from "../context/MessageContext";
import Message from './Message';
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

export default MessageList;