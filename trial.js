const issueArr = [];
const defPerson = ["Ashley V.", "Chandri B.", "Kelo L.", "Peter S."];
const peopleArr = [];
const projectArr = [];

document.addEventListener('DOMContentLoaded', function () {
    // Load existing data from localStorage or initiaalise an empty array
    const storedIssueData = localStorage.getItem('issueData');
    const issueArr = storedIssueData ? JSON.parse(storedIssueData) : [];

    // Dynamic card generation 
    if (storedIssueData) {
        const issueArr = JSON.parse(storedIssueData);
        const ticketContainer = document.getElementById('ticketContainer');
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

            const prio = card.querySelector('#prio'); //Select the priority element within the card

            // Set background colour based on issue priority
            if (issue.issuePriority === 'Low') {
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

    //Create new people
    const createPeople = () => {
        let newPerson = new people(     //Calla the people constructor
            document.getElementById('fName').value,
            document.getElementById('lName').value,
            document.getElementById('email').value,
            document.getElementById('uName').value
        );
        peopleArr.push(newPerson);      //Push the new person to the people array
        storeData(peopleArr);       //Call the storeData function
        document.forms[0].reset();      //clears the form
    }

    const createProjects = () => {      //calls the projects constructor
        let newProject = new projects(
            document.getElementById('proName'),
            document.getElementById('proID')
        );

        projectArr.push(newProject);        //pushes the new project to the projects array
        storeData(projectArr);      //calls the storeData function
        document.forms[0].reset();      //clears the form
    }

    // Storing form data
    function storeData(data) {
        localStorage.setItem('issueData', JSON.stringify(data));        // Store the issueArr in LocalStorage
        console.log('stored', { data });
        window.location.href = 'Home.html';
    }

    // Event listener for the form submission
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();     // Prevent form submission
        createTicket();     // Call the createTicket function
    });
});

//Form Popup
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

//Contructor function for a person(?)

function people (fName, lName, email, uName) {
        this.name = fName;
        this.surname = lName;
        this.email = email;
        this.useName = uName;
}

//Contructor function for a project(?)
function projects (proName, proID) {
        this.name = proName;
        this.id = proID;
}

/*
    Creating people
    Assigning if possible
    Function to auto add date to target date based on priority level
    Check login page, remove unneeded stuff --K working
    Tagging of status, open,resolved,overdue --A working
    Color changing based on priority level -- done
    Reopen form after stored with card 
 */