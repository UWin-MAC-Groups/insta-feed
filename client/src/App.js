import React, { useState } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './layout/Main';
import { defaultNavigation, defaultSortSetting, defaultTypeSetting } from './utils/settings';

function App() {
  const [navType, setNavType] = useState(defaultNavigation);
  const [typeSetting, setTypeSetting] = useState(defaultTypeSetting);
  const [sortSetting, setSortSetting] = useState(defaultSortSetting);
  const [tag, setTag] = useState("");

  const getTypeSetting = (name, value) => {
    setTypeSetting({ name, value });
  }
  const getSortSetting = (name, field, value) => {
    setSortSetting({ name, field, value });
  }

  const getTag = (value) => {
    setTag(value);
  }

  const getNavType = (navType) => {
    setNavType(navType);
  }

  return(
    <div>
      <Header getTypeSetting={getTypeSetting} getSortSetting={getSortSetting} getTag={getTag} navType={navType} />
      <Main typeSetting={typeSetting} sortSetting={sortSetting} tag={tag} getNavType={getNavType} />
      <Footer />
    </div>
  );
}

export default App;
