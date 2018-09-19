import Template from './Template.js'
import {Filter,qs,positon} from './Filter.js'
const template = new Template();

export default class RegularFilter {
    constructor(inputName, title = '', additionalName = false, additionalTitle = '', additionalPosition = 'right') {
        RegularFilter.inputType = 'regular';
        this._inputName = inputName;
        this._title = title;
        if (additionalName) {
            this.additionalName = additionalName;
            this.additionalTitle = additionalTitle;
            this.additional(additionalName, additionalPosition);
        }
        this.inputInit();
    }

    inputInit() {
        Filter.inputsWrapper();

        if (!qs(`.filter-inputs [data-type=${this._inputName}]`)) {
            let input = document.createElement('div');
            input.innerHTML = template.input(this._title, this._inputName);
            qs('.filter-inputs').appendChild(input.children[0]);
        }
        this.filterInit();
    }

    filterInit() {
        if (!qs(`${Filter.container} .filter-regular`)) {
            let input = document.createElement('div');
            input.innerHTML = template.regularBody(Filter.controlButtons);
            qs(Filter.container).appendChild(input);
            input = document.createElement('div');
            input.innerHTML = template.additional(this.additionalName, this.additionalTitle)
            qs(Filter.container).appendChild(input);
        }
    }

    additional(additionalName, additionalPosition) {
        let inputName = this._inputName;
        document.addEventListener('focus', function (event) {
            if(event.target.getAttribute('data-type') === inputName){
                Filter.cleaning('.filter-additional');
                Filter.appendItems(additionalName, '.filter-additional');
                qs('.filter-additional').removeAttribute('hidden');

                let left, top;
                if (additionalPosition === 'right') {
                    left = qs('.filter-regular').offsetLeft + qs('.filter-regular').offsetWidth;

                    top = qs('.filter-regular').offsetTop;
                } else {
                    left = qs('.filter-regular').offsetLeft - qs('.filter-regular').offsetWidth;

                    left = left > 0 ? left : qs('.filter-regular').offsetLeft + qs('.filter-regular').clientWidth;

                    top = qs('.filter-regular').offsetTop;
                }
                positon.call('.filter-additional',top,left);
            }
        }, true);
    }

}