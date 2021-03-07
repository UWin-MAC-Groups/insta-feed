import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { typeSettings } from '../utils/settings';

function Post(props) {
    const { post } = props;
    const [ icon, setIcon ] = useState("fa fa-keyboard");
    const [ postTime, setPostTime ] = useState("");

    const ageOfPost = moment(post.createdAt).fromNow(true).split(" ")[0];
    

    useEffect(() => {
        const types = typeSettings.slice(1);
        if(post.type === types[0].value){
            setIcon(types[0].icon);
        }
        else if (post.type === types[1].value) {
            setIcon(types[1].icon);
        }
        else if(post.type === types[2].value) {
            setIcon(types[2].icon);
        }
        else {
            setIcon(types[3].icon);
        }

        if(!isNaN(parseInt(ageOfPost)) || (moment(post.createdAt).fromNow() === "a minute ago" || moment(post.createdAt).fromNow() === "a few seconds ago")) {
            setPostTime(moment(post.createdAt).fromNow())
        }
        else {
            setPostTime(moment(post.createdAt).format("MMM D YYYY"))
        }
    }, [post.type, post.createdAt, ageOfPost])

    return(
        <a href={`/posts/${post._id}`} className="card mb-1 post-card">
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

export default Post;
