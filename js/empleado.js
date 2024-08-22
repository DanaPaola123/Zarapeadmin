document.addEventListener('DOMContentLoaded', function () {
    const guardarBtn = document.getElementById('guardar');
    const modificarBtn = document.getElementById('modificar');
    const eliminarBtn = document.getElementById('eliminar');
    const limpiarBtn = document.getElementById('limpiar');
    const empleadosTable = document.getElementById('empleadosTable').getElementsByTagName('tbody')[0];
    const buscarInput = document.getElementById('buscar');
    let selectedRow = null;

    // Función para guardar un nuevo empleado
    guardarBtn.addEventListener('click', function () {
        if (selectedRow) {
            alert('Por favor, utilice el botón "MODIFICAR" para actualizar un empleado seleccionado.');
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const direccion = document.getElementById('direccion').value;
        const curp = document.getElementById('curp').value;
        const fotoInput = document.getElementById('foto');
        const fotoPreview = document.getElementById('foto-preview');

        if (nombre && edad && direccion && curp) {
            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const newRow = empleadosTable.insertRow();
                    newRow.insertCell(0).textContent = nombre;
                    newRow.insertCell(1).textContent = edad;
                    newRow.insertCell(2).textContent = direccion;
                    newRow.insertCell(3).textContent = curp;
                    const fotoCell = newRow.insertCell(4);
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px';
                    fotoCell.appendChild(img);
                    fotoPreview.style.display = 'block';
                    fotoPreview.src = e.target.result;
                };
                reader.readAsDataURL(fotoInput.files[0]);
            } else {
                const newRow = empleadosTable.insertRow();
                newRow.insertCell(0).textContent = nombre;
                newRow.insertCell(1).textContent = edad;
                newRow.insertCell(2).textContent = direccion;
                newRow.insertCell(3).textContent = curp;
                newRow.insertCell(4).textContent = 'Sin imagen';
            }

            limpiarFormulario();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
    

    buscarInput.addEventListener('input', function () {
    const filter = buscarInput.value.toLowerCase();
    const rows = empleadosTable.getElementsByTagName('tr');

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

    // Función para modificar un empleado existente
    modificarBtn.addEventListener('click', function () {
        if (selectedRow) {
            const nombre = document.getElementById('nombre').value;
            const edad = document.getElementById('edad').value;
            const direccion = document.getElementById('direccion').value;
            const curp = document.getElementById('curp').value;
            const fotoInput = document.getElementById('foto');
            const fotoPreview = document.getElementById('foto-preview');

            if (nombre && edad && direccion && curp) {
                selectedRow.cells[0].textContent = nombre;
                selectedRow.cells[1].textContent = edad;
                selectedRow.cells[2].textContent = direccion;
                selectedRow.cells[3].textContent = curp;

                if (fotoInput.files && fotoInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = selectedRow.cells[4].querySelector('img');
                        if (img) {
                            img.src = e.target.result;
                        } else {
                            const newImg = document.createElement('img');
                            newImg.src = e.target.result;
                            newImg.style.maxWidth = '100px';
                            selectedRow.cells[4].appendChild(newImg);
                        }
                        fotoPreview.style.display = 'block';
                        fotoPreview.src = e.target.result;
                    };
                    reader.readAsDataURL(fotoInput.files[0]);
                }

                selectedRow.classList.remove('selected');
                selectedRow = null;
                limpiarFormulario();
            } else {
                alert('Por favor, complete todos los campos.');
            }
        } else {
            alert('Por favor, seleccione un empleado para modificar.');
        }
    });

    // Función para eliminar un empleado
    eliminarBtn.addEventListener('click', function () {
        if (selectedRow) {
            selectedRow.remove();
            selectedRow = null;
            limpiarFormulario();
        } else {
            alert('Por favor, seleccione un empleado para eliminar.');
        }
    });

    // Función para limpiar el formulario
    limpiarBtn.addEventListener('click', function () {
        limpiarFormulario();
        selectedRow = null;
        const rows = empleadosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
    });

    // Función para seleccionar un empleado en la tabla
    empleadosTable.addEventListener('click', function (e) {
        const rows = empleadosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
        const row = e.target.closest('tr');
        if (row) {
            row.classList.add('selected');
            selectedRow = row;

            document.getElementById('nombre').value = selectedRow.cells[0].textContent;
            document.getElementById('edad').value = selectedRow.cells[1].textContent;
            document.getElementById('direccion').value = selectedRow.cells[2].textContent;
            document.getElementById('curp').value = selectedRow.cells[3].textContent;

            const img = selectedRow.cells[4].querySelector('img');
            if (img) {
                document.getElementById('foto-preview').src = img.src;
                document.getElementById('foto-preview').style.display = 'block';
            } else {
                document.getElementById('foto-preview').style.display = 'none';
            }
        }
    });

    // Función para limpiar el formulario
    function limpiarFormulario() {
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('curp').value = '';
        document.getElementById('foto').value = '';
        document.getElementById('foto-preview').src = '#';
        document.getElementById('foto-preview').style.display = 'none';
    }
});
