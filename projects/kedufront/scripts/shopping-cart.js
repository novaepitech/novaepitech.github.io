// Get the products from local storage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Display each product
products.forEach((product, index) => {
    // Create a div for the product
    const div = document.createElement('div');
    div.classList.add('cart-product');

    // Create elements for the product details
    const img = document.createElement('img');
    const name = document.createElement('p');
    const price = document.createElement('p');
    const quantity = document.createElement('p');

    // Set the details
    img.src = product.imageUrl;
    name.textContent = product.name;
    price.textContent = product.price + ' €';
    quantity.textContent = 'Quantité: ' + product.quantity;

    // Create buttons for modifying quantity
    const addButton = document.createElement('button');
    const removeButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    // Set button text
    addButton.textContent = '+';
    removeButton.textContent = '-';
    deleteButton.textContent = 'Retirer';

    // Add event listeners to buttons
    addButton.addEventListener('click', () => {
        product.quantity++;
        quantity.textContent = 'Quantité: ' + product.quantity;
        localStorage.setItem('products', JSON.stringify(products));
    });

    removeButton.addEventListener('click', () => {
        if (product.quantity > 1) {
            product.quantity--;
            quantity.textContent = 'Quantité: ' + product.quantity;
        } else {
            div.remove();
            products.splice(index, 1);
        }
        localStorage.setItem('products', JSON.stringify(products));
    });

    deleteButton.addEventListener('click', () => {
        div.remove();
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
    });

    // Add the details and buttons to the div
    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(quantity);
    div.appendChild(addButton);
    div.appendChild(removeButton);
    div.appendChild(deleteButton);

    // Add the div to the page
    document.getElementById('cart-items').appendChild(div);
});

// Create a div for the order summary
const orderSummary = document.createElement('div');
orderSummary.className = 'order-summary';

// Create elements for the order details
const title = document.createElement('h2');
const subtotal = document.createElement('p');
const shipping = document.createElement('p');
const discount = document.createElement('p');
const total = document.createElement('p');

// Set the details
title.textContent = 'Résumé de la commande';
subtotal.textContent = 'Sous-total: ' + calculateSubtotal(products) + ' €';
shipping.textContent = 'Livraison: Gratuite';
discount.textContent = 'Réduction: -';
total.textContent = 'Total: ' + calculateTotal(products) + ' €';

// Add the details to the order summary
orderSummary.appendChild(title);
orderSummary.appendChild(subtotal);
orderSummary.appendChild(shipping);
orderSummary.appendChild(discount);
orderSummary.appendChild(total);

const wrapper = document.querySelector('.wrapper');

// Add the order summary to the page
wrapper.appendChild(orderSummary);

// Calculate the subtotal
function calculateSubtotal(products) {
    let subtotal = 0;
    products.forEach(product => {
        subtotal += product.price * product.quantity;
    });
    return subtotal;
}

// Calculate the total
function calculateTotal(products) {
    return calculateSubtotal(products);
}
