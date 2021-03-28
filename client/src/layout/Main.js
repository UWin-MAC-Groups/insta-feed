import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from "../pages/Home";
import PostPage from '../pages/PostPage';

function Main(props) {
    const { typeSetting, sortSetting, tag, getNavType } = props;

    return(
        <Switch>
            <Route exact path='/' render={(props) => <Home {...props} title={'home'} typeSetting={typeSetting} sortSetting={sortSetting} tag={tag} getNavType={getNavType} />} />
            <Route path='/posts/:postId' render={(props) => <PostPage {...props} title={'post'} getNavType={getNavType} />} />
        </Switch>
    )
}

export default Main;
