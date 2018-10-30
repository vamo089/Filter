import React from 'react';

function FilterItems(props) {
    let collection = props.collection;

    function attributes() {
        let attributes = collection.attributes,
            htmlattributes = {};
        if (attributes)
            for (let i in attributes) {
                htmlattributes[i] = attributes[i];
            }
        if (htmlattributes)
            return htmlattributes
    }

    return (
        <label hidden={props.hidden} className="filter-body-item">
            <input onChange={props.itemChange} checked={collection.checked} data-id={props.id} {...attributes()}
                   type="checkbox"/>
            <span dangerouslySetInnerHTML={{__html: collection.nameBold ? collection.nameBold : collection.name}}/>
        </label>
    )
}

export default FilterItems