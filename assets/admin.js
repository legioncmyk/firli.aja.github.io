// Admin credentials (simple login for demo)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "firliaja2024"
};

// Admin dashboard functions
class AdminDashboard {
    constructor() {
        this.orders = this.loadOrders();
        this.products = window.products || [];
    }
    
    loadOrders() {
        const stored = localStorage.getItem('adminOrders');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveOrders() {
        localStorage.setItem('adminOrders', JSON.stringify(this.orders));
    }
    
    addOrder(order) {
        this.orders.unshift({
            ...order,
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'pending'
        });
        this.saveOrders();
        this.renderOrders();
    }
    
    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
            this.renderOrders();
        }
    }
    
    renderOrders() {
        const ordersList = document.getElementById('ordersList');
        if (!ordersList) return;
        
        if (this.orders.length === 0) {
            ordersList.innerHTML = '<p class="no-orders">Belum ada order</p>';
            return;
        }
        
        ordersList.innerHTML = this.orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">#${order.id}</span>
                    <span class="order-status status-${order.status}">${order.status}</span>
                </div>
                <div class="order-details">
                    <p><strong>Produk:</strong> ${order.productName}</p>
                    <p><strong>Harga:</strong> Rp ${order.price.toLocaleString('id-ID')}</p>
                    <p><strong>Tanggal:</strong> ${new Date(order.date).toLocaleString('id-ID')}</p>
                </div>
                <div class="order-actions">
                    <button onclick="adminDashboard.updateOrderStatus(${order.id}, 'processed')" class="btn-process">Proses</button>
                    <button onclick="adminDashboard.updateOrderStatus(${order.id}, 'completed')" class="btn-complete">Selesai</button>
                    <button onclick="adminDashboard.updateOrderStatus(${order.id}, 'cancelled')" class="btn-cancel">Batal</button>
                </div>
            </div>
        `).join('');
    }
    
    renderProductStats() {
        const statsDiv = document.getElementById('productStats');
        if (!statsDiv) return;
        
        statsDiv.innerHTML = `
            <div class="stat-card">
                <h3>Total Produk</h3>
                <p class="stat-number">${this.products.length}</p>
            </div>
            <div class="stat-card">
                <h3>Total Order</h3>
                <p class="stat-number">${this.orders.length}</p>
            </div>
            <div class="stat-card">
                <h3>Order Pending</h3>
                <p class="stat-number">${this.orders.filter(o => o.status === 'pending').length}</p>
            </div>
        `;
    }
}

// Login function
function adminLogin() {
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3000);
        } else {
            alert('Username atau password salah!');
        }
    }
}

// Check admin auth
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'dashboard.html' && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Initialize admin dashboard
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    
    if (document.getElementById('ordersList')) {
        adminDashboard = new AdminDashboard();
        adminDashboard.renderOrders();
        adminDashboard.renderProductStats();
    }
});
