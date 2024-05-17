const defaultUser = {username: 'admin',password: 'admin'}
const user1 = {username:'bob1978', password:'bob456'}
const user2 = {username:'loremIps', password:'doloremque'}

const usernameInput = document.querySelector('#name');
const passwordInput = document.querySelector('#pass');
const invalidCreds = document.querySelector('#invalid');
const loginForm = document.querySelector("#login-form");

function handleForm(event) { 
    event.preventDefault();
    checkUser();
}

function checkUser(){
    for(let user of [defaultUser, user1, user2]){
        if(usernameInput.value === user.username && passwordInput.value === user.password){
            window.location.href = 'Home.html';
        }else{
            invalidCreds.textContent = "Invalid Credentials"
        }
    }
}

loginForm.addEventListener('submit', handleForm);