document.addEventListener('DOMContentLoaded', function() {
    fetchClientes();
});

async function fetchClientes() {
    try {
        const response = await fetch('/api/clientes');
        if (!response.ok) {
            throw new Error('Error al obtener clientes');
        }
        const clientes = await response.json();
        console.log('Clientes:', clientes);
        mostrarClientes(clientes); // Llamar función para mostrar clientes en la interfaz
    } catch (error) {
        console.error('Error:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz
    }
}

function mostrarClientes(clientes) {
    const clientesTabla = document.getElementById('clientes-tabla');
    clientesTabla.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.edad}</td>
            <td>${cliente.direccion}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        clientesTabla.appendChild(row);
    });
}

function eliminarCliente(id) {
    fetch(`/api/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar cliente');
        }
        cargarClientes(); // Volver a cargar clientes después de eliminar
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz
    });
}

function editarCliente(id) {
    alert('Editar cliente ' + id); // Ejemplo básico de editar cliente
}

// Función para cargar todos los clientes al iniciar la página
function cargarClientes() {
    fetchClientes();
}
