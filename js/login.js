//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("login").addEventListener("click", function() {
        let inputEmail = document.getElementById("mail");
        let inputPassword = document.getElementById("pass");
        let camposCompletos = true;
        if (inputEmail.value === "" ) {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputEmail.classList.remove("invalid");           
        }
        if (inputPassword.value === "" ) {
            inputPassword.classList.add("invalid")
            camposCompletos = false;
        } else {
            inputPassword.classList.remove("invalid");
        }
        if (camposCompletos === true) {
            window.location = 'inicio.html'
            window.localStorage = inputEmail
            getUserName();
        } else {
            alert("Por favor ingresar datos correctos")
        }
    })
});

function getUserName(){
    let user = document.getElementById("mail").value;
    let myStorage = window.localStorage;
    myStorage.setItem('username', user);
    window.location = "inicio.html";
}
function signOut() {
    let myStorage = window.localStorage;
    myStorage.clear();
    window.location = "index.html";
}

document.addEventListener("DOMContentLoaded", function(e){
    let username = window.localStorage.getItem("username");
    let userOptions = document.getElementById("userOptions");
 
    userOptions.innerHTML = `<button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="icon-user"></span> `+ username +`
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="#">Perfil</a></li>
    <li><a href="#">Wishlist</a></li>
    <li><a href="#">Compras</a></li>
    <li><hr></li>
    <li><a href="index.html" onclick="signOut()">Cerrar Sesión</a></li>
  </ul>`
 });