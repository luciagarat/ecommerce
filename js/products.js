var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === "Asc") {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === "Desc") {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === "relevancia") {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function cargarDatos(array) {
    let tabla = document.getElementById("container p-5");
    let cargar = "";
    let k=0;
    for (let i = 0; i < array.length; i++) {
        let j = i + 1;
        if (((minCount == undefined) || (minCount != undefined && parseInt(array[i].cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(array[i].cost) <= maxCount))) {
                if(buscar == undefined || array[i].name.toLowerCase().includes(buscar) || array[i].description.toLowerCase().includes(buscar)){
                        if (k==2){
                            cargar+=`<br>
                            <div class="tabla`+ k +`">
                                <div class="NOMBRE"> ` + array[i].name + `<br></div> 
                                <img class = "Imagn" src="` + array[i].imgSrc + `"> <br>
                                <div class="desc">` + array[i].description + `</div>
                                <div class="precio"> ` + array[i].cost + " " + array[i].currency + `</div>
                                <div class="cant"> Cantidad vendida: ` + array[i].soldCount + `</div>
                                <button id="`+ j +`" class="btn btn-dark btn-see-more">Ver producto</button>
                            </div>`
                        }else { 
                            cargar += `
                            <div class="tabla`+ k +`">
                                <div class="NOMBRE"> ` + array[i].name + `<br></div>
                                <img class = "Imagn" src="` + array[i].imgSrc + `"> <br>
                                <div class="desc">` + array[i].description + `</div>
                                <div class="precio"> ` + array[i].cost + " " + array[i].currency + `</div>
                                <div class="cant"> Cantidad vendida: ` + array[i].soldCount + `</div>
                                <button id="`+ j +`" class="btn btn-dark btn-see-more">Ver producto</button>
                            </div>
                        `};
                        k=k+1;
                    };
            tabla.innerHTML = cargar;

        }
    };
};
function sortAndShowProducts(criteria, array) {

    currentArray = sortProducts(criteria, array);

    cargarDatos(currentArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            cargarDatos(productsArray)
            document.getElementById("sortAsc").addEventListener("click", function () {
                sortAndShowProducts("Asc", productsArray)
            })
            document.getElementById("sortDesc").addEventListener("click", function () {
                sortAndShowProducts("Desc", productsArray)
            })
            document.getElementById("sortByCount").addEventListener("click", function () {
                sortAndShowProducts("relevancia", productsArray)
            })
            document.getElementById("rangeFilterCount").addEventListener("click", function () {

                minCount = document.getElementById("rangeFilterCountMin").value;
                maxCount = document.getElementById("rangeFilterCountMax").value;
                
                if ((minCount < 0 || minCount == "")) {
                    minCount = undefined;
                }

                if ((maxCount < 0 || maxCount == "")) {
                    maxCount = undefined;
                }

                cargarDatos(productsArray);
            });
            document.getElementById("clearRangeFilter").addEventListener("click", function(){
                document.getElementById("rangeFilterCountMin").value = "";
                document.getElementById("rangeFilterCountMax").value = "";
        
                minCount = undefined;
                maxCount = undefined;
        
                cargarDatos(productsArray);
            });
            document.getElementById("busqueda").addEventListener('input', function(){
            buscar = document.getElementById("busqueda").value.toLowerCase();
            cargarDatos(productsArray)
            });
            document.getElementById("1").addEventListener("click", function(){
                localStorage.setItem("Id", this.id)
                window.location = 'product-info.html';
            })
            document.getElementById("2").addEventListener("click", function(){
                localStorage.setItem("Id", this.id)
                window.location = 'product-info.html';
            })
            document.getElementById("3").addEventListener("click", function(){
                localStorage.setItem("Id", this.id)
                window.location = 'product-info.html';
            })
            document.getElementById("4").addEventListener("click", function(){
                localStorage.setItem("Id", this.id)
                window.location = 'product-info.html';
            })
        };

    });

});