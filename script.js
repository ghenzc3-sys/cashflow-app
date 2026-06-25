let data = JSON.parse(localStorage.getItem('cashflowKucing')) || [];

function addData() {
    let desc = document.getElementById('desc').value;
    let amount = parseInt(document.getElementById('amount').value);
    let type = document.getElementById('type').value;
    
    if(desc == '' || isNaN(amount)) {
        alert('Meong! Isi keterangan & jumlah dulu 😿');
        return;
    }
    
    data.push({desc, amount, type, id: Date.now()});
    localStorage.setItem('cashflowKucing', JSON.stringify(data));
    showData();
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
}

function showData() {
    let list = document.getElementById('list');
    let balance = 0;
    list.innerHTML = '';
    
    data.forEach(item => {
        let row = document.createElement('tr');
        let typeText = item.type == 'income' ? '🐟 Masuk' : '🐾 Keluar';
        let typeClass = item.type == 'income' ? 'income' : 'expense';
        
        row.innerHTML = `
            <td>${item.desc}</td>
            <td class="${typeClass}">${typeText}</td>
            <td class="${typeClass}">Rp ${item.amount.toLocaleString('id-ID')}</td>
            <td><button class="delete-btn" onclick="deleteData(${item.id})">Hapus</button></td>
        `;
        list.appendChild(row);
        
        balance += item.type == 'income' ? item.amount : -item.amount;
    });
    
    document.getElementById('balance').innerText = 'Rp ' + balance.toLocaleString('id-ID');
}

function deleteData(id) {
    data = data.filter(item => item.id != id);
    localStorage.setItem('cashflowKucing', JSON.stringify(data));
    showData();
}

showData();