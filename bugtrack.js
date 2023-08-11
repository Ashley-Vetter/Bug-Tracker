const issueArr = [];
const peopleArr = [];
const projectArr = [];

document.addEventListener('DOMContentLoaded', function () {
    // Load existing data from localStorage or initialise an empty array
    const storedIssueData = localStorage.getItem('issueData');
    const issueArr = storedIssueData ? JSON.parse(storedIssueData) : [];

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

            const prio = card.querySelector('#prio'); // Select the priority element within the card

            // Set background color based on issue priority
            if (issue.issuePriority === "Low") {
                prio.style.backgroundColor = 'lightgreen';
            }
            else if (issue.issuePriority === "Medium") {
                prio.style.backgroundColor = 'lightsalmon';
            }
            else if (issue.issuePriority === "High") {
                prio.style.backgroundColor = 'lightcoral';
            };

            // Places issue in relevant container. (Open, Resolved and Overdue)
            const statusValue = issue.statusOfIssue;
            if (statusValue === 'open') {
                statusOpen.appendChild(card);
            } else if (statusValue === 'resolved') {
                statusResolved.appendChild(card);
            } else if (statusValue === 'overdue') {
                statusOverdue.appendChild(card);
            }

            // Add a click event listener to the card
            card.addEventListener('click', () => {
                editForm(issue); // Display the form
            });
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
        issueArr.push(issue);           // Push new issue to issueArr
        storeData(issueArr);            // Call the storeData function
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
        storeData(peopleArr);           //Call the storeData function
        document.forms[0].reset();      //clears the form
    }

    //create new projects
    const createProjects = () => {      //calls the projects constructor
        let newProject = new projects(
            document.getElementById('proName'),
            document.getElementById('proID')
        );

        projectArr.push(newProject);        //pushes the new project to the projects array
        storeData(projectArr);      //calls the storeData function
        document.forms[0].reset();      //clears the form
    }

    const sampleIssues = [
        {
            summary:"Update Styling",
            description:"Update the color scheme of the website to match the new branding.",
            project:"Project D",
            personDiscoveredBy:"Chandri",
            discDate:"2023-08-08",
            statusOfIssue:"open",
            issuePriority:"Medium",
            targetDate:"2023-08-18",
            personAssigned:"Peter",
            resolutionDate:"",
            resolutionSummary:""        
        },
        {
            summary:"Fix UI Alignment",
            description:"Alignment of elements is off in the dashboard.",
            project:"Project A",
            personDiscoveredBy:"Ashley",
            discDate:"2023-08-01",
            statusOfIssue:"open",
            issuePriority:"Medium",
            targetDate:"2023-08-15",
            personAssigned:"Chandri",
            resolutionDate:"",
            resolutionSummary:""
        },
        {
            summary:"Upgrade Server",
            description:"Upgrade the server hardware to improve performance and scalability.",
            project:"Project C",
            personDiscoveredBy:"Peter",
            discDate:"2023-08-14",
            statusOfIssue:"open",
            issuePriority:"High",
            targetDate:"2023-08-30",
            personAssigned:"Chandri",
            resolutionDate:"",
            resolutionSummary:""
        },
        {
            summary:"Add New Feature",
            description:"Implement the new feature to support file uploads.",
            project:"Project C",
            personDiscoveredBy:"Chandri",
            discDate:"2023-08-05",
            statusOfIssue:"resolved",
            issuePriority:"Medium",
            targetDate:"2023-08-20",
            personAssigned:"Ashley",
            resolutionDate:"2023-08-15",
            resolutionSummary:"Implemented file upload feature successfully."
        },
        {
            summary:"Add New Feature",
            description:"Implement the new feature to support file uploads.",
            project:"Project C",
            personDiscoveredBy:"Peter",
            discDate:"2023-08-05",
            statusOfIssue:"resolved",
            issuePriority:"Medium",
            targetDate:"2023-08-11",
            personAssigned:"Kelo",
            resolutionDate:"2023-08-15",
            resolutionSummary:"Implemented file upload feature successfully.",
        },
        {
            summary: "Database Connection Error",
            description: "Unable to establish connection with the database server.",
            project: "Project B",
            personDiscoveredBy: "Ashley",
            discDate: "2023-07-20",
            statusOfIssue: "open",
            issuePriority: "High",
            targetDate: "2023-08-10",
            personAssigned: "Chandri",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary:"Fix Broken Link",
            description:"The link on the homepage leads to a non-existing page.",
            project:"Project A",
            personDiscoveredBy:"Kelo",
            discDate:"2023-08-10",
            statusOfIssue:"open",
            issuePriority:"Low",
            targetDate:"2023-08-25",
            personAssigned:"Ashley",
            resolutionDate:"",
            resolutionSummary:""
        },
        {
            summary: "UI Bug in Dashboard",
            description: "Graphs on the dashboard are not rendering properly.",
            project: "Project A",
            personDiscoveredBy: "Chandri",
            discDate: "2023-07-25",
            statusOfIssue: "open",
            issuePriority: "Medium",
            targetDate: "2023-08-15",
            personAssigned: "Ashley",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Missing Product Images",
            description: "Some product images are not showing up on the website.",
            project: "Project C",
            personDiscoveredBy: "Peter",
            discDate: "2023-08-05",
            statusOfIssue: "open",
            issuePriority: "Low",
            targetDate: "2023-08-20",
            personAssigned: "Chandri",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Authentication Error",
            description: "Users are unable to log in due to an authentication error.",
            project: "Project A",
            personDiscoveredBy: "Peter",
            discDate: "2023-08-10",
            statusOfIssue: "overdue",
            issuePriority: "High",
            targetDate: "2023-08-20",
            personAssigned: "Kelo",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Mobile App Crashes",
            description: "The mobile app crashes when users try to access certain features.",
            project: "Project D",
            personDiscoveredBy: "Kelo",
            discDate: "2023-08-12",
            statusOfIssue: "open",
            issuePriority: "High",
            targetDate: "2023-08-22",
            personAssigned: "Chandri",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Slow Loading Times",
            description: "Website pages are loading slowly, affecting user experience.",
            project: "Project B",
            personDiscoveredBy: "Ashley",
            discDate: "2023-08-15",
            statusOfIssue: "overdue",
            issuePriority: "Medium",
            targetDate: "2023-08-21",
            personAssigned: "Peter",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Missing Data in Reports",
            description: "Reports generated from the system are missing crucial data.",
            project: "Project C",
            personDiscoveredBy: "Chandri",
            discDate: "2023-08-18",
            statusOfIssue: "open",
            issuePriority: "Medium",
            targetDate: "2023-09-03",
            personAssigned: "Peter",
            resolutionDate: "",
            resolutionSummary: ""
        },
        {
            summary: "Payment Gateway Integration",
            description: "Integrate a new payment gateway to expand payment options.",
            project: "Project A",
            personDiscoveredBy: "Kelo",
            discDate: "2023-08-02",
            statusOfIssue: "overdue",
            issuePriority: "Low",
            targetDate: "2023-08-20",
            personAssigned: "Ashley",
            resolutionDate: "",
            resolutionSummary: ""
        }
    ];
    
    // Merge the sample issues
    issueArr.push(...sampleIssues);

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
    function editForm(issue) {
        document.getElementById("form").style.display = "block";
        document.getElementById("personForm").style.display = "none";
        document.getElementById("projectForm").style.display = "none";
        document.getElementById("statusOpen").style.display = "none";
        document.getElementById("statusResolved").style.display = "none";
        document.getElementById("statusOverdue").style.display = "none";

        document.getElementById('summary').value = issue.summary;
        document.getElementById('description').value = issue.description;
        document.getElementById('project').value = issue.project;
        document.getElementById('discPerson').value = issue.personDiscoveredBy;
        document.getElementById('discDate').value = issue.discDate;
        document.getElementById('status').value = issue.statusOfIssue;
        document.getElementById('priority').value = issue.issuePriority;
        document.getElementById('tarDate').value = issue.targetDate;
        document.getElementById('assigned').value = issue.personAssigned;
        document.getElementById('resDate').value = issue.resolutionDate;
        document.getElementById('rsummary').value = issue.resolutionSummary;

        // Assuming you have a button with an id 'updateIssue' for updating the issue
        const updateButton = document.getElementById('updateIssue');
        updateButton.addEventListener('click', function () {
            // Update issue status based on user input
            const newStatus = document.getElementById('status').value;
            if (issue.statusOfIssue !== newStatus) {
                // If the status has changed, remove the card
                const cardToRemove = document.querySelector(`#ticketContainer .ticket #sum[textContent="${issue.summary}"]`).parentNode;
                cardToRemove.remove();

                // Remove the issue from issueArr
                const issueIndex = issueArr.findIndex(existingIssue => existingIssue.summary === issue.summary);
                if (issueIndex !== -1) {
                    issueArr.splice(issueIndex, 1);
                }

                // Store updated issueArr in localStorage
                storeData(issueArr);
            }

            // Close the form after updating
            document.getElementById("form").style.display = "none";
        });
    }
});

//Ticket form Popup
function openForm() {
    document.getElementById("form").style.display = "block";
    document.getElementById("personForm").style.display = "none";
    document.getElementById("projectForm").style.display = "none";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
};
//Close popup form
function closeForm() {
    document.getElementById("form").style.display = "none";
    document.getElementById("personForm").style.display = "none";
    document.getElementById("projectForm").style.display = "none";
    document.getElementById("statusOpen").style.display = "block";
    document.getElementById("statusResolved").style.display = "block";
    document.getElementById("statusOverdue").style.display = "block";
};

//Person Form PopUp
function openFormper() {
    document.getElementById("personForm").style.display = "block";
    document.getElementById("projectForm").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
};

//Close prerson popup form
function closeFormper() {
    document.getElementById("personForm").style.display = "none";
    document.getElementById("projectForm").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("statusOpen").style.display = "block";
    document.getElementById("statusResolved").style.display = "block";
    document.getElementById("statusOverdue").style.display = "block";
};

//Project Form PopUp
function openFormpro() {
    document.getElementById("projectForm").style.display = "block";
    document.getElementById("personForm").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("statusOpen").style.display = "none";
    document.getElementById("statusResolved").style.display = "none";
    document.getElementById("statusOverdue").style.display = "none";
}
//Close project popup form
function closeFormpro() {
    document.getElementById("projectForm").style.display = "none";
    document.getElementById("personForm").style.display = "none";
    document.getElementById("form").style.display = "none";
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
