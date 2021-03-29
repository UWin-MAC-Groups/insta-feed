import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Post from './Post';

function PostsList(props) {
    const { typeSettingValue, sortSettingValue, sortSettingField, tag } = props;
    const limit = 10;
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [postsArray, setPostsArray] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isEndOfPage, setIsEndOfPage] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/posts?limit=${limit}&skip=${skip}&type=${typeSettingValue}&sortBy=${sortSettingField}&order=${sortSettingValue}&tag=${tag}`)
          .then(response => response.json())
          .then(data => {
                setIsLoading(false);
                setPostsArray(data.data);
            });
    }, [typeSettingValue, sortSettingValue, sortSettingField, tag, limit, skip]);

    useEffect(() => {
        if(!isEndOfPage) {
            window.addEventListener('scroll', debounce(handleScroll, 50));
            return () => window.removeEventListener('scroll', debounce(handleScroll, 50));
        }
        else {
            setIsFetching(false)
        };
    }, [isEndOfPage]);
    
    useEffect(() => {
        if (!isFetching || isEndOfPage) return;
        fetchMoreListItems();
    }, [isFetching, isEndOfPage]);
    
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching || isEndOfPage) return;
        setSkip(prevState => prevState + limit)
        setIsFetching(true);
    }

    const debounce = (func, delay) => {
        let inDebounce;
        return function() {
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        }
    }
    
    function fetchMoreListItems() {
        if(!isEndOfPage){
            fetch(`/api/v1/posts?limit=${limit}&skip=${skip}&type=${typeSettingValue}&sortBy=${sortSettingField}&order=${sortSettingValue}&tag=${tag}`)
              .then(response => response.json())
              .then(data => {
                  if(data.data.length > 0) {
                    setPostsArray(prevState => ([...prevState, ...data.data]));
                    setIsFetching(false);
                  }
                  else {
                    setIsFetching(false);
                    setIsEndOfPage(true);
                  }
                });
        }
    }

    const renderPostsList = (posts) => {
        if(posts && (typeof posts != "string")) {
            return posts.map((post, e) => {
                return <Post key={e} post={post} page={"home"} />
            });
        }
        else {
            return <div className="">
                <p className="text-center">An error occured</p>
            </div>;
        }
    }
    return(
        <div className="row">
            <div className="col-lg-6 offset-lg-3">
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
                {renderPostsList(postsArray)}
                {isFetching && 'Fetching more posts..'}
                {isEndOfPage &&
                    <div className="container-fluid text-center p-5">        
                        <p>You have reached the end</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PostsList;
