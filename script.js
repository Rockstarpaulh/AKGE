// --- Safe Storage Wrapper (Prevents iframe SecurityErrors) ---
const safeStorage = {
    get: function(key) {
        try { return localStorage.getItem(key); } 
        catch(e) { return null; }
    },
    set: function(key, value) {
        try { localStorage.setItem(key, value); } 
        catch(e) { console.warn("Storage restricted in this environment."); }
    }
};

// --- DOM Elements ---
let roleGate, viewB2C, viewB2B, viewCheckout;
let searchInputDesk, searchInputMob, b2cGrid, b2cCards, noMsg;
let cartToggleBtn, closeCartBtn, cartOverlay, cartSidebar, cartItemsContainer, emptyCartMsg, cartSubtotalEl, cartSubtotalNav, cartCountBadge, checkoutBtn;

// --- Filter Product Injection ---
const newFiltersList = [
    // HERO
    { id: 'LEB-001', brand: 'Hero', model: 'PLEASURE/MESTRO EDGE', rate: 99 },
    { id: 'LEB-002', brand: 'Hero', model: 'PASSION X-PRO', rate: 105 },
    { id: 'LEB-003', brand: 'Hero', model: 'KARIZMA', rate: 264 },
    { id: 'LEB-004', brand: 'Hero', model: 'HUNK/CBZ-EXTREME/AMBITION', rate: 110 },
    { id: 'LEB-007', brand: 'Hero', model: 'SUPER SPLENDOR/GLAMOUR', rate: 110 },
    { id: 'LEB-010', brand: 'Hero', model: 'DESTINY/MAESTRO EDGE BS-6', rate: 176 },
    { id: 'LEB-013', brand: 'Hero', model: 'X-PULSE', rate: 286 },
    // HONDA
    { id: 'LEB-051', brand: 'Honda', model: 'AVAITOR', rate: 176 },
    { id: 'LEB-052', brand: 'Honda', model: 'ACTIVA-125CC', rate: 193 },
    { id: 'LEB-054', brand: 'Honda', model: 'SHINE OLD MODEL', rate: 99 },
    { id: 'LEB-056', brand: 'Honda', model: 'UNICORN NEW/DAZZLER', rate: 105 },
    { id: 'LEB-065', brand: 'Honda', model: 'ACTIVA 6G', rate: 176 },
    { id: 'LEB-068', brand: 'Honda', model: 'GRAZIA BS-6 (WITH FOAM)', rate: 231 },
    { id: 'LEB-071', brand: 'Honda', model: 'SHINE 100 BS6', rate: 154 },
    // YAMAHA
    { id: 'LEB-101', brand: 'Yamaha', model: 'FZ', rate: 176 },
    { id: 'LEB-105', brand: 'Yamaha', model: 'R-15', rate: 168 },
    { id: 'LEB-109', brand: 'Yamaha', model: 'R-15 V3 BS-6', rate: 209 },
    { id: 'LEB-112', brand: 'Yamaha', model: 'AEROH', rate: 330 },
    // BAJAJ
    { id: 'LEB-151', brand: 'Bajaj', model: 'VIKRANT', rate: 154 },
    { id: 'LEB-152', brand: 'Bajaj', model: 'PULSAR 200NS', rate: 215 },
    { id: 'LEB-156', brand: 'Bajaj', model: 'PULSAR-N 160/P-150', rate: 198 },
    // SUZUKI
    { id: 'LEB-201', brand: 'Suzuki', model: 'ACCESS OLD', rate: 153 },
    { id: 'LEB-204', brand: 'Suzuki', model: 'GIXER', rate: 178 },
    { id: 'LEB-207', brand: 'Suzuki', model: 'INTRUDER', rate: 286 },
    // TVS
    { id: 'LEB-251', brand: 'TVS', model: 'STAR CITY 110 WITH CLAMP', rate: 194 },
    { id: 'LEB-253', brand: 'TVS', model: 'JUPITOR', rate: 161 },
    { id: 'LEB-259', brand: 'TVS', model: 'NTORQ', rate: 220 },
    { id: 'LEB-266', brand: 'TVS', model: 'JUPITER 125 BS-6/RIDER', rate: 220 },
    // ROYAL ENFIELD & KTM
    { id: 'LEB-301', brand: 'Royal Enfield', model: 'BULLET-500/THUNDER BIRD', rate: 187 },
    { id: 'LEB-302', brand: 'Royal Enfield', model: 'BULLET 350 BIG', rate: 193 },
    { id: 'LEB-451', brand: 'KTM', model: 'DUKE 250/390', rate: 231 },
    // OIL FILTERS
    { id: 'LEB-501', brand: 'Oil Filter', model: 'FZ', rate: 38 },
    { id: 'LEB-504', brand: 'Oil Filter', model: 'BULLET N/M', rate: 46 },
    { id: 'LEB-507', brand: 'Oil Filter', model: 'PULSAR-200 NS', rate: 55 },
    { id: 'LEB-513', brand: 'Oil Filter', model: 'ACTIVA 6G', rate: 77 },
    // FOAM FILTERS (INDIAN RATE)
    { id: 'LEB-551', brand: 'Hero', model: 'CD DAWN/CD-100SS / CD DLX (DOUBLE)', rate: 72, type: 'Foam Filter' },
    { id: 'LEB-552', brand: 'Hero', model: 'STREET', rate: 66, type: 'Foam Filter' },
    { id: 'LEB-553', brand: 'Hero', model: 'SPLENDOR (DOUBLE) / PASSION', rate: 92, type: 'Foam Filter' },
    { id: 'LEB-554', brand: 'Hero', model: 'CBZ/AMBITION', rate: 110, type: 'Foam Filter' },
    { id: 'LEB-601', brand: 'Bajaj', model: 'PULSAR O/M', rate: 84, type: 'Foam Filter' },
    { id: 'LEB-602', brand: 'Bajaj', model: 'PULSAR 220', rate: 88, type: 'Foam Filter' },
    { id: 'LEB-604', brand: 'Bajaj', model: 'PLATINA/WIND-125', rate: 77, type: 'Foam Filter' },
    { id: 'LEB-608', brand: 'Bajaj', model: 'KB-4S/BOXER/CALIBER/CT-100', rate: 92, type: 'Foam Filter' },
    { id: 'LEB-611', brand: 'Bajaj', model: 'DISCOVER-100', rate: 94, type: 'Foam Filter' },
    { id: 'LEB-614', brand: 'Bajaj', model: 'PLATINA BS-6', rate: 94, type: 'Foam Filter' },
    { id: 'LEB-651', brand: 'Honda', model: 'ETERNO (DOUBLE)', rate: 121, type: 'Foam Filter' },
    { id: 'LEB-652', brand: 'Honda', model: 'ACTIVA (SMALL)', rate: 22, type: 'Foam Filter' },
    { id: 'LEB-653', brand: 'Honda', model: 'ACTIVA (DOUBLE)', rate: 77, type: 'Foam Filter' },
    { id: 'LEB-701', brand: 'TVS', model: 'APACHE/FERIO / FREEDOM', rate: 105, type: 'Foam Filter' },
    { id: 'LEB-704', brand: 'TVS', model: 'SCOOTY E/S/OLD', rate: 69, type: 'Foam Filter' },
    { id: 'LEB-705', brand: 'TVS', model: 'WEGO', rate: 110, type: 'Foam Filter' },
    { id: 'LEB-706', brand: 'TVS', model: 'VICTOR', rate: 77, type: 'Foam Filter' },
    { id: 'LEB-710', brand: 'TVS', model: 'TVS KING', rate: 165, type: 'Foam Filter' },
    { id: 'LEB-751', brand: 'Yamaha', model: 'RX-100 (DOUBLE)', rate: 77, type: 'Foam Filter' },
    { id: 'LEB-752', brand: 'Yamaha', model: 'YBX (DOUBLE)/CRUX', rate: 88, type: 'Foam Filter' },
    { id: 'LEB-771', brand: 'Mahindra', model: 'RADIO/DURO/FLIGHT', rate: 85, type: 'Foam Filter' }
];

function injectFiltersToGrid() {
    const grid = document.getElementById('b2c-product-grid');
    if(!grid) return;

    newFiltersList.forEach(prod => {
        const sellingPrice = prod.rate;
        // Calculate MRP as 30% higher than the rate in the image
        const mrp = Math.ceil(sellingPrice * 1.30); 
        const productType = prod.type || 'Filter';
        const fullName = `${prod.brand} - ${prod.model} ${productType}`;
        
        // Smart Image Loading: Looks for LEB-001.jpg, falls back to placeholder if not found
        const imgSrc = `${prod.id.toLowerCase()}.png`;
        const fallbackUrl = `https://placehold.co/400x300/f8fafc/64748b?text=${prod.id}`;

        const card = document.createElement('div');
        card.className = 'b2c-product-card bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-xl product-card-hover flex flex-col justify-between';
        card.setAttribute('data-name', fullName);

        card.innerHTML = `
            <div>
                <div class="relative overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center h-48 border border-gray-100 shadow-inner">
                    <span class="absolute top-2 left-2 bg-b2c-dark text-white text-xs font-bold px-2 py-1 rounded z-20 shadow-sm">${prod.brand}</span>
                    <span class="absolute bottom-2 right-2 bg-gray-800/80 text-white text-[10px] font-bold px-2 py-1 rounded z-20">${prod.id}</span>
                    <i class="fa-solid fa-filter text-6xl text-gray-200 absolute z-0"></i>
                    <img src="${imgSrc}" onerror="this.onerror=null; this.src='${fallbackUrl}';" class="relative z-10 w-full h-full object-cover transition-transform duration-500">
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-2">${fullName}</h4>
                <p class="text-xs text-gray-500 mb-4 flex items-center gap-1">
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    <i class="fa-solid fa-star text-yellow-400"></i>
                    <span class="text-blue-600 hover:underline cursor-pointer">Verified Fit</span>
                </p>
            </div>
            <div class="mt-auto">
                <div class="mb-3 border-t border-gray-100 pt-3">
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-500 line-through">MRP: ₹${mrp.toFixed(2)}</span>
                        <span class="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-30%</span>
                    </div>
                    <div class="text-2xl font-black text-gray-900">₹${sellingPrice.toFixed(2)}</div>
                    <div class="text-xs text-green-600 font-bold mt-1">In Stock</div>
                </div>
                <div class="flex items-center gap-3 mb-3">
                    <label class="text-sm text-gray-600 font-medium">Qty:</label>
                    <div class="flex items-center border border-gray-300 rounded bg-gray-50 h-8">
                        <button class="px-3 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors h-full rounded-l" onclick="window.changeDisplayQty('${prod.id}', -1)">-</button>
                        <input type="text" id="qty-${prod.id}" value="1" class="w-8 text-center text-sm font-bold bg-transparent outline-none pointer-events-none" readonly>
                        <button class="px-3 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors h-full rounded-r" onclick="window.changeDisplayQty('${prod.id}', 1)">+</button>
                    </div>
                </div>
                <button class="w-full bg-b2c-accent hover:bg-b2c-hover text-white font-bold py-2.5 rounded-full transition-colors flex justify-center items-center gap-2"
                        onclick="window.addToCart('${prod.id}', '${fullName}', ${sellingPrice}, '${imgSrc}', document.getElementById('qty-${prod.id}').value)">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- App Initialization ---
function initApp() {
    // Get views
    roleGate = document.getElementById('role-gate');
    viewB2C = document.getElementById('view-b2c');
    viewB2B = document.getElementById('view-b2b');
    viewCheckout = document.getElementById('view-checkout');

    // Set up search
    searchInputDesk = document.getElementById('b2c-search-input');
    searchInputMob = document.getElementById('b2c-search-input-mobile');
    b2cGrid = document.getElementById('b2c-product-grid');
    b2cCards = document.querySelectorAll('.b2c-product-card');
    noMsg = document.getElementById('no-products-msg');

    if(searchInputDesk) searchInputDesk.addEventListener('input', handleSearch);
    if(searchInputMob) searchInputMob.addEventListener('input', handleSearch);

    // Setup cart elements
    cartToggleBtn = document.getElementById('cart-toggle-btn');
    closeCartBtn = document.getElementById('close-cart-btn');
    cartOverlay = document.getElementById('cart-overlay');
    cartSidebar = document.getElementById('cart-sidebar');
    cartItemsContainer = document.getElementById('cart-items-container');
    emptyCartMsg = document.getElementById('empty-cart-msg');
    cartSubtotalEl = document.getElementById('cart-subtotal');
    cartSubtotalNav = document.getElementById('cart-subtotal-nav');
    cartCountBadge = document.getElementById('cart-count-badge');
    checkoutBtn = document.getElementById('checkout-btn');

    if(cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if(checkoutBtn) checkoutBtn.addEventListener('click', showCheckout);

    // Inject the new filter products dynamically
    injectFiltersToGrid();
    
    // Re-select all cards (including injected ones) so the Search Bar works for them
    b2cCards = document.querySelectorAll('.b2c-product-card');

    // Mobile menu setup for B2B
    const b2bBtn = document.getElementById('b2b-mobile-menu-btn');
    const b2bMenu = document.getElementById('b2b-mobile-menu');
    
    if (b2bBtn && b2bMenu) {
        b2bBtn.addEventListener('click', () => {
            b2bMenu.classList.toggle('hidden');
        });
        b2bMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                b2bMenu.classList.add('hidden');
            });
        });
    }

    // Show role gate cleanly
    showGate();
}

// --- 1. Role Selection & Routing Logic ---
function showGate() {
    if(viewB2C) viewB2C.style.display = 'none';
    if(viewB2B) viewB2B.style.display = 'none';
    if(viewCheckout) viewCheckout.style.display = 'none';
    if(roleGate) {
        roleGate.style.display = 'flex';
        setTimeout(() => {
            roleGate.classList.remove('opacity-0', 'pointer-events-none');
        }, 10);
    }
}
window.showGate = showGate;

function selectRole(role) {
    safeStorage.set('akge_role', role);
    applyRole(role);
}
window.selectRole = selectRole;

function applyRole(role) {
    if(roleGate) roleGate.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        if(roleGate) roleGate.style.display = 'none';
        if(viewCheckout) viewCheckout.style.display = 'none';
        if (role === 'b2c') {
            if(viewB2B) viewB2B.style.display = 'none';
            if(viewB2C) viewB2C.style.display = 'flex';
            renderCart(); // Initialize cart data for B2C
        } else if (role === 'b2b') {
            if(viewB2C) viewB2C.style.display = 'none';
            if(viewB2B) viewB2B.style.display = 'block';
        }
        window.scrollTo(0,0);
    }, 500); 
}

// --- 2. B2C Search Logic ---
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    let visibleCount = 0;
    
    // Sync inputs
    if(e.target === searchInputDesk && searchInputMob) searchInputMob.value = term;
    if(e.target === searchInputMob && searchInputDesk) searchInputDesk.value = term;

    b2cCards.forEach(card => {
        const title = card.getAttribute('data-name').toLowerCase();
        if(title.includes(term)) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (visibleCount === 0) {
        if(noMsg) noMsg.style.display = 'block';
    } else {
        if(noMsg) noMsg.style.display = 'none';
    }
}

// --- 3. B2C Cart Logic ---
let cart = [];
try {
    const savedCart = safeStorage.get('akge_b2c_cart');
    if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) cart = parsed;
    }
} catch (e) {
    cart = [];
}

function openCart() {
    cartSidebar.classList.remove('cart-closed');
    cartSidebar.classList.add('cart-open');
    cartOverlay.classList.remove('overlay-closed');
    cartOverlay.classList.add('overlay-open');
}

function closeCart() {
    cartSidebar.classList.remove('cart-open');
    cartSidebar.classList.add('cart-closed');
    cartOverlay.classList.remove('overlay-open');
    cartOverlay.classList.add('overlay-closed');
}

function updateCart() {
    safeStorage.set('akge_b2c_cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    let subtotal = 0;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(cartCountBadge) cartCountBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        if(emptyCartMsg) emptyCartMsg.style.display = 'block';
        if(checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if(emptyCartMsg) emptyCartMsg.style.display = 'none';
        if(checkoutBtn) checkoutBtn.disabled = false;
    }

    if(cartItemsContainer) {
        // Clear existing elements EXCEPT the empty message
        Array.from(cartItemsContainer.children).forEach(child => {
            if (child.id !== 'empty-cart-msg') child.remove();
        });

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'flex gap-4 border-b border-gray-100 pb-4';
            
            let fallbackIcon = 'fa-box';
            if(item.id === 'p1') fallbackIcon = 'fa-motorcycle';
            if(item.id === 'p3') fallbackIcon = 'fa-filter';

            itemEl.innerHTML = `
                <div class="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                    <i class="fa-solid ${fallbackIcon} text-gray-300 absolute z-0 text-2xl"></i>
                    <img src="${item.img}" onerror="this.style.display='none'" class="relative z-10 w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h5 class="text-sm font-bold text-gray-900 leading-tight line-clamp-2">${item.name}</h5>
                    <div class="text-b2c-accent font-black text-sm mt-1">₹${item.price.toFixed(2)}</div>
                    
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center border border-gray-200 rounded">
                            <button class="px-2 py-0.5 text-gray-500 hover:bg-gray-100" onclick="updateQty(${index}, -1)">-</button>
                            <span class="px-2 text-xs font-bold w-6 text-center">${item.quantity}</span>
                            <button class="px-2 py-0.5 text-gray-500 hover:bg-gray-100" onclick="updateQty(${index}, 1)">+</button>
                        </div>
                        <button class="text-xs text-red-500 hover:underline font-semibold" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    const formattedSub = `₹${subtotal.toFixed(2)}`;
    if(cartSubtotalEl) cartSubtotalEl.textContent = formattedSub;
    if(cartSubtotalNav) cartSubtotalNav.textContent = formattedSub;
}

function addToCart(id, name, price, img, quantityStr) {
    const quantity = parseInt(quantityStr) || 1;
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, img, quantity });
    }

    updateCart();
    
    const toast = document.getElementById('toast-b2c');
    const toastMsg = document.getElementById('toast-message-b2c');
    if(toast && toastMsg) {
        toastMsg.textContent = `${quantity}x ${name} added to cart!`;
        toast.classList.remove('translate-y-20', 'opacity-0');
        
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }
}
window.addToCart = addToCart;

function updateQty(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}
window.updateQty = updateQty;

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
window.removeItem = removeItem;

function changeDisplayQty(id, change) {
    const input = document.getElementById(`qty-${id}`);
    if (input) {
        let val = parseInt(input.value) || 1;
        val += change;
        if (val < 1) val = 1; 
        input.value = val;
    }
}
window.changeDisplayQty = changeDisplayQty;

// --- 5. Checkout Logic ---
function showCheckout() {
    if(cart.length === 0) return;
    closeCart();
    if(viewB2C) viewB2C.style.display = 'none';
    if(viewCheckout) viewCheckout.style.display = 'flex';
    window.scrollTo(0, 0);
    renderCheckout();
}
window.showCheckout = showCheckout;

function returnToStore() {
    if(viewCheckout) viewCheckout.style.display = 'none';
    if(viewB2C) viewB2C.style.display = 'flex';
    window.scrollTo(0, 0);
    openCart();
}
window.returnToStore = returnToStore;

function renderCheckout() {
    const list = document.getElementById('checkout-items-list');
    if(!list) return;
    
    list.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemTotal = item.price * item.quantity;
        
        let fallbackIcon = 'fa-box';
        if(item.id.includes('LEB-00') || item.id === 'p1') fallbackIcon = 'fa-motorcycle';
        if(item.id.includes('LEB-5') || item.id.includes('LEB-6') || item.id.includes('LEB-7') || item.id === 'p3') fallbackIcon = 'fa-filter';

        list.innerHTML += `
            <div class="flex gap-3 items-center">
                <div class="w-12 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                    <i class="fa-solid ${fallbackIcon} text-gray-300 absolute z-0 text-xl"></i>
                    <img src="${item.id}.jpg" onerror="this.style.display='none'" class="relative z-10 w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h5 class="text-xs font-bold text-gray-900 leading-tight line-clamp-1">${item.name}</h5>
                    <div class="text-xs text-gray-500 mt-0.5">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
                </div>
                <div class="font-black text-sm text-gray-900">₹${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });

    const shipping = subtotal > 999 ? 0 : 99;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `₹${total.toFixed(2)}`;
}

function submitB2CForm(event) {
    event.preventDefault(); // Stop page reload
    if(cart.length === 0) return false;
    
    // Generate Cart Summary
    let orderSummary = "=== ITEMS ORDERED ===\n";
    let subtotal = 0;
    cart.forEach(item => {
        orderSummary += `${item.quantity}x ${item.name} (₹${item.price})\n`;
        subtotal += item.price * item.quantity;
    });
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;
    orderSummary += `\n=== TOTAL ===\n₹${total.toFixed(2)}`;

    // Combine Customer Details
    const name = document.getElementById('b2c-name').value;
    const phone = document.getElementById('b2c-phone').value;
    const address = document.getElementById('b2c-address').value;
    const customerDetails = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    
    // Get Selected Payment Method
    const paymentRadio = document.querySelector('input[name="payment"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : "Credit Card";

    // Stealth submission using fetch with no-cors mode
    const formData = new URLSearchParams();
    formData.append('entry.886157414', customerDetails);
    formData.append('entry.1806830379', orderSummary);
    formData.append('entry.650832789', paymentMethod);

    const url = "https://docs.google.com/forms/d/e/1FAIpQLScsGTPw_S6U4yc64CJtwiplu6DOpMYho3mdDHKXM5A1UXFkFg/formResponse";

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    }).then(() => {
        window.showOrderSuccessToast();
    }).catch(error => {
        console.error("Submission failed", error);
        window.showOrderSuccessToast(); // Show success anyway for UX
    });
    
    return false;
}
window.submitB2CForm = submitB2CForm;

function showOrderSuccessToast() {
    const toast = document.getElementById('toast-order');
    if(toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.remove('scale-95', 'opacity-0');
            toast.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
    
    cart = [];
    updateCart();
}
window.showOrderSuccessToast = showOrderSuccessToast;

function closeOrderSuccess() {
    const toast = document.getElementById('toast-order');
    if(toast) {
        toast.classList.remove('scale-100', 'opacity-100');
        toast.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
            if(viewCheckout) viewCheckout.style.display = 'none';
            if(viewB2C) viewB2C.style.display = 'flex';
            window.scrollTo(0, 0);
        }, 300);
    }
}
window.closeOrderSuccess = closeOrderSuccess;

// --- 6. B2B Form Logic ---
function submitB2BForm(event) {
    event.preventDefault(); // Stop page reload
    
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSdbpLWXiTD-7iVLAGdKuRh7tM5ETCVV6E9rdVWW7Wm8ptxSgA/formResponse";

    const name = document.getElementById('b2b-name').value;
    const company = document.getElementById('b2b-company').value;
    const email = document.getElementById('b2b-email').value; // Pure email string
    const phone = document.getElementById('b2b-phone').value;
    const country = document.getElementById('b2b-country').value;
    const interest = document.getElementById('b2b-interest').value;

    const formData = new URLSearchParams();
    formData.append('entry.1795036016', name);
    formData.append('entry.1094220549', company);
    formData.append('entry.1097576706', email); // Sends ONLY the email so Google accepts it
    formData.append('entry.1110226743', phone);
    formData.append('entry.239393814', country);
    formData.append('entry.2041805544', interest);

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    }).then(() => {
        window.showB2BToast();
    }).catch(error => {
        console.error("B2B Submission failed", error);
        window.showB2BToast(); 
    });
    
    return false;
}
window.submitB2BForm = submitB2BForm;

function showB2BToast() {
    const toast = document.getElementById('toast-b2b');
    if(toast) {
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }
    const form = document.getElementById('b2bForm');
    if(form) form.reset();
}
window.showB2BToast = showB2BToast;

// Launch app safely for sandbox iframes
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initApp, 1);
} else {
    document.addEventListener('DOMContentLoaded', initApp);
    window.addEventListener('load', initApp);
}
