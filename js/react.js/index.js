import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import collection from './collection'

ReactDOM.render(<App collection={collection} />, document.querySelector('#root'));


let checkedAll = collectionType => {
    let count = 0;
    for (let i in collectionType) {
        if (collectionType[i].checked) {
            count++
        }
    }
    if (count === Object.keys(collectionType).length) {
        return {
            checked: true,
            title: 'Remove All'
        }
    } else {
        return {
            checked: false,
            title: 'Checked All'
        }
    }
};
let hiddenAll = collectionType => {
    let count = 0;
    for (let i in collectionType) {
        if (collectionType[i].hidden) {
            count++
        }
    }
    return (count !== Object.keys(collectionType).length)
};
export {checkedAll,hiddenAll}
