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

//Contructor function for a person(?)

function people(fName,lName,email,uName,profPic){
    this.name = fName;
    this.surname = lName;
    this.email = email;
    this.useName = uName;
    this.pfp = profPic;
}

//Contructor function for a project(?)
function projects(proName,proID){
    this.name = proName;
    this.id = proID;
}

let sum = document.getElementById("sum");

console.log(sum);


//Color changing based on priority level

