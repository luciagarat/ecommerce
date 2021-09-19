function mostrarInfo(array) {
    let producto = document.getElementById("product-info");
    let imagenes = [];
    imagenes = array.images;
  let mostrar = "";
  mostrar = `
    <br>
    <div class="row">
    <div id="carouselExampleIndicators" class="carousel slide w-50" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner">
    <div class="carousel-item active">
        <img class="d-block w-100" width="780px" src="`+ imagenes[0] +`">
    </div>
    <div class="carousel-item">
        <img class="d-block w-100" width="780px" src="`+ imagenes[1] +`">
    </div>
    <div class="carousel-item">
        <img class="d-block w-100" width="780px" src="`+ imagenes[2] +`">
    </div>
    <div class="carousel-item">
        <img class="d-block w-100" width="780px" src="`+ imagenes[3] +`">
    </div>
    <div class="carousel-item">
        <img class="d-block w-100" width="780px" src="`+ imagenes[4] +`">
    </div>        
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>
    <div class="info">
    <div class="NOMBRE">` + array.name + `<br></div>    
    <div class="desc"><p>` + array.description + `</p></div>
    <div class="precio"> ` + array.cost + " " + array.currency + `</div>
    <div class="cant"> Cantidad vendida: ` + array.soldCount + `</div>
    <button onclick="location.href='#'" class="btn btn-dark btn-see-more"><i class="fa fa-shopping-cart"></i> Comprar</button>
    </div>
    </div>`;
producto.innerHTML = mostrar;
};
function mostrarComments(array){
    let commentSection = document.getElementById("commentSection");
    let comentarios = "";
    for(let i=0; i < array.length; i++){
        comentarios += `
        <div class="row"><div class="desc user"><strong>`+ array[i].user + `</strong></div><div class="cant" style="text-align: right;"> ` + array[i].dateTime +` </div></div>
        <div class="desc"><p>`+ array[i].description +`</div>
        <div><div class="cant">Score: `+ array[i].score +`</div>`        
        for (let j=0; j < 5; j++){
            if(j < array[i].score){
            comentarios +=`<span class="fa fa-star checked" style="font-size: 14pt;"></span>`
            } else {
            comentarios +=`<span class="far fa-star" style="font-size: 14pt;"></span>`
            }
        }
        `</div>
        <br><br>`;
    }
    commentSection.innerHTML = comentarios;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let num = localStorage.getItem("Id");
    let Url;
    if(num === "1"){
       Url = PRODUCT_INFO_URL1;
    }else if(num === "2"){
        Url = PRODUCT_INFO_URL2
    }else if(num === "3"){
        Url = PRODUCT_INFO_URL3;
    }else{
        Url = PRODUCT_INFO_URL4;
    }
    getJSONData(Url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            mostrarInfo(productInfo)
        }
        else{
            throw Error(resultObj.statusText)
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
            mostrarComments(productComments)
        }
        else{
            throw Error(resultObj.statusText)
        }
    });

    document.getElementById("sendComm").addEventListener("click", function(){

        let comentario = {
            idProd: JSON.parse(localStorage.getItem('Id')),
            user: localStorage.getItem('username'),
            description: document.getElementById('newComment').value,
            dateTime: fecha,
            score: getRating(),
        };

    
        productComments.push(comentario);
        
        mostrarComments(productComments);
        document.getElementById('newComment').value = "";
   
    });

});


