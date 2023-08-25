import React, { useState, useEffect } from "react";
import { useMessageContext } from "../context/MessageContext";
import Message from './Message';
import { Pagination } from 'react-bootstrap';

const MessageList = () => {
    const { state, dispatch } = useMessageContext();
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 3;

    const [sortCriteria, setSortCrtiteria] = useState('default');

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = process.env.REACT_APP_AUTH_TOKEN;
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
    const sortedMessages = [...state.messages].sort((a, b) => 
        sortCriteria === 'timestamp-asc' ? a.timestamp.localeCompare(b.timestamp) : sortCriteria === 'timestamp-desc' ? b.timestamp.localeCompare(a.timestamp) : []
    )
    const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortChange = (criteria) => {
        setSortCrtiteria(criteria);
    }

    return (
        <div>
            <div className="d-flex flex-row-reverse">
                <div className="col-2 px-3">
                    <select className="form-select form-select-sm" onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="timestamp-asc">Timestamp (ASC)</option>
                        <option value="timestamp-desc">Timestamp (DESC)</option>
                    </select>
                </div>
                <p className="py-auto">Sort by: </p>
            </div>
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