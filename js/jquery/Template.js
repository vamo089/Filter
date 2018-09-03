class Template {
    inputWrapper() {
        return `<div class="filter-inputs"></div>`
    }

    input(placeholder = '', inputType) {
        return `<input data-type="${inputType}" placeholder="${placeholder}" type="text">`
    }

    mainWrapper(buttons = false) {
        return `<div hidden class="filter filter-main ${buttons ? 'filter-accept-button' : ''}"></div>`
    }

    mainBody(inputName, title, search) {
        return `<div class="filter-body">
                    <div class="filter-title">
                    <div class="title-select">
                        <span class="filter-title__name">${title}</span>
                        <label class="filter-select-all">
                            <span><i>Remove all</i></span>
                            <input checked type="checkbox">
                        </label>
                        </div>
                    ${search ?
            `<input placeholder="&#8981;" class="filter-title__search-input">` : ``}
                    </div>
                    <div class="filter-body-items" data-type="${inputName}"></div>
               </div>`
    }

    regularBody(buttons = false) {
        return `<div hidden class="filter filter-regular ${buttons ? 'filter-accept-button' : ''}">
                    <label class="filter-select-all filter-body-item">
                        <input type="checkbox" checked="">
                        <span><i>Remove all</i></span>
                    </label>
                    <div class="filter-body-items"></div>
                    ${buttons ? this.buttons() : ''}
               </div>`
    }

    buttons() {
        return `<div class="filter-buttons">
                    <div class="filter-accept filter-button">
                        <span>Save</span>
                    </div>
                 <div class="filter-cancel filter-button">
                    <span>Cancel</span>
                 </div>
                </div>`
    }

    item(id, name, attributes, checked = true) {
        return `<label class="filter-body-item">
                    <input data-id="${id}" ${attributes} ${checked ? 'checked' : ''} type="checkbox">
                    <span>${name}</span>
                </label>`
    }

    noResult() {
        return `<p class="noResult">No results found</p>`
    }

    additional(additionalName, additionalTitle) {
        return `<div class="filter filter-additional" hidden>
                    <p class="filter-additional__title">${additionalTitle}</p>
                    <div class="filter-body-items" data-type="${additionalName}"></div>
                </div>`
    }
}
export default Template