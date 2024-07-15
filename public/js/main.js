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
    document.body.classList.remove("modal-open"); // Sacar clase para efecto blur
  });

  // Cerrar el modal al hacer clic fuera de la imagen
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open"); // Sacar clase para efecto blur
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".menu-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Recuperar los datos del localStorage al cargar la página
  document.getElementById("validationDefault01").value =
    localStorage.getItem("nombre") || "";
  document.querySelector("input[aria-label='Apellido']").value =
    localStorage.getItem("apellido") || "";
  document.querySelector("input[aria-label='email']").value =
    localStorage.getItem("email") || "";
  document.getElementById("flexRadioDefault1").checked =
    localStorage.getItem("clienteHabitual") === "true";
  document.getElementById("flexRadioDefault2").checked =
    localStorage.getItem("primeraVez") === "true";
  document.getElementById("flexCheckDefault").checked =
    localStorage.getItem("suscribirseNewsletter") === "true";
  document.getElementById("flexCheckChecked").checked =
    localStorage.getItem("recibirNoticias") === "true";
  document.getElementById("flexCheckDefault2").checked =
    localStorage.getItem("recibirPromociones") === "true";
  document.getElementById("validationTextarea").value =
    localStorage.getItem("mensaje") || "";

  // Guardar los datos en el localStorage al enviar el formulario
  document.getElementById("botoncito").addEventListener("click", (event) => {
    event.preventDefault(); // Evita el envío del formulario para demostración
    localStorage.setItem(
      "nombre",
      document.getElementById("validationDefault01").value
    );
    localStorage.setItem(
      "apellido",
      document.querySelector("input[aria-label='Apellido']").value
    );
    localStorage.setItem(
      "email",
      document.querySelector("input[aria-label='email']").value
    );
    localStorage.setItem(
      "clienteHabitual",
      document.getElementById("flexRadioDefault1").checked
    );
    localStorage.setItem(
      "primeraVez",
      document.getElementById("flexRadioDefault2").checked
    );
    localStorage.setItem(
      "suscribirseNewsletter",
      document.getElementById("flexCheckDefault").checked
    );
    localStorage.setItem(
      "recibirNoticias",
      document.getElementById("flexCheckChecked").checked
    );
    localStorage.setItem(
      "recibirPromociones",
      document.getElementById("flexCheckDefault2").checked
    );
    localStorage.setItem(
      "mensaje",
      document.getElementById("validationTextarea").value
    );

    alert("Datos guardados en el almacenamiento local");
  });
});