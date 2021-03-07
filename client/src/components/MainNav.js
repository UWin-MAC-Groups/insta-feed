import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { defaultSortSetting, defaultTypeSetting, sortSettings, typeSettings } from '../utils/settings';

function MainNav(props) {
    const [selectedSort, setSelectedSort] = useState(defaultSortSetting.name);
    const [selectedType, setSelectedType] = useState(defaultTypeSetting.name);
    const [tag, setTag] = useState("");
    const [isFormCollapsed, setIsFormCollapsed] = useState(true);
    const isCollaspedClass = isFormCollapsed ? " hide" : " show";

    return (
        <React.Fragment>
            <nav className="navbar navbar-light">
                <NavLink to="/" className="navbar-brand app-name">InstaFeed</NavLink>
                <ul className="navbar-nav ml-auto flex-row">
                    <li className="nav-item dropdown mr-1">
                        <button className="btn btn-transparent" type="button" id="sortDropdown" data-toggle="dropdown" title="Sort" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fas fa-sort-amount-down"></i>
                        </button>
                        <div className="dropdown-menu position-absolute dropdown-menu-right" aria-labelledby="sortDropdown">
                            {sortSettings && sortSettings.map((sortSetting, e) => {
                                const isSelectedClass = selectedSort.toLowerCase() === sortSetting.name.toLowerCase() ? "active" : "";
                                return <button 
                                    className={`dropdown-item btn btn-link if-btn-link ${isSelectedClass}`} 
                                    key={e}
                                    data-sort-field={sortSetting.field} 
                                    data-sort-value={sortSetting.value}
                                    onClick={() => {
                                        setSelectedSort(sortSetting.name);
                                        props.getSortSetting(sortSetting.name, sortSetting.value);
                                    }}
                                >{sortSetting.name}</button>
                            })}
                        </div>
                    </li>

                    <li className="nav-item dropdown mr-1">
                        <button className="btn btn-transparent" type="button" id="filterDropdown" data-toggle="dropdown" title="Filter by Post type" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fas fa-sliders-h"></i>
                        </button>
                        <div className="dropdown-menu position-absolute dropdown-menu-right" aria-labelledby="filterDropdown">
                            {typeSettings && typeSettings.map((typeSetting, e) => {
                                const isSelectedClass = selectedType.toLowerCase() === typeSetting.name.toLowerCase() ? " active" : "";
                                return <button 
                                    className={`dropdown-item btn btn-link if-btn-link${isSelectedClass}`} 
                                    key={e} 
                                    data-post-type={typeSetting.value}
                                    onClick={() => {
                                        setSelectedType(typeSetting.name);
                                        props.getTypeSetting(typeSetting.name, typeSetting.value);
                                    }}
                                >{typeSetting.name}</button>
                            })}
                        </div>
                    </li>

                    <li className="nav-item">
                        <button className="btn btn-transparent" type="button" id="searchButton" aria-label="Toggle Search" onClick={() => setIsFormCollapsed(!isFormCollapsed)}>
                            <i className="fa fas fa-search"></i>
                        </button>
                    </li>
                </ul>
            </nav>

            <form className={`container-fluid mb-3${isCollaspedClass}`}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for a tag" 
                        onChange={ (event) => { setTag(event.target.value); }}
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary if-btn-search" 
                            type="button" 
                            aria-label="Search"
                            onClick={() => {
                                props.getTag(tag);
                            }}
                        >
                            <i className="fa fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default MainNav;
