import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { typeSettings } from '../utils/settings';
import { getFileSource } from '../utils/helpers';
import HomePostComponent from './HomePostComponent';
import OtherPostComponent from './OtherPostComponent';

function Post(props) {
    const { post, page } = props;
    
    const [ icon, setIcon ] = useState("fa fa-keyboard");
    const [ postSource, setPostSource ] = useState("");
    const [ postTime, setPostTime ] = useState("");
    
    const ageOfPost = moment(post.createdAt).fromNow(true).split(" ")[0];
    
    const types = typeSettings.slice(1);

    useEffect(() => {
        if(post.type === types[0].value){
            setIcon(types[0].icon);
        }
        else if (post.type === types[1].value) {
            setIcon(types[1].icon);
            setPostSource(getFileSource(post));
        }
        else if(post.type === types[2].value) {
            setIcon(types[2].icon);
            setPostSource(getFileSource(post));
        }
        else {
            setIcon(types[3].icon);
            setPostSource(getFileSource(post));
        }

        if(!isNaN(parseInt(ageOfPost)) || (moment(post.createdAt).fromNow() === "a minute ago" || moment(post.createdAt).fromNow() === "a few seconds ago")) {
            setPostTime(moment(post.createdAt).fromNow())
        }
        else {
            setPostTime(moment(post.createdAt).format("MMM D YYYY"))
        }
    }, [post.type, post.createdAt, ageOfPost, post, types])

    const renderPostDetails = () => {
        if(page === "home") {
            return <HomePostComponent post={post} postSource={postSource} postTime={postTime} icon={icon} />
        }
        else {
            return <OtherPostComponent post={post} postSource={postSource} postTime={postTime} icon={icon} />
        }
    }

    return(
        <React.Fragment>
            { renderPostDetails() }
        </React.Fragment>
    )
}

export default Post;
