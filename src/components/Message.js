import React from "react";
import { useMessageContext } from "../context/MessageContext";

const Message = ({ data }) => {
    const { state, dispatch } = useMessageContext();
    const { id, text, source, timestamp } = data;

    function convertToHours(timestamp) {
        const formattedTime = new Date(timestamp).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return formattedTime;
    }

    const handleDelete = async (id) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const token = process.env.REACT_APP_AUTH_TOKEN;
        await fetch(`${apiUrl}${id}`, {
            method:'DELETE',
            headers: {
                'Authorization': token,
            },
        });
        dispatch({ type: 'DELETE_MESSAGE', payload: id });
    };

    return (
        <div>
            <div className="d-flex flex-row">
                <p>💬</p><p className="px-2"><b>{source}</b></p><p className="px-2">{convertToHours(timestamp)}</p><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>Delete</button>
            </div>
            <p className="ps-3">{text}</p>
        </div>
    )
}

export default Message;