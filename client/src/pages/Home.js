import React, { useEffect } from 'react';
import { PostForm, PostsList } from '../components';

function Home(props) {
    const { typeSetting, sortSetting, tag, getNavType } = props;

    useEffect(() => {
        getNavType("home");
    }, [getNavType])

    return (
        <div className="container-fluid pt-3">
            <PostForm />
            <PostsList 
                typeSettingValue={typeSetting.value} 
                sortSettingValue={sortSetting.value} 
                sortSettingField={sortSetting.field} 
                tag={tag}  
            />
        </div>
    )
}

export default Home;
