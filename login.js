let username = "admin";
let password = "admin";

let form = document.getElementById("logform");

function handleForm(event) { 
   
   event.preventDefault();
 
   if(document.getElementById("name").value == username && document.getElementById("pass").value == password){
      window.location.href = 'Home.html';
    }

   else {
    document.getElementById("invalid").innerHTML = "Invalid credentials";
   } 
}

form.addEventListener('submit', handleForm);