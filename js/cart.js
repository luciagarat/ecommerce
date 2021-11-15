let oK = false;

function showCartInfo(array) {
    let info
    let subtot = 0;
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
    costoFinal(0);
};
function restar(i, precio) {
    let q = parseInt(document.getElementById(`quantity${i}`).value);
    if (q > 1) {
        q = q - 1;
        document.getElementById(`quantity${i}`).value = q;
    } else {
        q = 1;
        document.getElementById(`quantity${i}`).value = q;
    }
    subtot(i, precio);

};

function sumar(i, precio) {
    q = parseInt(document.getElementById(`quantity${i}`).value) + 1;
    document.getElementById(`quantity${i}`).value = q;
    subtot(i, precio)
};
function subtot(i, precio) {
    let subT = parseInt(document.getElementById(`quantity${i}`).value) * parseInt(precio);
    document.getElementById(`Subtotal${i}`).innerHTML = subT;
    total()
};
function borrar(i) {
    let element = document.getElementById(`elemento${i}`);
    padre = element.parentNode;
    padre = padre.removeChild(element);
    total();
};
function total() {
    let total = 0;
    let valuacion = 40;
    let subs = document.getElementsByClassName("subtotales");
    let currency = document.getElementsByClassName("currency");
    for (let i = 0; i < subs.length; i++) {
        if (currency[i].innerHTML == "USD") {
            total += parseInt(subs[i].innerHTML) * valuacion;
        } else {
            total += parseInt(subs[i].innerHTML);
        }
    }
    document.getElementById("total").innerHTML = total;
    shipping()
}
var costoEnvio;
function shipping() {
    let ship = document.getElementsByName("envio");
    for (var i = 0; i < ship.length; i++) {
        if (ship[i].checked) {
            costoEnvio = document.getElementById("envio" + i).value * parseInt(document.getElementById("total").innerHTML);
        }
    }
    costoFinal(costoEnvio)
}
function costoFinal(nvo) {
    let precioFinal = 0;
    if (nvo != 0) {
        precioFinal = nvo + parseInt(document.getElementById("total").innerHTML);
    } else {
        precioFinal = parseInt(document.getElementById("total").innerHTML);
    }
    document.getElementById("costoCompleto").innerHTML = precioFinal;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation()
                document.getElementById("finalizar").setAttribute("data-toggle", "modal")
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


//Funcion que se ejecuta una vez que se haya lanzado el evento de
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
    });

    document.getElementById("btnSave").addEventListener("click", function (e) {
        let name = document.getElementById("titular").value;
        let nro = document.getElementById("nro").value;
        let expM = document.getElementById("expmonth").value;
        let expY = document.getElementById("expyear").value;
        let cvv = document.getElementById("cvv").value;
        let validacion = true;

        if (name == "") {
            validacion = false;
            let titular = document.getElementById("feedbackTitular");
            titular.classList.remove("d-none");
        } else {
            let titular = document.getElementById("feedbackTitular");
            titular.classList.add("d-none");
        }
        if (nro == "") {
            validacion = false;
            let num = document.getElementById("feedbackNro");
            num.classList.remove("d-none");
        } else {
            let num = document.getElementById("feedbackNro");
            num.classList.add("d-none");
        }
        if (expM == "" || expY == "") {
            validacion = false;
            let fecha = document.getElementById("feedbackFecha");
            fecha.classList.remove("d-none");
        } else {
            let fecha = document.getElementById("feedbackFecha");
            fecha.classList.add("d-none");
        }
        if (cvv == "") {
            validacion = false;
            let cVV = document.getElementById("feedbackCVV");
            cVV.classList.remove("d-none");
        } else {
            let cVV = document.getElementById("feedbackCVV");
            cVV.classList.add("d-none");
        }
        if (validacion) {
            alert("metodo de pago aceptado!")
            document.getElementById("btnClose").removeAttribute("class", "d-none");
            document.getElementById("btnClose").setAttribute("class", "btn btn-info");
            document.getElementById("btnSave").setAttribute("class", "d-none");
            oK = true;
        }
        document.getElementById("campos").classList.add("was-validated");
    });
    document.getElementById("btnTransfer").addEventListener("click", function (e) {
        let cuenta = document.getElementById("transfer").value;
        let comprobante = document.getElementById("comprobante").value;
        let completos = true;
        if (cuenta == "") {
            let alerta = document.getElementById("feedbackCuenta");
            alerta.classList.remove("d-none")
            completos = false;
        } else {
            let alerta = document.getElementById("feedbackCuenta");
            alerta.classList.add("d-none")
        }
        if (comprobante == "") {
            let aviso = document.getElementById("feedbackComprobante");
            aviso.classList.remove("d-none");
            completos = false;
        } else{
            let aviso = document.getElementById("feedbackComprobante");
            aviso.classList.add("d-none");
        }
        if (completos) {
            document.getElementById("btnOKTransfer").removeAttribute("class", "d-none");
            document.getElementById("btnOKTransfer").setAttribute("class", "btn btn-info");
            document.getElementById("btnTransfer").setAttribute("class", "d-none");
            oK = true;
            alert("Metodo de pago aceptado!")
        }
    });

    document.getElementById("finalizar").addEventListener("click", function (e) {
        if (oK ==true && document.getElementById("total").innerHTML !=0 && document.getElementById("validationCustom03").value != "" && document.getElementById("inputState").value !="" && parseInt(document.getElementById("costoCompleto").innerHTML) != parseInt(document.getElementById("total").innerHTML) ) {
            document.getElementById("finalizar").setAttribute("data-toggle", "modal");
            document.getElementById("finalizar").setAttribute("data-target", "#mod");
        } else {
            alert("Verificar Campos Vacios")
        }
    });
});
