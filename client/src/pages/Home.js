import React, { useState, useEffect } from 'react';
import { PostForm, PostsList } from '../components';

function Home(props) {
    const [postsArray, setPostsArray] = useState([]);
    const { title, typeSetting, sortSetting, tag, navType } = props;
    const [limit , setLimit] = useState(10);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        fetch(`/api/v1/posts?limit=${limit}&skip=${skip}&type=${typeSetting.value}&sortBy=${sortSetting.field}&order=${sortSetting.value}&tag=${tag}`)
          .then(response => response.json())
          .then(data => {
              setPostsArray(data.data);
            });
    }, [typeSetting.value, sortSetting.value, sortSetting.field, tag, limit, skip]);

    return (
        <div className="container-fluid pt-3">
            <PostForm />
            <PostsList posts={postsArray} />
        </div>
    )
}

export default Home;
