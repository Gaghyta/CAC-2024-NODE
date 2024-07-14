function mostrarReservas(reserva) {
    const reservasTabla = document.getElementById('reservas-tabla');
    reservasTabla.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

    reserva.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reserva.id}</td>
            <td>${reserva.nombre}</td>
            <td>${reserva.edad}</td>
            <td>${reserva.direccion}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarCliente(${reserva.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${reserva.id})">Eliminar</button>
            </td>
        `;
        reservasTabla.appendChild(row);
    });
}

module.exports= {
    reservas,
}