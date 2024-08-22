document.addEventListener('DOMContentLoaded', function () {
    const guardarBtn = document.getElementById('guardar');
    const modificarBtn = document.getElementById('modificar');
    const eliminarBtn = document.getElementById('eliminar');
    const limpiarBtn = document.getElementById('limpiar');
    const sucursalesTable = document.getElementById('sucursalesTable').getElementsByTagName('tbody')[0];
    const buscarInput = document.getElementById('buscar');
    let selectedRow = null;

    // Función para buscar y resaltar filas
    buscarInput.addEventListener('input', function () {
        const filter = buscarInput.value.toLowerCase();
        const rows = sucursalesTable.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < cells.length; j++) {
                const cellContent = cells[j].textContent || cells[j].innerText;
                if (cellContent.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }

            if (found) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });

    // Guardar sucursal
    guardarBtn.addEventListener('click', function () {
        if (selectedRow) {
            alert('Por favor, utilice el botón "MODIFICAR" para actualizar una fila seleccionada.');
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const hora = document.getElementById('hora').value; // Captura el valor de la hora
        const fotoInput = document.getElementById('foto');
        const fotoPreview = document.getElementById('foto-preview');

        if (nombre && direccion && telefono && hora) { // Añade hora a la verificación
            const newRow = sucursalesTable.insertRow();
            newRow.insertCell(0).textContent = nombre;
            newRow.insertCell(1).textContent = direccion;
            newRow.insertCell(2).textContent = telefono;

            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px';
                    newRow.insertCell(3).appendChild(img);
                    fotoPreview.src = e.target.result;
                    fotoPreview.style.display = 'block';
                };
                reader.readAsDataURL(fotoInput.files[0]);
            } else {
                newRow.insertCell(3).textContent = 'Sin imagen';
            }

            newRow.insertCell(4).textContent = hora; // Añade la hora a la nueva fila

            newRow.addEventListener('click', function () {
                selectRow(newRow);
            });

            limpiarFormulario();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Modificar sucursal
    modificarBtn.addEventListener('click', function () {
        if (selectedRow) {
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;
            const hora = document.getElementById('hora').value; // Captura el valor de la hora
            const fotoInput = document.getElementById('foto');
            const fotoPreview = document.getElementById('foto-preview');

            if (nombre && direccion && telefono && hora) { // Añade hora a la verificación
                selectedRow.cells[0].textContent = nombre;
                selectedRow.cells[1].textContent = direccion;
                selectedRow.cells[2].textContent = telefono;
                selectedRow.cells[4].textContent = hora; // Modifica la celda de la hora

                if (fotoInput.files && fotoInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = selectedRow.cells[3].querySelector('img');
                        if (img) {
                            img.src = e.target.result;
                        } else {
                            const newImg = document.createElement('img');
                            newImg.src = e.target.result;
                            newImg.style.maxWidth = '100px';
                            selectedRow.cells[3].appendChild(newImg);
                        }
                        fotoPreview.src = e.target.result;
                        fotoPreview.style.display = 'block';
                    };
                    reader.readAsDataURL(fotoInput.files[0]);
                }

                limpiarFormulario();
                selectedRow.classList.remove('selected');
                selectedRow = null;
            } else {
                alert('Por favor, complete todos los campos.');
            }
        } else {
            alert('Por favor, seleccione una fila para modificar.');
        }
    });

    // Eliminar sucursal
    eliminarBtn.addEventListener('click', function () {
        if (selectedRow) {
            sucursalesTable.deleteRow(selectedRow.rowIndex - 1);
            limpiarFormulario();
            selectedRow = null;
        } else {
            alert('Por favor, seleccione una fila para eliminar.');
        }
    });

    // Limpiar formulario
    limpiarBtn.addEventListener('click', function () {
        limpiarFormulario();
        if (selectedRow) {
            selectedRow.classList.remove('selected');
            selectedRow = null;
        }
    });

    // Seleccionar fila
    function selectRow(row) {
        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }
        selectedRow = row;
        selectedRow.classList.add('selected');

        document.getElementById('nombre').value = selectedRow.cells[0].textContent;
        document.getElementById('direccion').value = selectedRow.cells[1].textContent;
        document.getElementById('telefono').value = selectedRow.cells[2].textContent;
        document.getElementById('hora').value = selectedRow.cells[4].textContent; // Muestra la hora seleccionada

        const img = selectedRow.cells[3].querySelector('img');
        if (img) {
            document.getElementById('foto-preview').src = img.src;
            document.getElementById('foto-preview').style.display = 'block';
        } else {
            document.getElementById('foto-preview').style.display = 'none';
        }
    }

    // Limpiar formulario
    function limpiarFormulario() {
        document.getElementById('nombre').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('hora').value = ''; // Limpia el campo de hora
        document.getElementById('foto').value = '';
        document.getElementById('foto-preview').src = '#';
        document.getElementById('foto-preview').style.display = 'none';
    }
});

