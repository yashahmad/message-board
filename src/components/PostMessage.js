import React, { useState } from 'react';

const PostMessage = () => {
    const [text, setText] = useState('');

    const handlePost = () => {
        //
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