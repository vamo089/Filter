import Template from './Template.js'
import Filter from './Filter.js'
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
        if (!$(`.filter-inputs [data-type=${MainFilter.inputType}]`).length) {
            $('.filter-inputs').append(template.input('main', MainFilter.inputType));
        }
        this.filterInit();
    }

    filterInit() {
        if (!$(`${Filter.container} .filter-main`).length) {
            $(Filter.container).append(template.mainWrapper(Filter.controlButtons));
        }
        $('.filter-main').append(template.mainBody(this._inputName,this.title, this._search));

        if(Filter.controlButtons && !$('.filter-main .filter-body-items .filter-buttons').length){
            $('.filter-main .filter-body-items').append(template.buttons());
        }
        Filter.appendItems(this._inputName,`.filter-body`)

    }
}