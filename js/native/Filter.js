import MainFilter from './MainFilter.js'
import Template from './Template.js'

const template = new Template();

let qs = (selector, scope) => {
    return (scope || document).querySelector(selector);
};
let qsa = (selector, scope) => {
    return (scope || document).querySelectorAll(selector);
};
let positon = function (top, left) {
    qs(this).style.top = `${top}px`;
    qs(this).style.left = `${left}px`;
};

class Filter {
    constructor() {
        this.events()
    }

    events() {
        document.addEventListener('focus', event => {
            let _this = event.target;
            if (_this.localName === 'input' && _this.closest('.filter-inputs')) {
                Filter.focus.call(_this);
            }
        }, true);

        if (Filter.controlButtons) {
            document.addEventListener('scroll', event => {
                let _this = event.target;
                if (_this.querySelector('.filter-buttons')) {
                    _this.querySelector('.filter-buttons').style.bottom = `${-_this.querySelector('.filter-buttons').parentElement.scrollTop}px`
                }
            }, true);

            document.addEventListener('click', event => {
                let _this = event.target;
                if (_this.closest('.filter-accept')) {
                    Filter.save();
                    Filter.hiding();
                }
                if (_this.closest('.filter-cancel')) {
                    Filter.hiding();
                }
            });
        }
        document.addEventListener('click', event => {
            let _this = event.target;
            if (_this.localName === 'input' && _this.closest('.filter-body-items')) {
                Filter.itemsCount();
                if (!Filter.controlButtons) {
                    Filter.save();
                }
                Filter.leadFilter.call(_this.closest('.filter-body-items'))
            }
            if (!_this.closest('.filter,.filter-regular,.filter-inputs input')) {
                Filter.hiding();
            }
        });

        document.addEventListener('change', event => {
            let _this = event.target;
            if (_this.closest('.filter-select-all')) {
                _this.closest('.filter-body,.filter-regular').querySelectorAll('.filter-body-item:not(.filter-select-all) input').forEach(function (item) {
                    item.checked = _this.checked
                });
                Filter.itemsCount();
                if (_this.closest('.filter-body')) {
                    Filter.leadFilter.call(_this.closest('.filter-body').querySelector('.filter-body-items'));
                }
                if (!Filter.controlButtons) {
                    Filter.save();
                }
            }
        });

        document.addEventListener('keyup', event => {
            let _this = event.target;
            if (_this.hasAttribute('data-type') || _this.classList.contains('filter-title__search-input')) {
                if (_this.getAttribute('data-type')) {
                    Filter.searching.call(qs('.filter-regular').querySelectorAll('.filter-body-items .filter-body-item'), _this.value);
                }
                else {
                    Filter.searching.call(_this.closest('.filter-body').querySelectorAll('.filter-body-items .filter-body-item'), _this.value);
                }
            }
        });
    }

    static focus() {
        Filter.hiding();
        let positionTop = this.offsetTop + this.offsetHeight,
            positionLeft = this.offsetLeft;
        if (this.getAttribute('data-type') === MainFilter.inputType) {
            qsa('.filter-main .filter-body-items').forEach((items) => {
                items.querySelectorAll('.filter-body-item input').forEach((item) => {
                    item.checked = Filter.collection[item.closest('.filter-body-items').getAttribute('data-type')][item.getAttribute('data-id')].checked;
                });
            });
            qs('.filter-main').removeAttribute('hidden');
            positon.call('.filter', positionTop, positionLeft);
        }
        else {
            qs('.filter-regular').removeAttribute('hidden');
            qs('.filter-regular .filter-body-items').setAttribute('data-type', this.getAttribute('data-type'));
            Filter.cleaning('.filter-regular');
            Filter.appendItems(this.getAttribute('data-type'), '.filter-regular');
            positon.call('.filter-regular', positionTop, positionLeft);
        }
        qsa('.filter-regular,.filter-body').forEach(item => {
            item.scrollTop = 0
        });
        qs('.filter-buttons').style.bottom = 0;
        Filter.itemsCount()
    }

    static itemsCount() {
        qsa('.filter-body-items').forEach(item => {
            let filter = item.closest('.filter-body,.filter-regular');

            if (filter) {
                if (!filter.getAttribute('hidden')) {

                    if (filter.querySelectorAll('.filter-body-items input:not(:checked)').length) {

                        filter.querySelector('.filter-select-all input').checked = false;
                        filter.querySelector('.filter-select-all i').innerText = 'Select all';
                    } else {
                        filter.querySelector('.filter-select-all input').checked = true;
                        filter.querySelector('.filter-select-all i').innerText = 'Remove all'
                    }
                }
            }
        });
    }

    static searching(value) {
        this.forEach(item => {
            let textItem = item.querySelector('span').innerText;
            if (textItem.toLowerCase().indexOf(value.toLowerCase()) === -1) {
                item.setAttribute('hidden', true);
            } else {
                let regex = new RegExp(value, 'gi');
                if (value.length > 0) {
                    item.querySelector('span').innerHTML = textItem.replace(regex, "<b>$&</b>");
                } else {
                    item.querySelector('span').innerHTML = textItem;
                }
                item.removeAttribute('hidden');
            }
            if (!item.closest('.filter-body-items').querySelectorAll('.filter-body-item:not([hidden])').length) {
                if (!item.closest('.filter-body-items').querySelector('.noResult')) {
                    let noResult = document.createElement('div');
                    noResult.innerHTML = template.noResult();
                    item.closest('.filter-body-items').appendChild(noResult)
                }
            } else {
                if (qs('.noResult')) {
                    qs('.noResult').remove()
                }
            }
        });
    }

    static save() {
        qsa('.filter:not([hidden]) .filter-body-items').forEach(items => {
            let itemsType = items.getAttribute('data-type');
            items.querySelectorAll('.filter-body-item input').forEach(itemInput => {
                Filter.collection[itemsType][itemInput.getAttribute('data-id')].checked = itemInput.checked;
            });
        });
    }

    static hiding() {
        qsa('.filter-inputs input,.filter-title__search-input').forEach(item => item.value = '');
        qsa('.filter').forEach(item => item.setAttribute('hidden', true));
    }

    static cleaning(container) {
        if (qs(container).querySelector('.filter-body-items')) {
            qs(container).querySelector('.filter-body-items').innerHTML = ''
        }
    }

    static appendItems(inputName, container) {
        Filter.cleaning(`.filter-body-items[data-type= ${inputName}]`);
        let data = Filter.collection[inputName];
        for (let key in data) {
            let attributesList = '';
            if (data[key].attributes) {
                let attributes = data[key].attributes;
                for (let attribute in attributes) {
                    attributesList += `${attribute} = [${attributes[attribute]}]`;
                }
            }
            let item = document.createElement('div');
            item.innerHTML = template.item(key, data[key].name, attributesList, data[key].checked);
            document.querySelector(`${container} .filter-body-items[data-type= ${inputName}]`).appendChild(item)
        }
    }

    static inputsWrapper() {
        if (!$('body .filter-inputs').length) {
            $(Filter.container).append(template.inputWrapper());
        }
    }

    static leadFilter() {
        if (this.getAttribute('data-type') === 'managers') {
            let userIds = '';
            this.querySelectorAll('.filter-body-item input:checked').forEach(items => {

                JSON.parse(items.getAttribute('data-leads')).forEach(item => {
                    userIds += `input[data-id="${item}"],`;
                })
            });
            userIds = userIds.slice(0, -1);


            qs('.filter-body-items[data-type="developers"]').querySelectorAll('input').forEach(item => {
                item.checked = false;
            });

            qs(`.filter-body-items[data-type="developers"]`).querySelectorAll(userIds).forEach(item => {
                item.checked = true;
                qs('.filter-body-items[data-type="developers"]').prepend(item.closest('label').cloneNode(true));
                item.closest('label').remove();
            });
        }
    }
}

export {Filter, qs, qsa, positon}