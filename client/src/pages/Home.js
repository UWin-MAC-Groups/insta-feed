import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { PostForm, PostsList } from '../components';

function Home(props) {
    const [postsArray, setPostsArray] = useState([]);
    const { typeSetting, sortSetting, tag, getNavType } = props;
    const limit = 10;
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getNavType("main");
        setIsLoading(true);
        fetch(`/api/v1/posts?limit=${limit}&skip=${skip}&type=${typeSetting.value}&sortBy=${sortSetting.field}&order=${sortSetting.value}&tag=${tag}`)
          .then(response => response.json())
          .then(data => {
                setIsLoading(false);
                setPostsArray(data.data);
            });
    }, [typeSetting.value, sortSetting.value, sortSetting.field, tag, limit, skip, getNavType]);

    return (
        <div className="container-fluid pt-3">
            <PostForm />
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
            <PostsList posts={postsArray} />
        </div>
    )
}

export default Home;
