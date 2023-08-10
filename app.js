//test
/*let something = () => {

}
*/
//assigning variables to use them in a loop for the object's properties
let summary = prompt("Please give a summary of the issue you are having.");
let desc = prompt("Please provide a description of the issue.");
let personID = prompt("Who identified the bug?");
let date = prompt("What is on which you discovered the bug?");
let project = prompt("What project is this bug related to?");
let personAssigned = prompt("Please enter your name.");
let statusOfIssue = alert("The status of the issue is: ");

let issues = new issue(`${summary}`, `${desc}`, `${personID}`, `${date}`, `${project}`, `${personAssigned}`, `${statusOfIssue}`);



issue();


//assigning issues
const defPerson = ["Ashley V.", "Chandri B.", "Kelo L.", "Peter S."];

for (let is of issueArr) {
    alert(`Issue ${issueArr[is]} is assigned to ${defPerson[i]}`);
}
