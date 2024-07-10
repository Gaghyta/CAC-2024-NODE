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

document.getElementById('registro-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // Obtener datos del formulario
  const formData = new FormData(this);
  // Mostrar datos del formulario en consola (opcional para depuración)
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Enviar solicitud POST al servidor
  try {
      const response = await fetch('/register', {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error('Error al registrar usuario');
      }

      // Manejar la respuesta del servidor (opcional)
      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Mostrar respuesta del servidor en consola
      alert(data.message); // Mostrar mensaje de éxito

      // Opcional: cerrar el modal de registro
      document.getElementById('registro-form').style.display = 'none';
  } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema al registrar el usuario');
  }
});

// Cambio la URL al hacer clic en 'Regístrate'
document.getElementById("registrate").addEventListener("click", function () {
  // Cambiar la URL en la barra de direcciones
  history.pushState({}, "", "/register");

  // Mostrar el modal de registro
  document.querySelector(".ingreso").classList.add("hidden");
  document.querySelector(".registro").classList.remove("hidden");
});
// Cambiar la URL al hacer clic en 'Ingresar'

document.getElementById("ingresar").addEventListener("click", function () {
    // Cambiar la URL en la barra de direcciones
    history.pushState({}, "", "/login");

    // Mostrar el modal de ingreso
    document.querySelector(".registro").classList.add("hidden");
    document.querySelector(".ingreso").classList.remove("hidden");
  });


document.addEventListener("DOMContentLoaded", function() {
  const modalEliminarCuenta = document.getElementById("modalEliminarCuenta");
  const formEliminarCuenta = document.getElementById("formEliminarCuenta");

  // Evento para abrir el modal
  document.getElementById("abrirModalEliminar").addEventListener("click", function() {
    modalEliminarCuenta.style.display = "block";
  });

  // Evento para cerrar el modal
  document.querySelector(".close").addEventListener("click", function() {
    modalEliminarCuenta.style.display = "none";
  });

  // Evento para enviar la solicitud DELETE al servidor
  document.addEventListener("DOMContentLoaded", function() {
    const modalEliminarCuenta = document.getElementById("modalEliminarCuenta");
  
    // Evento para abrir el modal
    document.getElementById("abrirModalEliminar").addEventListener("click", function() {
      modalEliminarCuenta.style.display = "block";
    });
  
    // Evento para cerrar el modal
    document.querySelector(".close").addEventListener("click", function() {
      modalEliminarCuenta.style.display = "none";
    });
  
    // Evento para enviar la solicitud DELETE al servidor
    document.getElementById("delete-account").addEventListener("submit", async function(event) {
      event.preventDefault();
  
      try {
        const response = await fetch('/delete-account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'username',  // reemplaza con el nombre de usuario correcto
            email: 'email',        // reemplaza con el correo electrónico correcto
            password: 'password'   // reemplaza con la contraseña correcta
          })
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar cuenta');
        }
  
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito
  
        // Cerrar el modal después de eliminar la cuenta
        modalEliminarCuenta.style.display = "none";
      } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        alert('Hubo un problema al eliminar la cuenta');
      }
    });
  });
});

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/* document.addEventListener("DOMContentLoaded", () => {
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
}); */
