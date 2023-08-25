import React, { useState } from "react";
import DeleteAlert from "./DeleteAlert";

const Message = ({ data }) => {
    const { id, text, source, timestamp } = data;
    const [ alertShow, setAlertShow ] = useState(false);

    function convertToHours(timestamp) {
        const formattedTime = new Date(timestamp).toLocaleTimeString('en-US',{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return formattedTime;
    }

    const alertDelete = () => {
        setAlertShow(!alertShow);
    }

    return (
        <div>
            <div className="d-flex flex-row align-content-between">
                <p>💬</p><p className="px-3"><b>{source}</b></p><p className="px-3">{convertToHours(timestamp)}</p><button className="btn btn-sm btn-outline-danger" style={{height:'30px'}} onClick={() => alertDelete()}>Delete</button>
            </div>
            <p className="ps-3">{text}</p>
            {alertShow ? <><DeleteAlert show={alertShow} onHide={() => setAlertShow(false)} data={id}/></> : <></>}
        </div>
    )
}

export default Message;