import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { typeSettings } from '../utils/settings';

function HomePostComponent(props) {
    const { post, icon, postSource, postTime } = props;
    const postId = post._id;
    const types = typeSettings.slice(1);

    const likePost = () => {
        const requestOptions = {
            method: 'PUT',
        };
        fetch(`/api/v1/posts/${postId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();              
            })
            .catch(e => {
                alert("Unable to like")
            });
    }

    return (
        <div className="card mb-3">
            {post.type === types[1].value && 
                <img className="card-img-top" alt="Post" src={postSource} />
            }
            {post.type === types[2].value && 
                <video className="card-img-top" src={postSource} autoPlay loop controls></video>
            }
            {post.type === types[3].value && 
                <div className="pt-3">
                    <AudioPlayer
                        src={postSource}
                        customAdditionalControls={[]}
                    />
                </div>
            }
            <div className="card-body pb-0">
                <a href={`/posts/${post._id}`} className="post-card">
                    <div className="d-flex">
                        <p>{post.content}</p>
                        <p className="ml-auto"><i className={`fa fas ${icon}`}></i></p>
                    </div>
                </a>
                <div className="d-flex justify-content-between">
                    <p className="mb-0 btn btn-link if-btn-link" role="button" 
                        onClick={likePost}
                    >
                        <i className="fa fas fa-heart"></i> {post.likes}
                    </p>
                    <p className="mb-0"><i className="fa fas fa-eye"></i> {post.views}</p>
                    <p className="mb-0"><i className="fa fas fa-comment"></i> {post.commentsCount}</p>
                </div>
                <p className="float-right mb-o">{postTime}</p>
            </div>
        </div>
    )
}

export default HomePostComponent;
