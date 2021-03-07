import React from 'react';
import { MainNav, OtherNav } from '../components';

function Header(props) {
    const renderNavigation = () => {
        if(props.navType === "main") {
            return <MainNav getTypeSetting={props.getTypeSetting} getSortSetting={props.getSortSetting} getTag={props.getTag} />;
        }
        else {
            return <OtherNav />
        }
    }

    return(
      <header>
        { renderNavigation() }
      </header>
    );
}
  
export default Header;
