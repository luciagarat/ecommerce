function editar() {
  let inputs = document.getElementsByName("inputs");
  for (let i = 1; i <= inputs.length; i++) {
    document.getElementById("input0" + i).removeAttribute("disabled", true)
  }
  document.getElementById("btnSubmit").removeAttribute("class", "d-none")
  document.getElementById("btnEdit").setAttribute("class", "d-none")
}

(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          let info = JSON.stringify({
            Nombre: document.getElementById("input01").value, Apellido: document.getElementById("input02").value, Edad: document.getElementById("input03").value,
            Contacto: document.getElementById("input04").value, Email: document.getElementById("input05").value
          });
          localStorage.setItem("Datos de perfil", info);
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  if (localStorage.getItem("Datos de perfil") === null) {
    document.getElementById("btnSubmit").removeAttribute("class", "d-none");
    document.getElementById("btnEdit").classList.add("d-none");
    document.getElementById("input05").value = localStorage.getItem("email");
  } else {
    let json = localStorage.getItem("Datos de perfil");
    let datos = JSON.parse(json);

    document.getElementById("input01").value = datos.Nombre;
    document.getElementById("input02").value = datos.Apellido;
    document.getElementById("input03").value = datos.Edad;
    document.getElementById("input04").value = datos.Contacto;
    document.getElementById("input05").value = datos.Email;
    document.getElementById("input01").setAttribute("disabled", true);
    document.getElementById("input02").setAttribute("disabled", true);
    document.getElementById("input03").setAttribute("disabled", true);
    document.getElementById("input04").setAttribute("disabled", true);
    document.getElementById("input05").setAttribute("disabled", true);
    localStorage.setItem("email", document.getElementById("input05").value)
  }
});