import React, {Component} from 'react';
import Inputs from "./components/Inputs";
import Filters from "./components/Filters";
import './css/style.css';

class App extends Component {
    constructor(props) {
        super();
        let collection = props.collection,
            filters = {
                activeType: null,
                activeInput: null,
                acceptButtons: true,
                main: {
                    types: {
                        cities: {title: 'CITY'},
                        managers: {title: 'MANAGER'},
                        developers: {title: 'DEVELOPER', search: true}
                    },
                },
                regular: {
                    types: {
                        technologies: {title: 'Technologies',additional:{key:'additional',title:'Additional'}},
                        companies: {title: 'Companies'},
                        cities: {title: 'cities'}
                    },
                },
            };

        this.state = {
            filters,
            collection,
            dataType: null,
            beforeSaving: JSON.parse(JSON.stringify(collection))
        };
        this.onFocus = this.onFocus.bind(this);
        this.outSideClick = this.outSideClick.bind(this);
        this.itemChange = this.itemChange.bind(this);
        this.changeAll = this.changeAll.bind(this);
        this.searching = this.searching.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.outSideClick);
    }

    componentDidUpdate() {
        if (this.state.filters.activeInput) {
            let input = document.querySelector(`input[name=${this.state.filters.activeInput}]`),
                top = input.offsetTop + input.offsetHeight,
                left = input.offsetLeft;

            if (document.querySelector('.filter')) {


                document.querySelector('.filter').style.top = `${top}px`;
                document.querySelector('.filter').style.left = `${left}px`;


                if(this.state.filters.activeType === 'regular'){
                    let additional = this.state.filters.regular.types[this.state.filters.activeInput].additional;

                    if(additional){
                        document.querySelector('.filter-additional').style.top = `${top}px`;
                        document.querySelector('.filter-additional').style.left = `${left + document.querySelector('.filter').offsetWidth}px`;
                    }
                }
            }
        }
    }

    onFocus(event) {
        document.querySelectorAll('input[data-type]').forEach(function (item) {
            item.value = ''
        });
        let collection = this.state.collection,
            filters = this.state.filters;

        filters.activeType = event.target.getAttribute('data-type');
        filters.activeInput = event.target.getAttribute('name');

        for (let i in collection[filters.activeInput]) {
            collection[filters.activeInput][i].hidden = false
        }
        this.setState({
            filters,
            collection,
            beforeSaving: JSON.parse(JSON.stringify(collection))
        });
    }

    outSideClick(event) {
        if (event.target) {
            if (!event.target.closest('.filter,input[data-type]') && document.querySelector('.filter')) {
                let filters = this.state.filters;
                filters.activeType = null;
                this.setState({
                    filters
                });
                if (this.state.filters.acceptButtons) {
                    this.setState({
                        collection: JSON.parse(JSON.stringify(this.state.beforeSaving))
                    });
                }
                document.querySelectorAll('input[data-type]').forEach(function (item) {
                    item.value = '';
                });
            }
        }
    }

    itemChange(event) {
        let filters = this.state.filters;
        if (this.state.filters.acceptButtons && event.target.closest('.filter-accept')) {
            filters.activeType = false;
            this.setState({
                filters
            });
        } else {
            let type = this.state.filters.activeInput === 'main' ? event.target.closest('.filter-body-items').getAttribute('data-type') : this.state.filters.activeInput,
                dataId = event.target.getAttribute('data-id'),
                collection = this.state.collection;



            if(!event.target.closest('.filter-additional')){
                collection[type][dataId].checked = event.target.checked;
            }

            let leads = event.target.getAttribute('data-leads');
            if (leads) {
                leads = leads.split(',');
                leads.forEach(function (item) {
                    if(collection.developers[item]){
                        collection.developers[item].checked = event.target.checked;
                    }
                });

            }

            if(filters.activeType === 'regular'){
                let additional = filters.regular.types[type].additional;
                if(additional && event.target.closest('.filter-additional')){
                    collection[additional.key][dataId].checked = event.target.checked
                }
            }

            this.setState({
                collection
            });
        }
    }

    changeAll(event) {
        let collection = this.state.collection,
            type = this.state.filters.activeInput === 'main' ?
                event.target.closest('.filter-body').querySelector('.filter-body-items').getAttribute('data-type') : this.state.filters.activeInput;

        for (let key in collection[type]) {
            collection[type][key].checked = event.target.checked;
        }
        this.setState({
            collection
        });
    }

    searching(event) {
        let text = event.target.value.toLowerCase(),
            collection = this.state.collection;

        if (this.state.filters.activeType === 'regular') {
            items(this.state.filters.activeInput);
        } else {
            let type = event.target.closest('.filter-body').querySelector('.filter-body-items').getAttribute('data-type');
            items(type);
        }
        this.setState({
            collection
        });

        function items(activeInput) {
            let collectionType = collection[activeInput];
            for (let i in collectionType) {
                let name = collectionType[i].name.toLowerCase();
                name.indexOf(text) !== -1 ? collectionType[i].hidden = false : collectionType[i].hidden = true;
                let regex = new RegExp(text, 'gi');

                text ? collectionType[i].nameBold = collectionType[i].name.replace(regex, "<b>$&</b>") :

                    collectionType[i].nameBold = null;
            }
        }
    }

    render() {
        return (
            <main onClick={this.outSideClick}>
                <Inputs searching={this.searching} inputTypes={this.state.filters} inputFocus={this.onFocus}/>
                <Filters changeAll={this.changeAll} filters={this.state.filters} collection={this.state.collection}
                         itemChange={this.itemChange} searching={this.searching}/>
            </main>
        );
    }
}

export default App;
