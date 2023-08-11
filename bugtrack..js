const issueArr = [];

document.addEventListener('DOMContentLoaded', function () {
    // Load existing data from localStorage or initialise an empty array
    const storedIssueData = localStorage.getItem('issueData');
    const issueArr = storedIssueData ? JSON.parse(storedIssueData) : [];

    // Button click handlers
    document.getElementById("newTic").addEventListener("click", openForm);
    document.getElementById("newPer").addEventListener("click", openFormper);
    document.getElementById("newPro").addEventListener("click", openFormpro);
    document.getElementById("closeTicket").addEventListener("click", closeForm);
    document.getElementById("closePeople").addEventListener("click", closeFormper);
    document.getElementById("closeProject").addEventListener("click", closeFormpro);

    // Dynamic card generation 
    if (storedIssueData) {
        const issueArr = JSON.parse(storedIssueData);
        const statusOpen = document.getElementById('statusOpen');
        const statusResolved = document.getElementById('statusResolved');
        const statusOverdue = document.getElementById('statusOverdue');

        // Loop through the issueArr to generate cards
        issueArr.forEach(issue => {
            const card = document.createElement('div');
            card.classList.add('ticket');
            card.innerHTML = `
                <p id="sum">${issue.summary}</p>
                <select id="stat">
                    <option value="open">Open</option>
                    <option value="resolved">Resolved</option>
                    <option value="overdue">Overdue</option>
                </select>
                <p id="prio" class="${issue.issuePriority}">${issue.issuePriority}</p>
                <p id="assign">${issue.personAssigned}</p>
                
            `;
            // Select the priority element within the card
            const prio = card.querySelector('#prio');
            // Set background color based on issue priority
            if (issue.issuePriority === "Low") {
                prio.style.backgroundColor = 'lightgreen';
            } else if (issue.issuePriority === 'Medium') {
                prio.style.backgroundColor = 'lightsalmon';
            } else if (issue.issuePriority === 'High') {
                prio.style.backgroundColor = 'lightcoral';
            };

            // Places issue in relevant container. (Open, Resolved and Overdue)
            // hard code values to prevent open being default
            const statusValue = issue.statusOfIssue;
            if (statusValue === 'open') {
                statusOpen.appendChild(card);
            } else if (statusValue === 'resolved') {
                statusResolved.appendChild(card);
            } else if (statusValue === 'overdue') {
                statusOverdue.appendChild(card);
            }
        });
    }
    // Create new ticket
    const createTicket = () => {
        let issue = new Issue(      // Calls Issue Constructor
            document.getElementById('summary').value,
            document.getElementById('description').value,
            document.getElementById('project').value,
            document.getElementById('discPerson').value,
            document.getElementById('discDate').value,
            document.getElementById('status').value,
            document.getElementById('priority').value,
            document.getElementById('tarDate').value,
            document.getElementById('assigned').value,
            document.getElementById('resDate').value,
            document.getElementById('rsummary').value
        );
        issueArr.push(issue);       // Push new issue to issueArr
        storeData(issueArr);        // Call the storeData function
        document.forms[0].reset();      // Clears the form for the next entries
        //Display purposes only
        console.log('added', { issueArr });     // Check if array is updated
    }

    // Storing form data
    function storeData(data) {
        localStorage.setItem('issueData', JSON.stringify(data));    // Store the issueArr in LocalStorage
        console.log('stored', { data });
        window.location.href = 'Home.html';
    }

    // Event listener for the form submission
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();     // Prevent form submission
        createTicket();     // Call the createTicket function
    });

    // Create the edit form for each card
    const editForm = document.createElement('form');
    editForm.classList.add('edit-form');
    editForm.style.display = 'none'; // Initially hide the form
    editForm.innerHTML = ``;
    card.appendChild(editForm);
});

//          Form Popup Function
function openForm() {
    document.getElementById("Form").style.display = "block";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
}
function closeForm() {
    document.getElementById("Form").style.display = "none";
    document.getElementById("statusOpen").style.display = "block";
    document.getElementById("statusResolved").style.display = "block";
    document.getElementById("statusOverdue").style.display = "block";
}
function openFormper() {
    document.getElementById("PersonForm").style.display = "block";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
}
function closeFormper() {
    document.getElementById("PersonForm").style.display = "none";
    document.getElementById("statusOpen").style.display = "block";
    document.getElementById("statusResolved").style.display = "block";
    document.getElementById("statusOverdue").style.display = "block";
}
function openFormpro() {
    document.getElementById("ProjectForm").style.display = "block";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
}
function closeFormpro() {
    document.getElementById("ProjectForm").style.display = "none";
    document.getElementById("statusOpen").style.display = "block";
    document.getElementById("statusResolved").style.display = "block";
    document.getElementById("statusOverdue").style.display = "block";
}

// Constructor for issue
function Issue(summary, description, project, personDiscoveredBy, discDate, statusOfIssue, issuePriority, targetDate, personAssigned, resolutionDate, resolutionSummary) {
    this.summary = summary;
    this.description = description;
    this.project = project;
    this.personDiscoveredBy = personDiscoveredBy;
    this.discDate = discDate;
    this.statusOfIssue = statusOfIssue;
    this.issuePriority = issuePriority;
    this.targetDate = targetDate;
    this.personAssigned = personAssigned;
    this.resolutionDate = resolutionDate;
    this.resolutionSummary = resolutionSummary;
}

//Contructor function for a person
function people(fName, lName, email, uName) {
    this.name = fName;
    this.surname = lName;
    this.email = email;
    this.useName = uName;
}

//Contructor function for a project
function projects(proName, proID) {
    this.name = proName;
    this.id = proID;
}

// Constructor for issue
function Issue(summary, description, project, personDiscoveredBy, discDate, statusOfIssue, issuePriority, targetDate, personAssigned, resolutionDate, resolutionSummary) {
    this.summary = summary;
    this.description = description;
    this.project = project;
    this.personDiscoveredBy = personDiscoveredBy;
    this.discDate = discDate;
    this.statusOfIssue = statusOfIssue;
    this.issuePriority = issuePriority;
    this.targetDate = targetDate;
    this.personAssigned = personAssigned;
    this.resolutionDate = resolutionDate;
    this.resolutionSummary = resolutionSummary;
}

//Contructor function for a person
function people(fName, lName, email, uName) {
    this.name = fName;
    this.surname = lName;
    this.email = email;
    this.useName = uName;
}

//Contructor function for a project
function projects(proName, proID) {
    this.name = proName;
    this.id = proID;
}

// Login
let username = "admin";
let password = "admin";
let form = document.getElementById("logform");
function handleForm(event) {
    event.preventDefault();
    if (document.getElementById("name").value == username && document.getElementById("pass").value == password) {
        window.location.href = 'Home.html';
    }
    else {
        document.getElementById("invalid").innerHTML = "Invalid credentials";
    }
}
form.addEventListener('submit', handleForm);