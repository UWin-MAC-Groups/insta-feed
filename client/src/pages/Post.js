import React from 'react';

function Post(props) {
    return(
        <div className="card">
            <div className="card-body">
                <p>{props.post.content}</p>
            </div>
        </div>
    )
}

export default Post;
