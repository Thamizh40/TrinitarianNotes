// JAVASCRIPT FILE - script.js
// Save this as: js/script.js

// Global Variables
let currentCategory = 'all';
let cart = [];

// GUMROAD PRODUCT LINKS
// Replace these with your actual Gumroad product URLs after you create them
const gumroadLinks = {
    'Complete Romans Study': 'https://yourusername.gumroad.com/l/romans-study',
    '40 Days of Prayer': 'https://yourusername.gumroad.com/l/prayer-devotional',
    'Gospel of John Commentary': 'https://yourusername.gumroad.com/l/john-commentary',
    'Prophets of the Old Testament': 'https://yourusername.gumroad.com/l/prophets-study',
    'Fruit of the Spirit Devotional': 'https://yourusername.gumroad.com/l/fruit-spirit',
    'Life of Jesus Complete Study': 'https://yourusername.gumroad.com/l/jesus-life',
    // Bundle links
    'complete-study-bundle': 'https://yourusername.gumroad.com/l/study-bundle',
    'devotional-bundle': 'https://yourusername.gumroad.com/l/devotional-bundle',
    'complete-library': 'https://yourusername.gumroad.com/l/complete-library'
};

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('scriptureSourceCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('scriptureSourceCart', JSON.stringify(cart));
}

// Shopping Cart Functions
function addToCart(itemName, price) {
    const item = {
        name: itemName,
        price: parseFloat(price),
        id: Date.now(),
        gumroadLink: gumroadLinks[itemName]
    };
    
    cart.push(item);
    saveCart();
    updateCart();
    
    // Show feedback
    alert(`✅ "${itemName}" added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    
    if (!cartCount) return; // Exit if cart elements don't exist on page
    
    // Update cart count
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'none';
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<div class="cart-empty"><p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p><p>Your cart is empty</p></div>';
        }
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'block';
        
        // Build cart items HTML
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        });
        
        if (cartItemsContainer) cartItemsContainer.innerHTML = itemsHTML;
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (cart.length === 1) {
        // Single item - open directly
        window.open(cart[0].gumroadLink, '_blank');
        alert('🎉 You\'re being redirected to complete your purchase!\n\nAfter payment, you\'ll receive instant download access.');
    } else {
        // Multiple items - explain the process
        let message = `You have ${cart.length} items in your cart.\n\n`;
        message += 'Since you\'re purchasing multiple e-books, we\'ll open each checkout page.\n\n';
        message += 'Your items:\n';
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
        });
        message += '\nEach purchase gives instant download access!';
        
        if (confirm(message + '\n\nClick OK to proceed.')) {
            // Open each Gumroad link with a small delay
            cart.forEach((item, index) => {
                setTimeout(() => {
                    window.open(item.gumroadLink, '_blank');
                }, index * 1000);
            });
            
            // Clear cart after opening links
            setTimeout(() => {
                alert('✅ Checkout pages opened!\n\nComplete each purchase to get instant download access.\n\nYour cart has been cleared.');
                cart = [];
                saveCart();
                updateCart();
                toggleCart();
            }, cart.length * 1000 + 500);
        }
    }
}

// Buy Now (skip cart)
function buyNow(itemName) {
    const link = gumroadLinks[itemName];
    if (link && !link.includes('yourusername')) {
        window.open(link, '_blank');
    } else {
        alert('Product link not configured yet. Please update your Gumroad links in script.js');
    }
}

// Bundle purchase function
function buyBundle(bundleId) {
    const link = gumroadLinks[bundleId];
    if (link && !link.includes('yourusername')) {
        window.open(link, '_blank');
    } else {
        alert('⚙️ Bundle Setup Required\n\nTo create this bundle on Gumroad:\n\n1. Create a new product\n2. Upload a ZIP file containing all bundle PDFs\n3. Set the bundle price\n4. Get the link and update your code\n\nBundle ID: ' + bundleId);
    }
}

// Articles Filter
function filterArticles() {
    const searchTerm = document.getElementById('articleSearch').value.toLowerCase();
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();
        const category = article.dataset.category;
        
        const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || category === currentCategory;
        
        if (matchesSearch && matchesCategory) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    currentCategory = category;
    
    // Update button states
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter articles
    filterArticles();
}

// Resources Filter
function filterResources(type) {
    const resources = document.querySelectorAll('.resource-item');
    const buttons = document.querySelectorAll('#resources .category-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    resources.forEach(resource => {
        if (type === 'all' || resource.dataset.type === type) {
            resource.style.display = 'flex';
        } else {
            resource.style.display = 'none';
        }
    });
}

// Shop Filter
function filterShop(category) {
    const items = document.querySelectorAll('.shop-item');
    const buttons = document.querySelectorAll('#shop .category-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Hide form elements
    document.getElementById('newsletterEmail').style.display = 'none';
    const nextSibling = document.querySelector('#newsletterEmail').nextElementSibling;
    if (nextSibling) nextSibling.style.display = 'none';
    const nextNext = nextSibling ? nextSibling.nextElementSibling : null;
    if (nextNext) nextNext.style.display = 'none';
    
    // Show success message
    const successMsg = document.getElementById('newsletterSuccess');
    if (successMsg) successMsg.style.display = 'block';
    
    console.log('Newsletter signup:', email);
}

// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return; // Exit if countdown doesn't exist on page
    
    // Set the countdown end date (3 days from now)
    const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    
    // Update countdown every second
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // If countdown is over
        if (distance < 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.innerHTML = '<p style="font-size: 1.5rem; color: white;">Offer Ended - Check back for new deals!</p>';
            }
        }
    }, 1000);
}

// Social Media Share Functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out these amazing Bible study resources! 📖✨');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out these amazing Bible study resources! 📖✨ ');
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
}

function shareByEmail() {
    const subject = encodeURIComponent('Amazing Bible Study Resources');
    const body = encodeURIComponent('I found this wonderful Bible study website with great e-books and resources. Check it out!\n\n' + window.location.href);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            alert('✅ Link copied to clipboard!\n\nShare it with your friends and study groups!');
        }).catch(() => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('✅ Link copied to clipboard!\n\nShare it with your friends and study groups!');
    } catch (err) {
        alert('Please copy this link manually:\n\n' + url);
    }
    
    document.body.removeChild(textArea);
}

// Initialize on page load
window.addEventListener('load', function() {
    initCart();
    startCountdown();
});