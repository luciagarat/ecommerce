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
        if (((minCount == undefined) || (minCount != undefined && parseInt(array[i].cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(array[i].cost) <= maxCount))) {
                if(buscar == undefined || array[i].name.toLowerCase().includes(buscar) || array[i].description.toLowerCase().includes(buscar)){
                    if (i <= 1){
                        cargar += `
                            <div class="tabla`+ k +`">
                                <div class="NOMBRE"> ` + array[i].name + `<br> 
                                </div> <img class = "Imagn" src="` + array[i].imgSrc + `"> <br>
                                <div class="desc">` + array[i].description + `</div>
                                <div class="precio"> ` + array[i].cost + " " + array[i].currency + `</div>
                                <div class="cant"> Cantidad vendida: ` + array[i].soldCount + `</div>
                            </div>
                        `} else if (k==2){
                            cargar+=`<br>
                            <div class="tabla`+ k +`">
                            <div class="NOMBRE"> ` + array[i].name + `<br> 
                            </div> <img class = "Imagn" src="` + array[i].imgSrc + `"> <br>
                            <div class="desc">` + array[i].description + `</div>
                            <div class="precio"> ` + array[i].cost + " " + array[i].currency + `</div>
                            <div class="cant"> Cantidad vendida: ` + array[i].soldCount + `</div>
                        </div>`
                        }else { 
                            cargar += `
                            <div class="tabla`+ k +`">
                                <div class="NOMBRE"> ` + array[i].name + `<br> 
                                </div> <img class = "Imagn" src="` + array[i].imgSrc + `"> <br>
                                <div class="desc">` + array[i].description + `</div>
                                <div class="precio"> ` + array[i].cost + " " + array[i].currency + `</div>
                                <div class="cant"> Cantidad vendida: ` + array[i].soldCount + `</div>
                            </div>
                        `};
                        k=k+1;
                    };
            tabla.innerHTML = cargar;

        }
    };
};
function sortAndShowProducts(criteria, array) {
    currentCriteria = criteria;

    if (array != undefined) {
        currentArray = array;
    }

    currentArray = sortProducts(currentCriteria, currentArray);

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
                //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                //de productos por categoría.
                minCount = document.getElementById("rangeFilterCountMin").value;
                maxCount = document.getElementById("rangeFilterCountMax").value;

                if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
                    minCount = parseInt(minCount);
                }
                else {
                    minCount = undefined;
                }

                if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
                    maxCount = parseInt(maxCount);
                }
                else {
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
        };

    });

});