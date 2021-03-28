import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { typeSettings } from '../utils/settings';

function HomePostComponent(props) {
    const { post, icon, postSource, postTime } = props;
    const types = typeSettings.slice(1);

    return (
        <a href={`/posts/${post._id}`} className="card mb-3 post-card">
            {post.type === types[1].value && 
                <img className="card-img-top" alt="Post" src={postSource} />
            }
            {post.type === types[2].value && 
                <video className="card-img-top" src={postSource} autoPlay loop controls></video>
            }
            {post.type === types[3].value && 
                <div className="pt-3">
                    <AudioPlayer
                        autoPlay
                        src={postSource}
                        customAdditionalControls={[]}
                    />
                </div>
            }
            <div className="card-body pb-0">
                <div className="d-flex">
                    <p>{post.content}</p>
                    <p className="ml-auto"><i className={`fa fas ${icon}`}></i></p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="mb-0"><i className="fa fas fa-heart"></i> {post.likes}</p>
                    <p className="mb-0"><i className="fa fas fa-eye"></i> {post.views}</p>
                    <p className="mb-0"><i className="fa fas fa-comment"></i> {post.commentsCount}</p>
                </div>
                <p className="float-right mb-o">{postTime}</p>
            </div>
        </a>
    )
}

export default HomePostComponent;
