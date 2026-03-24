// Search functionality
function filterProducts(searchTerm) {
    const searchInput = document.getElementById('searchInput');
    const term = (searchTerm || (searchInput ? searchInput.value : '')).toLowerCase().trim();
    
    if (!term) {
        window.displayProducts(window.products || []);
        return;
    }
    
    const filtered = (window.products || []).filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    
    window.displayProducts(filtered);
}

// Real-time search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
});

// Export products reference
if (typeof products !== 'undefined') {
    window.products = products;
    window.displayProducts = displayProducts;
    window.filterProducts = filterProducts;
}
