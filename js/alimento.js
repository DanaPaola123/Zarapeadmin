document.addEventListener('DOMContentLoaded', function () {
    const guardarBtn = document.getElementById('guardar');
    const modificarBtn = document.getElementById('modificar');
    const eliminarBtn = document.getElementById('eliminar');
    const limpiarBtn = document.getElementById('limpiar');
    const alimentosTable = document.getElementById('alimentosTable').getElementsByTagName('tbody')[0];
    let selectedRow = null;

    // Función para guardar un nuevo alimento
    guardarBtn.addEventListener('click', function () {
        if (selectedRow) {
            alert('Por favor, utilice el botón "MODIFICAR" para actualizar un alimento seleccionado.');
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;
        const fotoInput = document.getElementById('foto');
        const fotoPreview = document.getElementById('foto-preview');

        if (nombre && precio && descripcion) {
            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const newRow = alimentosTable.insertRow();
                    newRow.insertCell(0).textContent = nombre;
                    newRow.insertCell(1).textContent = precio;
                    newRow.insertCell(2).textContent = descripcion;
                    const fotoCell = newRow.insertCell(3);
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px';
                    fotoCell.appendChild(img);
                    fotoPreview.style.display = 'block';
                    fotoPreview.src = e.target.result;
                };
                reader.readAsDataURL(fotoInput.files[0]);
            } else {
                const newRow = alimentosTable.insertRow();
                newRow.insertCell(0).textContent = nombre;
                newRow.insertCell(1).textContent = precio;
                newRow.insertCell(2).textContent = descripcion;
                newRow.insertCell(3).textContent = 'Sin imagen';
            }

            limpiarFormulario();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    // Función para modificar un alimento existente
    modificarBtn.addEventListener('click', function () {
        if (selectedRow) {
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;
            const descripcion = document.getElementById('descripcion').value;
            const fotoInput = document.getElementById('foto');
            const fotoPreview = document.getElementById('foto-preview');

            if (nombre && precio && descripcion) {
                selectedRow.cells[0].textContent = nombre;
                selectedRow.cells[1].textContent = precio;
                selectedRow.cells[2].textContent = descripcion;

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
            alert('Por favor, seleccione un alimento para modificar.');
        }
    });

    // Función para eliminar un alimento
    eliminarBtn.addEventListener('click', function () {
        if (selectedRow) {
            selectedRow.remove();
            selectedRow = null;
            limpiarFormulario();
        } else {
            alert('Por favor, seleccione un alimento para eliminar.');
        }
    });

    // Función para limpiar el formulario
    limpiarBtn.addEventListener('click', function () {
        limpiarFormulario();
        selectedRow = null;
        const rows = alimentosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
    });

    // Función para seleccionar un alimento en la tabla
    alimentosTable.addEventListener('click', function (e) {
        const rows = alimentosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
        const row = e.target.closest('tr');
        if (row) {
            row.classList.add('selected');
            selectedRow = row;

            document.getElementById('nombre').value = selectedRow.cells[0].textContent;
            document.getElementById('precio').value = selectedRow.cells[1].textContent;
            document.getElementById('descripcion').value = selectedRow.cells[2].textContent;

            const img = selectedRow.cells[3].querySelector('img');
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
        document.getElementById('precio').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('foto').value = '';
        document.getElementById('foto-preview').src = '#';
        document.getElementById('foto-preview').style.display = 'none';
    }
});