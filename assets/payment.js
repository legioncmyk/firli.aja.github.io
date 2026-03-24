// Payment methods data
const paymentMethods = [
    {
        name: "DANA",
        number: "082143041255",
        owner: "Firlian Agna Syahrial",
        icon: "💜"
    },
    {
        name: "GOPAY",
        number: "082143041255",
        owner: "Rohmawati Romadona",
        icon: "💚"
    },
    {
        name: "SHOPEEPAY",
        number: "082143041255",
        owner: "Firlian Agna Syahrial",
        icon: "🟠"
    },
    {
        name: "OVO",
        number: "082143041255",
        owner: "Firlian Agna Syahrial",
        icon: "💙"
    },
    {
        name: "BRI",
        number: "017701025350530",
        owner: "Firlian Agna Syahrial",
        icon: "🏦"
    },
    {
        name: "BNI",
        number: "1909356562",
        owner: "Firlian Agna Syahrial",
        icon: "🏦"
    }
];

// Load order data
function loadOrderData() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    if (!order) {
        window.location.href = '../index.html';
        return null;
    }
    return order;
}

// Display order summary
function displayOrderSummary() {
    const order = loadOrderData();
    if (!order) return;
    
    const summaryDiv = document.getElementById('orderSummary');
    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <div class="order-item">
                <h3>📦 Produk yang Dibeli:</h3>
                <p class="product-name-order">${order.name}</p>
                <p class="product-price-order">Rp ${order.price.toLocaleString('id-ID')}</p>
            </div>
        `;
    }
    return order;
}

// Display payment methods
function displayPaymentMethods() {
    const methodsContainer = document.getElementById('paymentMethods');
    if (!methodsContainer) return;
    
    methodsContainer.innerHTML = paymentMethods.map(method => `
        <div class="payment-card" onclick="selectPayment('${method.name}')">
            <div class="payment-icon">${method.icon}</div>
            <div class="payment-info">
                <div class="payment-name">${method.name}</div>
                <div class="payment-number">${method.number}</div>
                <div class="payment-owner">a.n ${method.owner}</div>
            </div>
        </div>
    `).join('');
}

// Select payment method
function selectPayment(methodName) {
    const method = paymentMethods.find(m => m.name === methodName);
    if (method) {
        localStorage.setItem('selectedPayment', JSON.stringify(method));
        document.getElementById('selectedPaymentMethod').innerHTML = `
            <div class="selected-payment">
                <span>✅ Metode Pembayaran: ${method.name}</span>
                <span>📞 ${method.number}</span>
            </div>
        `;
    }
}

// Send to WhatsApp
function sendToWhatsApp() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    const payment = JSON.parse(localStorage.getItem('selectedPayment'));
    
    if (!order) {
        alert('Data order tidak ditemukan!');
        return;
    }
    
    if (!payment) {
        alert('Silakan pilih metode pembayaran terlebih dahulu!');
        return;
    }
    
    const message = `*ORDER FIRLIAJA STORE*%0A%0A` +
        `Produk: ${order.name}%0A` +
        `Harga: Rp ${order.price.toLocaleString('id-ID')}%0A` +
        `Metode Pembayaran: ${payment.name}%0A` +
        `Nomor Tujuan: ${payment.number}%0A` +
        `a.n ${payment.owner}%0A%0A` +
        `*Detail Pembeli:*%0A` +
        `Nama: [isi nama Anda]%0A` +
        `Email: [isi email Anda]%0A%0A` +
        `*Bukti Transfer:* [lampirkan screenshot]%0A%0A` +
        `_Mohon konfirmasi setelah transfer_`;
    
    const waUrl = `https://wa.me/6282143041255?text=${message}`;
    window.open(waUrl, '_blank');
}

// Send to QRIS
function sendToQRIS() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!order) {
        alert('Data order tidak ditemukan!');
        return;
    }
    
    const message = `*ORDER FIRLIAJA STORE (QRIS)*%0A%0A` +
        `Produk: ${order.name}%0A` +
        `Harga: Rp ${order.price.toLocaleString('id-ID')}%0A` +
        `Metode: QRIS%0A%0A` +
        `*Detail Pembeli:*%0A` +
        `Nama: [isi nama Anda]%0A` +
        `Email: [isi email Anda]%0A%0A` +
        `*Bukti Scan QRIS:* [lampirkan screenshot]%0A%0A` +
        `_Mohon konfirmasi setelah pembayaran_`;
    
    const waUrl = `https://wa.me/6285169307731?text=${message}`;
    window.open(waUrl, '_blank');
}

// Initialize payment page
document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    displayPaymentMethods();
    
    const order = loadOrderData();
    if (order) {
        document.getElementById('totalAmount').innerHTML = `
            <div class="total-amount">
                <strong>Total Pembayaran:</strong>
                <span class="price">Rp ${order.price.toLocaleString('id-ID')}</span>
            </div>
        `;
    }
});
