import React from 'react';

function Inputs(props) {
    let inputTypes = props.inputTypes,
        regularTypes = inputTypes.regular.types;
    return (
        <div className="filter-inputs">
            {inputTypes.main.types ? <input onFocus={props.inputFocus} name="main" data-type="main" placeholder="Main"/> : null}

            {Object.keys(regularTypes).map((item, i) =>
                <input onChange={props.searching} onFocus={props.inputFocus} data-type="regular" name={item} placeholder={regularTypes[item].title} key={i}/>
            )}
        </div>
    )
}
export default Inputs