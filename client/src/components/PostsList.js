import React from 'react';
import Post from './Post';

function PostsList(props) {
    const renderPostsList = () => {
        if(props.posts && (typeof props.posts != "string")) {
            return props.posts.map((post, e) => {
                return <Post key={e} post={post} />
            });
        }
        else {
            return <div className="">
                <p className="text-center">An error occured</p>
            </div>;
        }
    }
    return(
        <div className="row">
            <div className="col-lg-6 offset-lg-3">
                {renderPostsList()}
            </div>
        </div>
    )
}

export default PostsList;
