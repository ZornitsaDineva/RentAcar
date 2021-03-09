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
    for (var obj of getAll(key)) {
        if (obj[ID] == id) {
            return obj;
        }
    }

    return null;
}

function saveAll(key) {
    saveKey(key, getAll(key));
}

function addNewObj(key, obj) {
    obj[ID] = getId();
    getAll(key).push(obj);
    saveAll(key)
}

function updateObj(key, obj) {
    var objects = getAll(key);
    for (let i = 0; i < objects.length; i++) {
        const c = objects[i];
        if (c[ID] == obj[ID]) {
            objects[i] = obj;
            break;
        }        
    }
    saveAll(key);
}

function deleteObj(key, id) {
    var objects = getAll(key);
    for (let i = 0; i < objects.length; i++) {
        const o = objects[i];
        if (o[ID] == id) {
            objects.splice(i, 1);
            break;
        }
        
    }
    saveAll(key);
}

function loadAll(key) {
    db[key] = readKey(key) || [];
}


/* CRUD FOR CUSTOMER */

function getCustomers() {
    return getAll(CUSTOMER);
}

function getCustomer(id) {
    return getById(CUSTOMER, id);
}

function saveCustomers() {
    saveAll(CUSTOMER);
}

function addNewCustomer(customer) {
    addNewObj(CUSTOMER, customer);
}

function updateCustomer(customer) {
    updateObj(CUSTOMER, customer);
}

function deleteCustomer(id) {
    deleteObj(CUSTOMER, id)
}

function loadCustomers() {
    loadAll(CUSTOMER);
}

/* CRUD FOR VEHICLE */

function getVehicles() {
    return getAll(VEHICLE);
}

function getVehicle(id) {
    return getById(VEHICLE, id);
}

function saveVehicles() {
    saveAll(VEHICLE);
}

function addNewVehicle(vehicle) {
    addNewObj(VEHICLE, vehicle);
}

function updateVehicle(vehicle) {
    updateObj(VEHICLE, vehicle);
}

function deleteVehicle(id) {
    deleteObj(VEHICLE, id)
}

function loadVehicles() {
    loadAll(VEHICLE);
}

/* CRUD FOR RENTS */

function getRents() {
    return getAll(RENT);
}

function getRent(id) {
    return getById(RENT, id);
}

function saveRents() {
    saveAll(RENT);
}

function addNewRent(rent) {
    addNewObj(RENT, rent);
}

function updateRent(rent) {
    updateObj(RENT, rent);
}

function deleteRent(id) {
    deleteObj(RENT, id)
}

function loadRents() {
    loadAll(RENT);
}

/* Business Logic */

function loadDB() {
    loadCustomers();
    loadVehicles();
    loadRents();
}

loadDB();

/* Business Logic CUSTOMER */

function bindCustomerAddFormSubmission() {
    var $form = $('form#add-customer');
    $form.on('submit', function(e) {
        e.preventDefault();

        var customer = {};
        customer.name = $form.find('input#name').val();
        customer.email = $form.find('input#email').val();
        customer.phone = $form.find('input#phone').val();

        if (customer.name && customer.email && customer.phone) {
            addNewCustomer(customer);
            refresh();  
        }
    })
}

bindCustomerAddFormSubmission();

function getCustomersHtml() {
    var html = '';
    var index = 0;

    for (var customer of getCustomers()) {
        index = index + 1;
        html = html + getCustomerHtml(customer, index);
    }

    return html;
}

function getCustomerHtml(customer, index) {
    var html = `
        <tr data-id="${customer.id}">
            <td>${index}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <div class="btn-group">
                    <button type="button" class="btn btn-default update-customer">Update</button>
                    <button type="button" class="btn btn-default delete-customer">Delete</button>
                </div>
            </td>
        </tr>
    `;
    return html;
}

function showCustomers() {
    var html = getCustomersHtml();
    $('table#customers tbody').html(html);
}

function bindCustomerDeleteButtons() {
    $('button.delete-customer').on('click', function(e){
        $this = $(this);
        var id = $this.closest('tr').data('id');
        deleteCustomer(id);
        refresh();
    });
}

function bindCustomerUpdateButtons() {
    $('button.update-customer').on('click', function(e){
        $this = $(this);
        var id = $this.closest('tr').data('id');
        var customer = getCustomer(id);
        var $form = $('form#update-customer');
        $form.find('input#id').val(customer.id);
        $form.find('input#name').val(customer.name);
        $form.find('input#email').val(customer.email);
        $form.find('input#phone').val(customer.phone);
        $form.show();

        // scroll to the form
        $('body, html').animate(
            {
              scrollTop: $('form#update-customer').offset().top
            },
            800 //speed
        );
        bindCustomerUpdateFormSubmission();
    });
}

function hideCustomerUpdateForm() {
    var $form = $('form#update-customer');
    $form.hide();
}

function bindCustomerUpdateFormSubmission() {
    var $form = $('form#update-customer');
    $form.on('submit', function(e) {
        e.preventDefault();

        var customer = {};
        customer.id = $form.find('input#id').val();
        customer.name = $form.find('input#name').val();
        customer.email = $form.find('input#email').val();
        customer.phone = $form.find('input#phone').val();

        if (customer.id && customer.name && customer.email && customer.phone) {
            updateCustomer(customer);
            refresh();  
        }
    })
}

/* Business Logic VEHICLE */

function bindVehicleAddFormSubmission() {
    var $form = $('form#add-vehicle');
    $form.on('submit', function(e) {
        e.preventDefault();

        var vehicle = {};
        vehicle.brand = $form.find('input#brand').val();
        vehicle.model = $form.find('input#model').val();
        vehicle.year = $form.find('input#year').val();
        vehicle.fuel = $form.find('input#fuel').val();
        vehicle.seats = $form.find('input#seats').val();
        vehicle.price = $form.find('input#price').val();

        if (vehicle.brand && vehicle.model && vehicle.year 
            && vehicle.fuel && vehicle.seats && vehicle.price) {
            addNewVehicle(vehicle);
            refresh();  
        }
    })
}

bindVehicleAddFormSubmission();

function getVehiclesHtml() {
    var html = '';
    var index = 0;

    for (var vehicle of getVehicles()) {
        index = index + 1;
        html = html + getVehicleHtml(vehicle, index);
    }

    return html;
}

function getVehicleHtml(vehicle, index) {
    var html = `
        <tr data-id="${vehicle.id}">
            <td>${index}</td>
            <td>${vehicle.brand}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td>${vehicle.fuel}</td>
            <td>${vehicle.seats}</td>
            <td><img src="images/car.jpg" width="25" height="25"></td>
            <td>${vehicle.price}</td>
            <td></td>
            <td>
                <div class="btn-group">
                    <button type="button" class="btn btn-default update-vehicle">Update</button>
                    <button type="button" class="btn btn-default delete-vehicle">Delete</button>
                </div>
            </td>
        </tr>
    `;
    return html;
}

function showVehicles() {
    var html = getVehiclesHtml();
    $('table#vehicles tbody').html(html);
}

function bindVehicleDeleteButtons() {
    $('button.delete-vehicle').on('click', function(e){
        $this = $(this);
        var id = $this.closest('tr').data('id');
        deleteVehicle(id);
        refresh();
    });
}

function bindVehicleUpdateButtons() {
    $('button.update-vehicle').on('click', function(e){
        $this = $(this);
        var id = $this.closest('tr').data('id');
        var vehicle = getVehicle(id);
        var $form = $('form#update-vehicle');
        $form.find('input#id').val(vehicle.id);
        $form.find('input#brand').val(vehicle.brand);
        $form.find('input#model').val(vehicle.model);
        $form.find('input#year').val(vehicle.year);
        $form.find('input#fuel').val(vehicle.fuel);
        $form.find('input#seats').val(vehicle.seats);
        $form.find('input#price').val(vehicle.price);
        $form.show();

        // scroll to the form
        $('body, html').animate(
            {
              scrollTop: $('form#update-vehicle').offset().top
            },
            800 //speed
        );
        bindVehicleUpdateFormSubmission();
    });
}

function hideVehicleUpdateForm() {
    var $form = $('form#update-vehicle');
    $form.hide();
}

function bindVehicleUpdateFormSubmission() {
    var $form = $('form#update-vehicle');
    $form.on('submit', function(e) {
        e.preventDefault();

        var vehicle = {};
        vehicle.id = $form.find('input#id').val();
        vehicle.brand = $form.find('input#brand').val();
        vehicle.model = $form.find('input#model').val();
        vehicle.year = $form.find('input#year').val();
        vehicle.fuel = $form.find('input#fuel').val();
        vehicle.seats = $form.find('input#seats').val();
        vehicle.price = $form.find('input#price').val();

        if (vehicle.brand && vehicle.model && vehicle.year 
            && vehicle.fuel && vehicle.seats && vehicle.price) {
            updateVehicle(vehicle);
            refresh();  
        }
    })
}

function refresh() {
    showCustomers();
    bindCustomerDeleteButtons();
    bindCustomerUpdateButtons();
    hideCustomerUpdateForm();

    showVehicles();
    bindVehicleDeleteButtons();
    bindVehicleUpdateButtons();
    hideVehicleUpdateForm();
}

refresh();


