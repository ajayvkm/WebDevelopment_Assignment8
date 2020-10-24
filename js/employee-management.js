/*eslint-env browser*/

'use strict';

var employeeList;

window.addEventListener('load', initializeEmpList);

/**
 * Method to Iniliaze with default List
 */
function initializeEmpList() {
    employeeList = [
        { name: "Dwaygne Johnson", title: "Chief Executive Officer", extension: 5811 },
        { name: "Charlie Morgan", title: "Senior Director", extension: 5812 },
        { name: "John Johnson", title: "Marketing", extension: 5813 },
        { name: "Igor Kulegic", title: "Principle Quality Assurance", extension: 5814 },
        { name: "Veronica Iguiliaz", title: "Principle Database Engineer", extension: 5815 },
    ];

    loadAllEmployees();

    var addNewEmpBtn = $('addEmployeeBtn');
    addNewEmpBtn.addEventListener('click', addEmployee);
}

/**
 * Method to load all the employees
 */
function loadAllEmployees() {
    var table = $('employeesTable');
    var tablebody = table.getElementsByTagName('tbody')[0];
    tablebody.innerHTML = '';

    for (var i = 0; i < employeeList.length; i++) {
        var row = document.createElement('tr');
        row.insertCell(0).innerHTML = employeeList[i].name;
        row.insertCell(1).innerHTML = employeeList[i].title;
        row.insertCell(2).innerHTML = employeeList[i].extension;

        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', employeeList[i].extension);
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', function (e) {
            var extension = e.currentTarget.id;
            deleteEmployee(extension);
        });

        row.insertCell(3).append(deleteBtn);

        tablebody.append(row);
    }

    var employeeCount = $('employeeCount');
    employeeCount.innerHTML = employeeList.length;
}

function addEmployee(event) {
    event.preventDefault();

    var hasError = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');

    var requiredFields = [name, title, extension];
    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value === '') {
            displayError(requiredFields[i]);
            hasError = true;
        }
    }

    if (hasError) {
        return false;
    }

    employeeList.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    loadAllEmployees();
    resetForm(form);
}

function resetForm(form) {
    form.reset();
    var errorNodes = form.querySelectorAll('.error');
    for (var i = 0; i < errorNodes.length; i++) {
        errorNodes[i].classList.add('hide');
    }
}

function displayError(element) {
    var error = element.parentNode.querySelector('.error');
    error.innerHTML = "Mandatory field";
    error.classList.remove('hide');
}

function deleteEmployee(extension) {
    employeeList = employeeList.filter(function (employee) {
        return employee.extension != extension;
    });

    loadAllEmployees();
}

var $ = function (id) {
    return document.getElementById(id);
}