// North Bengal Shopping Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Darjeeling First Flush Tea",
            description: "Premium first flush tea from Darjeeling hills",
            price: 850,
            image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "tea",
            badge: "Bestseller",
            artisan: "Rajesh Thapa"
        },
        {
            id: 2,
            name: "Kalimpong Cardamom",
            description: "Organic green cardamom from Kalimpong valley",
            price: 320,
            image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
            category: "spices",
            badge: "Organic",
            artisan: "Amit Chettri"
        },
        {
            id: 3,
            name: "Handwoven Woolen Shawl",
            description: "Traditional woolen shawl from Kalimpong",
            price: 1200,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
            category: "textiles",
            badge: "Handmade",
            artisan: "Maya Rai"
        },
        {
            id: 4,
            name: "Dooars Forest Honey",
            description: "Pure forest honey from Dooars region",
            price: 450,
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            category: "food",
            badge: "Pure",
            artisan: "Local Beekeepers"
        },
        {
            id: 5,
            name: "Bamboo Craft Basket",
            description: "Handcrafted bamboo basket from Dooars",
            price: 600,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
            category: "handicraft",
            badge: "Eco-friendly",
            artisan: "Local Artisans"
        },
        {
            id: 6,
            name: "Darjeeling Second Flush",
            description: "Muscatel flavor second flush tea",
            price: 720,
            image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            category: "tea",
            badge: "Popular",
            artisan: "Rajesh Thapa"
        }
    ];

    // Shopping cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCategory = 'all';

    // Initialize the website
    initializeWebsite();

    function initializeWebsite() {
        loadProducts();
        updateCartCount();
        setupEventListeners();
        setupSearchFunctionality();
    }

    function loadProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const filteredProducts = currentCategory === 'all' 
            ? products 
            : products.filter(product => product.category === currentCategory);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image" style="background-image: url('${product.image}')">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-artisan">By: ${product.artisan}</p>
                    <div class="product-price">₹${product.price}</div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn-wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Category filtering
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function() {
                const category = this.dataset.category;
                currentCategory = category;
                loadProducts();
                
                // Update active state
                document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Cart functionality
        document.querySelector('.cart-icon').addEventListener('click', openCart);
        document.getElementById('closeCart').addEventListener('click', closeCart);
        document.getElementById('cartOverlay').addEventListener('click', closeCart);
        document.querySelector('.checkout-btn').addEventListener('click', proceedToCheckout);

        // Newsletter form
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showNotification(`Thank you for subscribing with ${email}!`, 'success');
            this.reset();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    function setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.artisan.toLowerCase().includes(searchTerm)
            );
            
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image" style="background-image: url('${product.image}')">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    </div>
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-artisan">By: ${product.artisan}</p>
                        <div class="product-price">₹${product.price}</div>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn-wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }

    // Cart functions
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        showNotification(`${product.name} added to cart!`, 'success');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        showNotification('Item removed from cart', 'info');
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                updateCart();
            }
        }
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    }

    // Make functions available globally for onclick events
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;

    function openCart() {
        updateCartDisplay();
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
    }

    function closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('cartOverlay').classList.remove('active');
    }

    function proceedToCheckout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        showNotification('Proceeding to checkout...', 'success');
        closeCart();
        // In a real application, this would redirect to checkout page
    }

    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        let icon = 'fa-check-circle';
        let bgColor = 'var(--primary)';
        
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
            bgColor = '#f44336';
        } else if (type === 'info') {
            icon = 'fa-info-circle';
            bgColor = 'var(--accent)';
        }
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 600;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .artisan-card, .testimonial-card, .offer-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    console.log('North Bengal Shopping Website initialized successfully!');
});

// Utility functions
function formatPrice(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatPrice };
}