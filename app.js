//test
/*let something = () => {

}
*/
const issueArr = [];

//creating issues
function issue(s, d, p, da, pr, pe, st){
    this.summary = s;
    this.desc = d;
    this.personID = p;
    this.date = da;
    this.project = pr;
    this.personAssigned = pe;
    this.statusOfIssue = st;

    let numOfIssues = prompt("How many issues would you like to submit?");

    //assigning variables to use them in a loop for the object's properties
    let summary = prompt("Please give a summary of the issue you are having.");
    let desc = prompt("Please provide a description of the issue.");
    let personID = prompt("Who identified the bug?");
    let date = prompt("What is on which you discovered the bug?");
    let project = prompt("What project is this bug related to?");
    let personAssigned = prompt("Please enter your name.");
    let statusOfIssue = alert("The status of the issue is: ");

        //this loop asks the user how many issues they want to submit and sends the objects to the array
        for(i = 1; i < numOfIssues; i++)
        {
            let issues = new issue(`${summary}`, `${desc}`, `${personID}`, `${date}`, `${project}`, `${personAssigned}`, `${statusOfIssue}`);

            issueArr.push(issues);
        }
}

issue();


//assigning issues
