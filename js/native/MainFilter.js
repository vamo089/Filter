import Template from './Template.js'
import {Filter,qs} from './Filter.js'
const template = new Template();
export default class MainFilter {
    constructor(inputName, title = '', search = false) {
        MainFilter.inputType = 'main';
        this._inputName = inputName;
        this._title = title;
        this._search = search;
        this.inputInit();
    }
    get title() {
        return this._title.toUpperCase()
    }

    inputInit() {
        Filter.inputsWrapper();

        if (!qs(`.filter-inputs [data-type=${MainFilter.inputType}]`)) {
            let input = document.createElement('div');
            input.innerHTML = template.input('main', MainFilter.inputType);
            qs('.filter-inputs').appendChild(input.children[0])
        }
        this.filterInit();
    }

    filterInit() {
        if (!qs(`${Filter.container} .filter-main`)) {
            let input = document.createElement('div');
            input.innerHTML = template.mainWrapper(Filter.controlButtons);
            qs(Filter.container).appendChild(input.querySelector('div'));
        }
        let input = document.createElement('div');
        input.innerHTML = template.mainBody(this._inputName,this.title, this._search);
        qs('.filter-main').appendChild(input.querySelector('div'));

        if(Filter.controlButtons && !qs('.filter-main .filter-body-items .filter-buttons')){
            let input = document.createElement('div');
            input.innerHTML = template.buttons();
            qs('.filter-main .filter-body-items').appendChild(input.children[0]);
        }
        Filter.appendItems(this._inputName,`.filter-body`)

    }
}




































