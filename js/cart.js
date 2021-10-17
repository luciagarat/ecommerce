function showCartInfo(array) {
    let info
    let subtot=0;
    let tot = 0;

    for (let i = 0; i < array.articles.length; i++) {
        let cantidad = parseInt(array.articles[i].count);
        let precio = parseInt(array.articles[i].unitCost);
        subtot = cantidad * precio;
        info = `
            <div id="elemento${i}" class="ml-2 list-group-item">
                <div class="row ml-1">
                    <div class="col-2 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <img src="${array.articles[i].src}" class="img-thumbnail" style="height:90%">
                    </div>
                    <div class="col-8 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-1 font-weight-bold text-center">
                        ${array.articles[i].name}
                        <br>
                        <br>
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <button id="btnR${i}" class="btnMen" onclick="restar(${i}, ${precio})">-</button>
                            <input id="quantity${i}" type="text" value=${cantidad} style="width:50px; height:20px" onchange="subtot( ${i}, ${precio})"
                            class="form-control"><button id="btnS${i}" onclick="sumar(${i}, ${precio})" class="btnMas">+</button>
                        </div>
                    </div>
                    <div class="col-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 text-center mt-5">
                            ${precio}  <div class="d-inline" >${array.articles[i].currency}</div>
                    </div>
                    <div class="row col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-3 d-flex justify-content-center mt-5">
                        <div id="Subtotal${i}" class="subtotales">${subtot}</div><div class="currency">${array.articles[i].currency}</div>
                    </div>
                    <div class="col-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1 text-right d-inline mt-5 quitar">
                    <i onclick="borrar(${i})" class="fa fa-trash"></i>
                    </div>
                </div>
            </div>`;         
          
        document.getElementById("carrito").innerHTML += info;
       
    };
    tot = total();
        
};
function restar (i, precio){
    let q = parseInt(document.getElementById(`quantity${i}`).value);
    if(q > 1){
    q= q - 1;
    document.getElementById(`quantity${i}`).value= q;
    } else{
        q = 1;
        document.getElementById(`quantity${i}`).value= q;
    }
 subtot(i, precio);
  
};

function sumar (i, precio){
    q= parseInt(document.getElementById(`quantity${i}`).value)+ 1;
    document.getElementById(`quantity${i}`).value= q;
   subtot(i, precio)
 };
function subtot(i, precio){
    let subT = parseInt(document.getElementById(`quantity${i}`).value) * parseInt(precio);
    document.getElementById(`Subtotal${i}`).innerHTML = subT;
  total()
};
function borrar(i){
    let element = document.getElementById(`elemento${i}`);
    padre = element.parentNode;
    padre = padre.removeChild(element);
    total();
};
function total(){
    let total=0;
    let valuacion=40;
    let subs= document.getElementsByClassName("subtotales");
    let currency= document.getElementsByClassName("currency");
   for(let i=0; i < subs.length; i++){
    if (currency[i].innerHTML == "USD"){
        total+= parseInt(subs[i].innerHTML) * valuacion;
    } else{
        total+= parseInt(subs[i].innerHTML);
    }
    }
    document.getElementById("total").innerHTML = "$" + total;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data;
            showCartInfo(cartInfo);
        }
        else {
            throw Error(resultObj.statusText)
        }
    })
});
