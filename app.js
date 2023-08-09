let issueArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const people = ['Ashley', 'Chandri', 'Kelo', 'Peter'];

    setupAutocomplete('discovered-by', people);
    setupAutocomplete('assigned-to', people);
    function setupAutocomplete(inputId, people) {
        let input = document.getElementById(inputId);
        const suggestionsContainer = document.createElement('ul');
        suggestionsContainer.classList.add('suggestions');
        document.body.appendChild(suggestionsContainer); // Append container to body once

        input.addEventListener('focus', () => {
            const value = input.value.toLowerCase();
            const filteredPeople = people.filter(person => person.toLowerCase().includes(value));
            displaySuggestions(filteredPeople, input);
        });

        // Clear suggestions when clicking outside the input
        document.addEventListener('click', (event) => {
            if (!input.contains(event.target) && !suggestionsContainer.contains(event.target)) {
                suggestionsContainer.innerHTML = '';
            }
        });

        input.nextElementSibling.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                input.value = event.target.textContent;
                suggestionsContainer.innerHTML = ''; // Clear suggestions after selecting
            }
        });

        function displaySuggestions(filteredPeople, input) {
            console.log('Filtered People:', filteredPeople);
            const suggestions = filteredPeople.map(person => `<li>${person}</li>`).join('');
            suggestionsContainer.innerHTML = suggestions;
            if (input.value !== '' && !filteredPeople.includes(input.value)) {
                suggestionsContainer.innerHTML += `<li>${input.value}</li>`;
            }
            document.body.appendChild(suggestionsContainer);

            // Clear previous suggestions and append new ones
            while (suggestionsContainer.firstChild) {
                suggestionsContainer.removeChild(suggestionsContainer.firstChild);
            }
            filteredPeople.forEach(person => {
                const suggestionElement = document.createElement('li');
                suggestionElement.textContent = person;
                suggestionsContainer.appendChild(suggestionElement);
            });

            console.log('Suggestions:', suggestions);
            return suggestions;
        }
    }
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        addIssue();
        window.location.href = "Home.html";
    });
});

// Add issue function
const addIssue = () => {
    let issue = {
        id: Date.now(),
        summary: document.getElementById('summary').value,
        description: document.getElementById('description').value,
        project: document.getElementById('project').value,
        discoveredBy: document.getElementById('discovered-by').value,
        dateDiscovered: document.getElementById('date-discovered').value,
        statusOfIssue: document.getElementById('status-input').value,
        priorityLevel: document.getElementById('priority-input').value,
        targetDate: document.getElementById('target-date').value,
        personAssigned: document.getElementById('assigned-to').value,
        resolutionDate: document.getElementById('res-date').value,
        resolutionSummary: document.getElementById('res-summary').value,
    }
    issueArray.push(issue);
    document.forms[0].reset();      // Clears the form for the next entries

    //Display purposes only
    console.warn('added', { issueArray });
    let pre = document.querySelector('#msg pre')
    pre.textContent = '\n' + JSON.stringify(issueArray, null, 2);

    // save to localStorage
    localStorage.setItem('IssueList', JSON.stringify(issueArray));
}