import React from 'react';
import { NavLink } from 'react-router-dom';

function OtherNav() {
    return(
        <React.Fragment>
            <nav className="navbar navbar-light">
                <NavLink to="/" className="navbar-brand app-name"><i className="fa fas fa-arrow-left"></i></NavLink>
                <span className="navbar-text app-name">InstaFeed</span>
                <div style={{"width": "50px"}}></div>
            </nav>
        </React.Fragment>
    )
}

export default OtherNav;
