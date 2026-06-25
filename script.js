let saldo = 0;
let hidden = false;
const saldoInput = document.getElementById('saldo');
const toggleBtn = document.getElementById('toggleBtn');

function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

toggleBtn.addEventListener('click', function() {
    hidden = !hidden;
    if (hidden) {
        saldoInput.value = 'Rp •••••••';
        toggleBtn.textContent = '🙈';
    } else {
        saldoInput.value = formatRupiah(saldo);
        toggleBtn.textContent = '👁️';
    }
});

saldoInput.value = formatRupiah(saldo);