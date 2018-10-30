import React from 'react';

function Buttons(props) {
    function outsideClick() {
        document.querySelector('body').click()
    }
    return (
        <div className="filter-buttons">
            <div onClick={props.itemChange} className="filter-accept filter-button">
                <span>Save</span>
            </div>
            <div onClick={outsideClick} className="filter-cancel filter-button">
                <span>Cancel</span>
            </div>
        </div>
    )
}

export default Buttons