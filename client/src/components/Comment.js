import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Comment(props) {
    const { comment } = props;
    const ageOfPost = moment(comment.createdAt).fromNow(true).split(" ")[0];
    const [ postTime, setPostTime ] = useState("");
    
    useEffect(() => {
        if(!isNaN(parseInt(ageOfPost)) || (moment(comment.createdAt).fromNow() === "a minute ago" || moment(comment.createdAt).fromNow() === "a few seconds ago" || moment(comment.createdAt).fromNow() === "an hour ago")) {
            setPostTime(moment(comment.createdAt).fromNow())
        }
        else {
            setPostTime(moment(comment.createdAt).format("MMM D YYYY"))
        }
    }, [comment.createdAt, ageOfPost])

    return(
        <div className="comment-block">
            <span>{props.comment.comment}</span>
            <br/>
            <span className="text-small">{postTime}</span>
        </div>
    )
}

export default Comment;
