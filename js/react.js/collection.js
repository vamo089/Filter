export const collections = {
    cities: {
        90001: {name:'Los Angeles'},
        97035: {name:'Portland'},
        27009: {name:'North Carolina'},
        80014: {name:'Denver'}
    },
    managers: {
        0: {name: 'James Smith', attributes: {'data-leads': [0, 1, 2]}},
        1: {name: 'John Johnson', attributes: {'data-leads': [1, 2, 3]}},
        2: {name: 'Robert Williams', attributes: {'data-leads': [4, 5, 6]}},
        3: {name: 'Michael Jones', attributes: {'data-leads': [7, 8]}},
        4: {name: 'William Brown', attributes: {'data-leads': [9, 10, 11, 12]}},
        5: {name: 'David Davis', attributes: {'data-leads': [13, 14, 15, 16, 17]}},
        6: {name: 'Richard Miller', attributes: {'data-leads': [18]}},
    },
    developers: {
        0: {name: 'Joseph Wilson'},
        1: {name: 'Thomas Moore'},
        2: {name: 'Charles Taylor'},
        3: {name: 'Christopher Anderson'},
        4: {name: 'Daniel Thomas'},
        5: {name: 'Matthew Jackson'},
        6: {name: 'Anthony White'},
        7: {name: 'Donald Harris'},
        8: {name: 'Mark Martin'},
        9: {name: 'Paul Garcia'},
        10: {name: 'James Smith'},
        11: {name: 'John Johnson'},
        12: {name: 'Robert Williams'},
        13: {name: 'Michael Jones'},
        14: {name: 'William Brown'},
        15: {name: 'David Davis'},
        16: {name: 'Richard Miller'},
        17: {name: 'Steven Martinez'},
        18: {name: 'Andrew Robinson'},
    },
    companies: {
        0: {name: 'Ultimate Software'},
        1: {name: 'Workday'},
        2: {name: 'Salesforce'},
        3: {name: 'World Wide Technology'},
        4: {name: 'SAP America'},
        5: {name: 'Zillow Group'},
        6: {name: 'Intuit'},
        7: {name: 'NVIDIA'},
        8: {name: 'VMware'},
        9: {name: 'Adobe Systems'},
        10: {name: 'Fast Enterprises'},
    },
    technologies: {
        0: {name: 'Angular.js'},
        1: {name: 'Laravel'},
        2: {name: 'React.js'},
        3: {name: 'Node.js'},
        4: {name: 'Ruby on Rails'},
        5: {name: 'Symfony'}
    },
    additional: {
        0: {name: 'Additional item'},
        1: {name: 'Additional item2'},
        2: {name: 'Additional item3'},
        3: {name: 'Additional item4'}
    }
};
for(let key in collections){
    for(let i in collections[key]){
        collections[key][i].checked = true
    }
}
export default collections