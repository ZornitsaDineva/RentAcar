const CUSTOMER = "customer";
const VEHICLE = "vehicle";
const RENT = "rent";
const ID = 'id';

var db = {};

function readKey(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveKey(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

function getId() {
    return Date.now() + '-' + Math.floor(Math.random() * 10000);
}


/* CRUD BASE */

function getAll(key) {
    return db[key];
}

function getById(key, id) {
    for (var obj in getAll(key)) {
        if (obj[ID] == id) {
            return obj;
        }
    }

    return null;
}

function saveAll(key) {
    saveKey(CUSTOMER, getAll(key));
}

function addNewObj(key, obj) {
    obj[ID] = getId();
    getAll(key).push(obj);
    saveAll(key)
}


/* CRUD FOR CUSTOMER */

function getCustomers() {
    return getAll(CUSTOMER);
}

function getCustomer(id) {
    getById(CUSTOMER, id);
}

function saveCustomers() {
    saveAll(CUSTOMER);
}

function addNewCustomer(customer) {
    addNewObj(CUSTOMER, obj)
}

function updateCustomer(customer) {
    var customers = getCustomers();
    for (let i = 0; i < customers.length; i++) {
        const c = customers[i];
        if (c[ID] == customer[ID]) {
            customers[i] = customer;
            break;
        }        
    }
    saveCustomers();
}

function deleteCustomer(id) {
    var customers = getCustomers();
    for (let i = 0; i < customers.length; i++) {
        const c = customers[i];
        if (c[ID] == id) {
            customers.splice(i, 1);
            break;
        }
        
    }
    saveCustomers();
}

function loadCustomers() {
    db[CUSTOMER] = readKey(CUSTOMER);
}

function loadDB() {
    loadCustomers();
}
