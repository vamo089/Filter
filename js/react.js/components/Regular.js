import React from 'react';
import FilterItems from './FilterItems'
import Buttons from "./Buttons";
import {hiddenAll,checkedAll} from "../index";
function Regular(props) {
    let filters = props.filters,
        collection = props.collection,
        collectionType = collection[filters.activeInput],
        additional = filters.regular.types[filters.activeInput].additional,
        additionalCollection = additional ? collection[additional.key] : null

    return (
        <div>
            <div className={`filter filter-regular ${filters.acceptButtons ? 'filter-accept-button' : ''}`}>
                <label className="filter-select-all filter-body-item">
                    <input onChange={props.changeAll} checked={checkedAll(collectionType).checked} type="checkbox"/>
                    <span><i>{checkedAll(collectionType).title}</i></span>
                </label>
                <div className="filter-body-items">
                    {hiddenAll(collectionType) ?
                        Object.keys(collectionType).map((item, i) =>
                            <FilterItems
                                collection={collectionType[item]}
                                id={item} key={i}
                                itemChange={props.itemChange}
                                hidden={collectionType[item].hidden}
                            />
                        ) : <p className="noResult">No results found</p>}
                </div>
                {filters.acceptButtons && <Buttons itemChange={props.itemChange}/>}
            </div>
            {additional &&
            <div className="filter filter-additional">
                <p className="filter-additional__title">{additional.title}</p>
                <div className="filter-body-items">
                    {
                        Object.keys(additionalCollection).map((item, i) =>
                            <FilterItems
                                collection={additionalCollection[item]}
                                id={item} key={i}
                                itemChange={props.itemChange}
                            />
                        )
                    }
                </div>
            </div>
            }
        </div>
    )
}
export default Regular