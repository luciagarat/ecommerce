function cargarDatos(url) {
document.getElementById("container p-5").innerHTML = "";
fetch(url)
    .then(respuesta => respuesta.json())

    .then(datos => {
        let tabla = document.getElementById("container p-5");
        let cargar = "";
        cargar += `
        <table> 
            <tr>
                <td> <div class="NOMBRE"> ` + datos[0].name + `<br> </div> <img class = "Imagn" src="`+ datos[0].imgSrc +`"> <br><div class="desc">` + datos[0].description +`</div><div class="precio"> ` + datos[0].cost + " " + datos[0].currency + `</div> <div class="cant"> Cantidad vendida: ` + datos[0].soldCount + `</div></td>                   
                <td> <div class="NOMBRE"> ` + datos[1].name + `<br></div> <img class = "Imagn" src="`+ datos[1].imgSrc +`"> <br><div class="desc">` + datos[1].description + `</div><div class="precio"> ` + datos[1].cost + " " + datos[1].currency + `</div> <div class="cant"> Cantidad vendida: ` + datos[1].soldCount + `</div> </td>
            </tr>
            <tr>
                <td> <div class="NOMBRE"> ` + datos[2].name + `<br> </div> <img class = "Imagn" src="`+ datos[2].imgSrc +`"> <br><div class="desc">` + datos[2].description + `</div><div class="precio"> ` + datos[2].cost + " " + datos[2].currency + `</div> <div class="cant"> Cantidad vendida: ` + datos[2].soldCount + `</div></td>                
                <td> <div class="NOMBRE"> ` + datos[3].name + `<br> </div> <img class = "Imagn" src="`+ datos[3].imgSrc +`"> <br><div class="desc">` + datos[3].description +`</div><div class="precio"> ` + datos[3].cost + " " + datos[3].currency + `</div> <div class="cant"> Cantidad vendida: ` + datos[3].soldCount + `</div></td>                   
            </tr>                
        </table>;`
        tabla.innerHTML = cargar;
    })        
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

    document.addEventListener("DOMContentLoaded", function () {
        cargarDatos(PRODUCTS_URL)
});