
let employees = [];

const form = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");
const message = document.getElementById("message");

// Form Submit Event
form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let department = document.getElementById("department").value;
    let salary = Number(document.getElementById("salary").value);

    // Validation
    if (name === "") {
        message.style.color = "red";
        message.innerText = "Please enter employee name!";
        return;
    }

    if (email === "") {
        message.style.color = "red";
        message.innerText = "Please enter email!";
        return;
    }

    if (!document.getElementById("email").checkValidity()) {
        message.style.color = "red";
        message.innerText = "Please enter a valid email!";
        return;
    }

    if (department === "") {
        message.style.color = "red";
        message.innerText = "Please select department!";
        return;
    }

    if (salary <= 0 || !Number.isFinite(salary)) {
        message.style.color = "red";
        message.innerText = "Salary must be greater than 0!";
        return;
    }

    // Create Employee Object
    let employee = {
        name: name,
        email: email,
        department: department,
        salary: salary
    };

    // Store Employee in Array
    employees.push(employee);

    message.style.color = "green";
    message.innerText = "Employee registered successfully!";

    form.reset();

    displayEmployees();
});

// Display Employees
function displayEmployees() {

    employeeList.innerHTML = "";

    if (employees.length === 0) {
        employeeList.innerHTML = "<p>No employees registered yet.</p>";
    }

    employees.forEach(function(employee, index) {

        let card = document.createElement("div");
        card.className = "employee-card";

        let details = document.createElement("div");

        let heading = document.createElement("h3");
        heading.textContent = employee.name;

        let email = document.createElement("p");
        email.textContent = "Email: " + employee.email;

        let department = document.createElement("p");
        department.textContent = "Department: " + employee.department;

        let salary = document.createElement("p");
        salary.textContent = "Salary: ₹" + employee.salary;

        details.appendChild(heading);
        details.appendChild(email);
        details.appendChild(department);
        details.appendChild(salary);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteEmployee(index);
        });

        card.appendChild(details);
        card.appendChild(deleteButton);

        employeeList.appendChild(card);
    });

    updateStatistics();
}

// Update Statistics
function updateStatistics() {

    let total = employees.length;
    let totalSalary = 0;
    let highestSalary = 0;

    employees.forEach(function(employee) {

        totalSalary += employee.salary;

        if (employee.salary > highestSalary) {
            highestSalary = employee.salary;
        }
    });

    let averageSalary = total > 0 ? totalSalary / total : 0;

    document.getElementById("totalEmployees").innerText = total;

    document.getElementById("averageSalary").innerText =
        "₹" + averageSalary.toFixed(2);

    document.getElementById("highestSalary").innerText =
        "₹" + highestSalary;
}

// Delete Employee
function deleteEmployee(index) {

    employees.splice(index, 1);

    message.style.color = "red";
    message.innerText = "Employee deleted successfully!";

    displayEmployees();
}
