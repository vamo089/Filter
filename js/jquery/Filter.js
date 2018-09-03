import MainFilter from './MainFilter.js'
import Template from './Template.js'

const template = new Template();
export default class Filter {
    constructor() {
        this.events()
    }

    events() {
        $(document).on('focus', '.filter-inputs input', function () {
            Filter.focus.call(this);
        });

        if (Filter.controlButtons) {
            document.addEventListener('scroll', function () {
                $('.filter-buttons').css('bottom', -$('.filter:visible').find('.filter-buttons').parent().scrollTop())
            }, true);
            $(document).on('click', '.filter-buttons .filter-accept', function () {
                Filter.save();
                Filter.hiding();
            });
            $(document).on('click', '.filter-buttons .filter-cancel', function () {
                Filter.hiding();
            });
        }

        $(document).on('change', '.filter-select-all', function () {
            $(this).closest('.filter-body,.filter-regular').find('.filter-body-item').not(this).find('input').prop('checked', $(this).find('input').prop('checked'));
            Filter.itemsCount();
            Filter.leadFilter.call($(this).closest('.filter-body').find('.filter-body-items'));
            if (!Filter.controlButtons) {
                Filter.save();
            }
        });

        $(document).on('click', '.filter-body-items input', function () {
            Filter.itemsCount();
            if (!Filter.controlButtons) {
                Filter.save();
            }
            Filter.leadFilter.call($(this).closest('.filter-body-items'))
        });
        $(document).on('keyup', `.filter-title__search-input,input[data-type]:not(input[data-type="${MainFilter.inputType}"])`, function () {
            if (!$('.filter-main').attr('hidden')) {
                Filter.searching.call($(this).closest('.filter-body').find('.filter-body-items .filter-body-item'), $(this).val());
            } else {
                Filter.searching.call($('.filter-regular').find('.filter-body-items .filter-body-item'), $(this).val());
            }
        });
        $(document).click(function (e) {
            if (!$(e.target).closest('.filter,.filter-regular,.filter-inputs input').length) {
                Filter.hiding();
            }
        });
    }

    static focus() {
        Filter.hiding();
        let positionTop = $(this).offset().top + $(this).outerHeight(),
            positionLeft = $(this).offset().left;

        if ($(this).data('type') === MainFilter.inputType) {
            $('.filter-main .filter-body-items').each(function () {
                $(this).find('.filter-body-item input').each(function () {
                    $(this).prop('checked', Filter.collection[$(this).closest('.filter-body-items').data('type')][$(this).data('id')].checked)
                });
            });
            $('.filter-main').attr('hidden', false);
            positon.call('.filter', positionTop, positionLeft)
        }
        else {
            $('.filter-regular').attr('hidden', false);
            $('.filter-regular .filter-body-items').attr('data-type', $(this).attr('data-type'));
            Filter.cleaning('.filter-regular');
            Filter.appendItems($(this).data('type'), '.filter-regular');
            positon.call('.filter-regular', positionTop, positionLeft);
        }

        function positon(top, left) {
            $(this).css({
                top,
                left
            });
        }

        $('.filter-regular,.filter-body').scrollTop(0);
        $('.filter-buttons').css('bottom', 0);
        Filter.itemsCount()
    }

    static itemsCount() {
        $('.filter-body-items').each(function () {
            let filter = $(this).closest('.filter-body,.filter-regular');
            if (!filter.attr('hidden')) {
                if (filter.find('.filter-body-items input:not(:checked)').length) {
                    filter.find('.filter-select-all input').prop('checked', false);
                    filter.find('.filter-select-all i').text('Select all');
                } else {
                    filter.find('.filter-select-all input').prop('checked', true);
                    filter.find('.filter-select-all i').text('Remove all');
                }
            }
        });
    }

    static searching(value) {
        $(this).each(function () {
            let textItem = $(this).find('span').text();
            if (textItem.toLowerCase().indexOf(value.toLowerCase()) === -1) {
                $(this).attr('hidden', true)
            } else {
                let regex = new RegExp(value, 'gi');
                if (value.length > 0) {
                    $(this).find('span').html(textItem.replace(regex, "<b>$&</b>"));
                } else {
                    $(this).find('span').html(textItem)
                }
                $(this).attr('hidden', false)
            }

            if (!$(this).closest('.filter-body-items').find('.filter-body-item:not([hidden])').length) {
                if (!$(this).closest('.filter-body-items').find('.noResult').length) {
                    $(this).closest('.filter-body-items').append(template.noResult())
                }
            } else {
                $('.noResult').remove()
            }
        });
    }

    static save() {
        $('.filter:not([hidden]) .filter-body-items').each(function () {
            $(this).each(function () {
                let itemsType = $(this).attr('data-type');
                $(this).find('.filter-body-item input').each(function () {
                    Filter.collection[itemsType][$(this).data('id')].checked = $(this).prop('checked');
                });
            });
        });
    }

    static hiding() {
        $('.noResult').remove();
        $('.filter-inputs input,.filter-title__search-input').val('').keyup();
        $('.filter').attr('hidden', true);
    }

    static cleaning(container) {
        $(container).find('.filter-body-items').html('')
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
            $(container).find(`.filter-body-items[data-type= ${inputName}]`).append(template.item(key, data[key].name, attributesList, data[key].checked))
        }
    }
    static inputsWrapper() {
        if (!$('body .filter-inputs').length) {
            $(Filter.container).append(template.inputWrapper());
        }
    }
    static leadFilter(){
        if($(this).data('type') === 'managers'){
            let userIds = '';
            $(this).find('.filter-body-item input:checked').each(function () {
                $(this).data('leads').forEach(function(item) {
                    userIds += `[data-id=${item}],`;
                });
            });
            userIds = userIds.slice(0, -1);
            console.log(userIds);
            $('.filter-body-items[data-type="developers"]').find('input').prop('checked',false);
            $('.filter-body-items[data-type="developers"]').find(userIds).prop('checked',true);
            $('.filter-body-items[data-type="developers"]').find(userIds).closest('label').detach().prependTo('.filter-body-items[data-type="developers"]');

        }
    }
}














