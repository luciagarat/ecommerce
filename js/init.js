const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL1 = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_URL2 = "https://raw.githubusercontent.com/luciagarat/ecommerce/main/js/producto2.json";
const PRODUCT_INFO_URL3 = "https://raw.githubusercontent.com/luciagarat/ecommerce/main/js/producto3.json";
const PRODUCT_INFO_URL4 = "https://raw.githubusercontent.com/luciagarat/ecommerce/main/js/producto4.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function getUserName(){
  let user = document.getElementById("mail").value;
  let myStorage = window.localStorage;
  myStorage.setItem('username', user);
  window.location = "inicio.html";
}
function signOut() {
  let myStorage = window.localStorage;
  myStorage.removeItem("username");
  window.location.href = "index.html";
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   let username = window.localStorage.getItem("username");
   let userOptions = document.getElementById("userOptions");

   userOptions.innerHTML = `<button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <span class="icon-user"><i class="fas fa-user-astronaut"></i></span> 
   <span class="caret"></span>`+ username +`
 </button>
 <ul class="dropdown-menu">
   <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
   <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
   <li><hr></li>
   <li><a class="dropdown-item" href="#" onclick="signOut()">Cerrar Sesión</a></li>
 </ul>`
});