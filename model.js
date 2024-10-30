class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    totalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCartDisplay();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    displayItems() {
        return this.items.map(item => `
            ${item.product.name} - Quantity: ${item.quantity} - Total: $${item.totalPrice().toFixed(2)} 
            <button class="remove-item" data-id="${item.product.id}">Remove</button>
        `).join('<br />');
    }

    updateCartDisplay() {
        const cartElement = document.getElementById('cart');
        const totalPriceElement = document.getElementById('totalPrice');
        cartElement.innerHTML = this.displayItems() || 'Your cart is empty.';
        totalPriceElement.innerText = this.getTotal().toFixed(2);

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });
    }
}

// Initialize the cart
const cart = new ShoppingCart();

// Create products
const products = [
    new Product(1, 'Apple iPad Mini 6', 20.00),
    new Product(2, 'iPad Air 4 10.9-inch', 25.00),
    new Product(3, 'Samsung Galaxy S21', 30.00),
    new Product(4, 'Flip 4 teckno', 22.00)
];

// Add event listeners to the Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantityElement = button.parentElement.querySelector('.amount');
        const quantity = parseInt(quantityElement.innerText);
        cart.addItem(products[index], quantity);
    });
});

// Add event listeners to the quantity buttons
document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', () => {
        const quantityElement = button.parentElement.querySelector('.amount');
        quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
    });
});

document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', () => {
        const quantityElement = button.parentElement.querySelector('.amount');
        const currentValue = parseInt(quantityElement.innerText);
        if (currentValue > 1) {
            quantityElement.innerText = currentValue - 1;
        }
    });
});
