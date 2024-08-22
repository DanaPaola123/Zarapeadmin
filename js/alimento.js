document.addEventListener('DOMContentLoaded', function () {
    const buscarInput = document.getElementById('buscar');
    const alimentosTable = document.getElementById('alimentosTable').getElementsByTagName('tbody')[0];

    buscarInput.addEventListener('input', function () {
        const filter = buscarInput.value.toLowerCase();
        const rows = alimentosTable.getElementsByTagName('tr');

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
});
