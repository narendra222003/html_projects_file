document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');

    fetch('assets/products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                    <button onclick="viewProduct(${product.id})">View Details</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });
});

function addToCart(productId) {
    console.log('Add to cart', productId);
}

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}
