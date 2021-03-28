import React, { useState, useEffect } from 'react';
import { PostForm, PostsList } from '../components';

function Home(props) {
    const [postsArray, setPostsArray] = useState([]);
    const { typeSetting, sortSetting, tag, getNavType } = props;
    const [limit , setLimit] = useState(10);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        getNavType("main");
        fetch(`/api/v1/posts?limit=${limit}&skip=${skip}&type=${typeSetting.value}&sortBy=${sortSetting.field}&order=${sortSetting.value}&tag=${tag}`)
          .then(response => response.json())
          .then(data => {
              setPostsArray(data.data);
            });
    }, [typeSetting.value, sortSetting.value, sortSetting.field, tag, limit, skip, getNavType]);

    return (
        <div className="container-fluid pt-3">
            <PostForm />
            <PostsList posts={postsArray} />
        </div>
    )
}

export default Home;
