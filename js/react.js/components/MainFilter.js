import React from 'react';
import FilterItems from './FilterItems'
import Buttons from "./Buttons";
import {hiddenAll,checkedAll} from "../index";

function MainFilter(props) {
    let filters = props.filters,
        mainData = filters.main.types,
        collection = props.collection;

    return (
        <div className={`filter filter-main ${filters.acceptButtons ? 'filter-accept-button' : '' }`}>
            {Object.keys(mainData).map((item, i) =>
                <div className="filter-body" key={i}>
                    <div className="filter-title">
                        <div className="title-select">
                            <span className="filter-title__name">{mainData[item].title}</span>
                            <label className="filter-select-all">
                                <span><i>{checkedAll(collection[item]).title}</i></span>
                                <input onChange={props.changeAll} checked={checkedAll(collection[item]).checked} type="checkbox"/>
                            </label>
                        </div>
                        {mainData[item].search &&
                        <input onChange={props.searching} placeholder="&#8981;"
                               className="filter-title__search-input"/>}
                    </div>
                    <div className="filter-body-items" data-type={item}>
                        {hiddenAll(collection[item]) ?
                            Object.keys(collection[item]).map((filterItem, i) =>
                                <FilterItems
                                    collection={collection[item][filterItem]}
                                    itemChange={props.itemChange} id={filterItem} key={i}
                                    hidden={collection[item][filterItem].hidden}/>) :
                            <p className="noResult">No results found</p>
                        }

                        {!i && filters.acceptButtons && <Buttons itemChange={props.itemChange}/>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainFilter