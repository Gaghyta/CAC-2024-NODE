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


/* ***************************************** MENU CARD ************************************* */

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

/* **************************** LOGIN REGISTRO ELIMINAR CUENTA ***************************** */


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const deleteAccountForm = document.getElementById("delete-account");

  const contenedorLogin = document.getElementById("contenedor-login");
  const modalRegistro = document.getElementById("modal-registro");
  const modalEliminarCuenta = document.getElementById("modal-eliminar-cuenta");

  document.getElementById("registrate").addEventListener("click", function () {
    contenedorLogin.classList.add("hidden");
    modalRegistro.classList.remove("hidden");
  });

  document.getElementById("eliminarUsuario").addEventListener("click", function () {
    contenedorLogin.classList.add("hidden");
    modalEliminarCuenta.classList.remove("hidden");
  });

  document.getElementById("volver-login-eliminar-en-register-form").addEventListener("click", function () {
    modalRegistro.classList.add("hidden");
    contenedorLogin.classList.remove("hidden");
  });

  document.getElementById("volver-login-eliminar-en-delete-account").addEventListener("click", function () {
    modalEliminarCuenta.classList.add("hidden");
    modalRegistro.classList.remove("hidden");
  });

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Registro exitoso!");
        modalRegistro.classList.add("hidden");
        contenedorLogin.classList.remove("hidden");
      } else {
        const errorData = await response.json();
        alert("Error en el registro: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el registro. Inténtalo de nuevo más tarde.");
    }
  });

/*   deleteAccountForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(deleteAccountForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Cuenta eliminada!");
        modalEliminarCuenta.classList.add("hidden");
        modalRegistro.classList.remove("hidden");
      } else {
        const errorData = await response.json();
        alert("Error al eliminar la cuenta: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la cuenta. Inténtalo de nuevo más tarde.");
    }
  }); */
});

/*

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
*/ 


/* **************************** CONTACTO ***************************** */

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