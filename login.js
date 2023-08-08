let username = "admin";
let password = "admin";


function HomepageRD(){
 
   if(document.getElementById("name").value == username && document.getElementById("pass").value == password){
     window.location.href = "www.google.com";
    }

   
   else {
    let form = document.getElementById("logform");
     function handleForm(event) { event.preventDefault(); } 
     form.addEventListener('submit', handleForm);
    document.getElementById("invalid").innerHTML = "invalid credentials";
    
   }

}