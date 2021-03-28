import React, { useEffect, useState } from 'react';
import Post from '../components/Post'

function PostPage(props) {
    const { match, getNavType } = props;

    const postId = match.params.postId;
    const url = `/api/v1/posts/${postId}`;
    const [ post, setPost ] = useState({});
    const [ isFailed, setIsFailed ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false)
    
    useEffect(() => {
        getNavType("other");

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setPost(data.data[0])
            setIsLoaded(true)
        })
        .catch((err) => {
            setIsFailed(true);
        });
    }, [getNavType, url])

    
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 pt-5">
                    { isFailed && 
                        <div className="card mb-3 post-card">
                            <p>An error occured</p>
                        </div>
                    }

                    { isLoaded && 
                        <Post post={post} page={"other"} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PostPage;
