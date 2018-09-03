import Template from './Template.js'
import Filter from './Filter.js'
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
        if (!$(`.filter-inputs [data-type=${this._inputName}]`).length) {
            $('.filter-inputs').append(template.input(this._title, this._inputName));
        }
        this.filterInit();
    }

    filterInit() {
        if (!$(`${Filter.container}`).find('.filter-regular').length) {
            $(Filter.container).append(template.regularBody(Filter.controlButtons))
                               .append(template.additional(this.additionalName, this.additionalTitle))
        }
    }

    additional(additionalName, additionalPosition) {
        $(document).on('focus', `input[data-type=${this._inputName}]`, function () {
            Filter.cleaning('.filter-additional');
            Filter.appendItems(additionalName, '.filter-additional');

            $('.filter-additional').attr('hidden', false);

            let left, top;
            if (additionalPosition === 'right') {
                left = $('.filter-regular').offset().left + $('.filter-regular').outerWidth();
                top = $('.filter-regular').offset().top;
            } else {
                left = $('.filter-regular').offset().left - $('.filter-regular').outerWidth();

                left = left > 0 ? left : $('.filter-regular').offset().left + $('.filter-regular').outerWidth();

                top = $('.filter-regular').offset().top;
            }
            $('.filter-additional').css({left, top});
        });
    }

}