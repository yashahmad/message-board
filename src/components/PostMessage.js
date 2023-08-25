import React, { useState } from 'react';

const PostMessage = () => {
    const [text, setText] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = process.env.REACT_APP_AUTH_TOKEN;

    const handlePost = async (e) => {
        e.preventDefault();
        const response = await fetch(apiUrl,{
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        const data = await response.json();

        setText('');
    }

    const handleDeleteAllMessages = () => {
        //
    }

    return (
        <>
            <div className="mb-3">
                <p>Type something in the box below, then hit "Post"</p>
                <div className="d-flex flex-row">
                    <div className="col-md-6">
                        <input type="text" name="text" className="form-control" value={text} onChange={e => setText(e.target.value)} />
                    </div>
                    <div className="px-1">
                        <button className="btn btn-outline-success" onClick={handlePost}>Post</button>
                    </div>
                    <div className="">
                        <button className="btn btn-outline-danger" onClick={handleDeleteAllMessages}>Delete All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostMessage;