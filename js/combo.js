document.addEventListener('DOMContentLoaded', function () {
    const guardarBtn = document.getElementById('guardar');
    const modificarBtn = document.getElementById('modificar');
    const eliminarBtn = document.getElementById('eliminar');
    const limpiarBtn = document.getElementById('limpiar');
    const combosTable = document.getElementById('combosTable').getElementsByTagName('tbody')[0];
    const buscarInput = document.getElementById('buscar');
    let selectedRow = null;

    
    buscarInput.addEventListener('input', function () {
        const filter = buscarInput.value.toLowerCase();
        const rows = combosTable.getElementsByTagName('tr');

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

    guardarBtn.addEventListener('click', function () {
        if (selectedRow) {
            alert('Por favor, utilice el botón "MODIFICAR" para actualizar una fila seleccionada.');
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const bebida = document.getElementById('bebida').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;
        const alimento = document.getElementById('alimento').value;
        const fotoInput = document.getElementById('foto');
        const fotoPreview = document.getElementById('foto-preview');

        if (nombre && bebida && precio && descripcion && alimento) {
            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const newRow = combosTable.insertRow();
                    newRow.insertCell(0).textContent = nombre;
                    newRow.insertCell(1).textContent = bebida;
                    newRow.insertCell(2).textContent = precio;
                    newRow.insertCell(3).textContent = descripcion;
                    newRow.insertCell(4).textContent = alimento;
                    const fotoCell = newRow.insertCell(5);
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px';
                    fotoCell.appendChild(img);
                    fotoPreview.style.display = 'block';
                    fotoPreview.src = e.target.result;
                };
                reader.readAsDataURL(fotoInput.files[0]);
            } else {
                const newRow = combosTable.insertRow();
                newRow.insertCell(0).textContent = nombre;
                newRow.insertCell(1).textContent = bebida;
                newRow.insertCell(2).textContent = precio;
                newRow.insertCell(3).textContent = descripcion;
                newRow.insertCell(4).textContent = alimento;
                newRow.insertCell(5).textContent = 'Sin imagen';
            }

            
            limpiarFormulario();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    modificarBtn.addEventListener('click', function () {
        if (selectedRow) {
            const nombre = document.getElementById('nombre').value;
            const bebida = document.getElementById('bebida').value;
            const precio = document.getElementById('precio').value;
            const descripcion = document.getElementById('descripcion').value;
            const alimento = document.getElementById('alimento').value;
            const fotoInput = document.getElementById('foto');
            const fotoPreview = document.getElementById('foto-preview');

            if (nombre && bebida && precio && descripcion && alimento) {
                selectedRow.cells[0].textContent = nombre;
                selectedRow.cells[1].textContent = bebida;
                selectedRow.cells[2].textContent = precio;
                selectedRow.cells[3].textContent = descripcion;
                selectedRow.cells[4].textContent = alimento;

                if (fotoInput.files && fotoInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = selectedRow.cells[5].querySelector('img');
                        if (img) {
                            img.src = e.target.result;
                        } else {
                            const newImg = document.createElement('img');
                            newImg.src = e.target.result;
                            newImg.style.maxWidth = '100px';
                            selectedRow.cells[5].appendChild(newImg);
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
            alert('Por favor, seleccione una fila para modificar.');
        }
    });

    eliminarBtn.addEventListener('click', function () {
        if (selectedRow) {
            selectedRow.remove();
            selectedRow = null;
            limpiarFormulario();
        } else {
            alert('Por favor, seleccione una fila para eliminar.');
        }
    });

    limpiarBtn.addEventListener('click', function () {
        limpiarFormulario();
        selectedRow = null;
        const rows = combosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
    });

    combosTable.addEventListener('click', function (e) {
        const rows = combosTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove('selected');
        }
        const row = e.target.closest('tr');
        if (row) {
            row.classList.add('selected');
            selectedRow = row;

            
            document.getElementById('nombre').value = selectedRow.cells[0].textContent;
            document.getElementById('bebida').value = selectedRow.cells[1].textContent;
            document.getElementById('precio').value = selectedRow.cells[2].textContent;
            document.getElementById('descripcion').value = selectedRow.cells[3].textContent;
            document.getElementById('alimento').value = selectedRow.cells[4].textContent;

            const img = selectedRow.cells[5].querySelector('img');
            if (img) {
                document.getElementById('foto-preview').src = img.src;
                document.getElementById('foto-preview').style.display = 'block';
            } else {
                document.getElementById('foto-preview').style.display = 'none';
            }
        }
    });

    function limpiarFormulario() {
        document.getElementById('nombre').value = '';
        document.getElementById('bebida').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('alimento').value = '';
        document.getElementById('foto').value = '';
        document.getElementById('foto-preview').src = '#';
        document.getElementById('foto-preview').style.display = 'none';
    }
});
