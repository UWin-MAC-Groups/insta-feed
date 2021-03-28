import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Post from '../components/Post'

function PostPage(props) {
    const { match, getNavType } = props;

    const postId = match.params.postId;
    const url = `/api/v1/posts/${postId}`;
    const [ post, setPost ] = useState({});
    const [ isFailed, setIsFailed ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        getNavType("other");

        setIsLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setPost(data.data[0])
            setIsLoading(false);
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
                    { (isFailed && !isLoaded) && 
                        <div className="card mb-3 post-card">
                            <p>An error occured</p>
                        </div>
                    }

                    {isLoading &&
                        <div className="container-fluid text-center p-5">        
                            <Loader
                            type="RevolvingDot"
                            color="#A63E44"
                            height={100}
                            width={100}
                            />
                        </div>
                    }

                    { (!isFailed && isLoaded) && 
                        <Post post={post} page={"other"} />
                    }
                </div>
            </div>
        </div>
    )
}

export default PostPage;
