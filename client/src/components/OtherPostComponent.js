import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { typeSettings } from '../utils/settings';
import Comment from '../components/Comment';

function OtherPostComponent(props) {
    const { post, icon, postSource, postTime } = props;
    
    const types = typeSettings.slice(1);

    return (
        <div className="card mb-3 post-card">
            {post.type === types[1].value && 
                <img className="card-img-top" alt="Post" src={postSource} />
            }
            {post.type === types[2].value && 
                <video className="card-img-top" src={postSource} autoPlay loop></video>
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
            <div className="card-body">
                <div className="d-flex">
                    <p className="float-right mb-o">{postTime}</p>
                    <p className="ml-auto"><i className={`fa fas ${icon}`}></i></p>
                </div>              
                <p>{post.content}</p>
                <div className="d-flex justify-content-between mb-2">
                    <p className="mb-0"><i className="fa fas fa-heart"></i> {post.likes}</p>
                    <p className="mb-0"><i className="fa fas fa-eye"></i> {post.views}</p>
                    <p className="mb-0"><i className="fa fas fa-comment"></i> {post.commentsCount}</p>
                </div>

                <h5 className="card-title">Comments</h5>
                {post.comments.map((comment, e) => (
                    <Comment key={e} comment={comment} />
                ))}

                <form className="mt-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Add comment" aria-label="Add comment"
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary if-btn-search" 
                                type="button" 
                                aria-label="Comment"
                            >
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OtherPostComponent;
