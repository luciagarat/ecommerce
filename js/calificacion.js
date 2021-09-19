function getRating() {
    var elements = document.getElementsByName("rating");
    for (var i = 0; i < elements.length; i++) {
        if ( elements[i].checked ) {
            return parseInt(elements[i].value);
        }
    }
}
document.addEventListener("DOMContentLoaded", function(e){
    let rating = document.getElementById("stars");
    let estrellas = "";
     estrellas += 
   `<div class="star-rating center">
   <input id="star-5" type="radio" name="rating" value="5"  />
   <label for="star-5" title="5 stars">
     <i class="active fa fa-star"></i>
   </label>

   <input id="star-4" type="radio" name="rating" value="4"/>
   <label for="star-4" title="4 stars">
     <i class="active fa fa-star"></i>
   </label>

   <input id="star-3" type="radio" name="rating" value="3"/>
   <label for="star-3" title="3 stars">
     <i class="active fa fa-star"></i>
   </label>

   <input id="star-2" type="radio" name="rating" value="2" />
   <label for="star-2" title="2 stars">
     <i class="active fa fa-star"></i>
   </label>

   <input id="star-1" type="radio" name="rating" value="1" checked/>
   <label for="star-1" title="1 star">
     <i class="active fa fa-star"></i>
   </label>
   
 </div>
    `;
    rating.innerHTML += estrellas;
});

let date= new Date();
let dia = date.getDay();
let mes = date.getMonth();
let anio = date.getFullYear();
let hora = date.getHours();
let minutos = date.getMinutes();
let sec = date.getSeconds();
let  fecha = anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + sec;


