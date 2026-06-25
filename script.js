let data = JSON.parse(localStorage.getItem('cashflow')) || [];

function addData() {
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    
    if (!desc || !amount) return alert('Isi keterangan & jumlah!');
    
    data.push({ id: Date.now(), desc, amount, type });
    saveData();
    
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
}

function deleteData(id) {
    data = data.filter(item => item.id !== id);
    saveData();
}

function saveData() {
    localStorage.setItem('cashflow', JSON.stringify(data));
    render();
}

function render() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    
    let balance = 0;
    
    data.forEach(item => {
        if (item.type === 'income') balance += item.amount;
        else balance -= item.amount;
        
        list.innerHTML += `
            <div class="item">
                <span>${item.desc} - Rp ${item.amount.toLocaleString('id-ID')}</span>
                <span class="${item.type}">${item.type}</span>
                <button onclick="deleteData(${item.id})">Hapus</button>
            </div>
        `;
    });
    
    document.getElementById('balance').textContent = 'Rp ' + balance.toLocaleString('id-ID');
}

render();