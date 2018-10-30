import React from 'react';
import Regular from './Regular'
import MainFilter from './MainFilter'

function Filters(props) {
    let filters = props.filters,
        collection = props.collection,
        collectionType = collection[filters.activeInput];
    return (
        <div>
            {filters.activeType === 'main' &&
                <MainFilter onChange={props.searching} changeAll={props.changeAll} collection={collection} filters={filters} itemChange={props.itemChange} searching={props.searching}/>
            }

            {filters.activeType === 'regular' &&
                <Regular changeAll={props.changeAll} filters={filters} collection={collection} itemChange={props.itemChange}/>
            }
        </div>
    )
}

export default Filters