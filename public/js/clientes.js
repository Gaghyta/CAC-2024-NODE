
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function(modal) {
      new bootstrap.Modal(modal);
  });
});


//let clienteSeleccionado = null;

function buscarCliente() {
    const inputBusqueda = document.getElementById('buscar-cliente-id');
    const clienteId = inputBusqueda.value.trim();

    if (!clienteId) {
        alert('Por favor, ingrese un ID de cliente');
        inputBusqueda.focus();
        return;
    }


    fetch(`/api/clientes/${clienteId}`)
        .then(response => response.json())
        .then(cliente => {
            if (cliente) {
                mostrarClienteIndividual(cliente);
            } else {
                alert('Cliente no encontrado');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al buscar el cliente');
        });
}

function mostrarClienteIndividual(cliente) {
    clienteSeleccionado = cliente;
    const detallesCliente = `
        <p><strong>ID:</strong> ${cliente.id}</p>
        <p><strong>Nombre:</strong> ${cliente.nombre}</p>
        <p><strong>Edad:</strong> ${cliente.edad}</p>
        <p><strong>Dirección:</strong> ${cliente.direccion}</p>
    `;
    document.getElementById('cliente-detalles').innerHTML = detallesCliente;
    document.getElementById('cliente-individual').style.display = 'block';
    document.getElementById('clientes').style.display = 'none';
    
    // Ocultar botones de editar y eliminar en la tabla
    const editarBtns = document.querySelectorAll('.editar-btn');
    const eliminarBtns = document.querySelectorAll('.eliminar-btn');
    editarBtns.forEach(btn => btn.style.display = 'none');
    eliminarBtns.forEach(btn => btn.style.display = 'none');
}


function editarClienteSeleccionado() {
  if (clienteSeleccionado) {
      document.getElementById('editarClienteId').value = clienteSeleccionado.id;
      document.getElementById('editarNombre').value = clienteSeleccionado.nombre;
      document.getElementById('editarEdad').value = clienteSeleccionado.edad;
      document.getElementById('editarDireccion').value = clienteSeleccionado.direccion;
      
      const modal = new bootstrap.Modal(document.getElementById('editarClienteModal'));
      modal.show();
  }
}




function guardarCambiosCliente() {
  const clienteId = document.getElementById('editarClienteId').value;
  const clienteActualizado = {
      nombre: document.getElementById('editarNombre').value,
      edad: document.getElementById('editarEdad').value,
      direccion: document.getElementById('editarDireccion').value
  };

  fetch(`/api/clientes/${clienteId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteActualizado),
  })
  .then(response => response.json())
  .then(data => {
      alert('Cliente actualizado con éxito');
      const modal = bootstrap.Modal.getInstance(document.getElementById('editarClienteModal'));
      modal.hide();
      // Actualizar los datos del cliente seleccionado
      clienteSeleccionado = { ...clienteSeleccionado, ...clienteActualizado };
      mostrarClienteIndividual(clienteSeleccionado);
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Error al actualizar el cliente');
  });
}



function eliminarClienteSeleccionado() {
  if (clienteSeleccionado && confirm('¿Está seguro de que desea eliminar este cliente?')) {
      fetch(`/api/clientes/${clienteSeleccionado.id}`, {
          method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
          alert('Cliente eliminado con éxito');
          // Limpiar la vista del cliente individual
          document.getElementById('cliente-individual').style.display = 'none';
          document.getElementById('cliente-detalles').innerHTML = '';
          clienteSeleccionado = null;
          // Mostrar la tabla de clientes nuevamente
          document.getElementById('clientes').style.display = 'table-row-group';
          // Volver a mostrar los botones de editar y eliminar en la tabla
          const editarBtns = document.querySelectorAll('.editar-btn');
          const eliminarBtns = document.querySelectorAll('.eliminar-btn');
          editarBtns.forEach(btn => btn.style.display = 'inline-block');
          eliminarBtns.forEach(btn => btn.style.display = 'inline-block');
          // Opcionalmente, recargar la lista de clientes
          // location.reload();
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('Error al eliminar el cliente');
      });
  }
}

function mostrarModalAgregarCliente() {
  const modal = new bootstrap.Modal(document.getElementById('agregarClienteModal'));
  modal.show();
}

function agregarNuevoCliente() {
  const nuevoCliente = {
    nombre: document.getElementById('agregarNombre').value,
    edad: document.getElementById('agregarEdad').value,
    direccion: document.getElementById('agregarDireccion').value
  };

  fetch('/api/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoCliente),
  })
  .then(response => response.json())
  .then(data => {
    alert('Cliente agregado con éxito');
    const modal = bootstrap.Modal.getInstance(document.getElementById('agregarClienteModal'));
    modal.hide();
    // Recargar la página para mostrar el nuevo cliente
    location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error al agregar el cliente');
  });
}


/* 
function editarClienteSeleccionado(cliente) {
  console.log('Editando cliente:', cliente);

  // Llenar el formulario con los datos del cliente
  document.getElementById('editarNombre').value = cliente.nombre || '';
  document.getElementById('editarEdad').value = cliente.edad || '';
  document.getElementById('editarDireccion').value = cliente.direccion || '';

  // Abrir el modal
  var modalElement = document.getElementById('editarClienteModal');
  if (modalElement) {
      var myModal = new bootstrap.Modal(modalElement);
      myModal.show();
  } else {
      console.error('Elemento del modal no encontrado');
  }
} */


/* 
function editarClienteSeleccionado(clienteId) {
  console.log('Editando cliente con ID:', clienteId);
  
  // Ajuste esta URL según la ruta correcta de su API
  fetch(`/api-clientes/clientes/${clienteId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(cliente => {
          console.log('Datos del cliente recibidos:', cliente);
          
          // Resto del código para llenar el modal...
      })
      .catch(error => {
          console.error('Error al obtener los datos del cliente:', error);
          alert('Error al cargar los datos del cliente: ' + error.message);
      });
} */

/* function editarClienteSeleccionado(clienteId) {
  console.log('Editando cliente con ID:', clienteId);
  
  // Obtener los datos del cliente
  fetch(`/api-clientes/clientes/${clienteId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(cliente => {
          console.log('Datos del cliente recibidos:', cliente);
          
          // Verificar si los campos existen antes de asignar valores
          if (document.getElementById('editarClienteId')) {
              document.getElementById('editarClienteId').value = cliente.id || '';
          }
          if (document.getElementById('editarNombre')) {
              document.getElementById('editarNombre').value = cliente.nombre || '';
          }
          if (document.getElementById('editarEdad')) {
              document.getElementById('editarEdad').value = cliente.edad || '';
          }
          if (document.getElementById('editarDireccion')) {
              document.getElementById('editarDireccion').value = cliente.direccion || '';
          }

          // Abrir el modal
          var modalElement = document.getElementById('editarClienteModal');
          if (modalElement) {
              var myModal = new bootstrap.Modal(modalElement);
              myModal.show();
          } else {
              console.error('Modal element not found');
          }
      })
      .catch(error => {
          console.error('Error al obtener los datos del cliente:', error);
          alert('Error al cargar los datos del cliente: ' + error.message);
      });
} */