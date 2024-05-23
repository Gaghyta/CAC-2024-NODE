document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modal");
  var modalImg = document.getElementById("modal-img");
  var close = document.getElementById("close");

  // Añadir evento de clic a cada imagen
  document.querySelectorAll(".img-item").forEach(function (img) {
    img.addEventListener("click", function () {
      modal.style.display = "flex"; // Cambiar a 'flex' para centrar la imagen
      modalImg.src = this.src;
      document.body.classList.add("modal-open"); // Añadir clase para efecto blur
    });
  });

  // Cerrar el modal al hacer clic en la 'x'
  close.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.classList.remove("modal-open"); // Quitar clase para efecto blur
  });

  // Cerrar el modal al hacer clic fuera de la imagen
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open"); // Quitar clase para efecto blur
    }
  });
});
