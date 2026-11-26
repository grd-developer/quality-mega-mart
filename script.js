// Quality Mega Mart Core Logic

document.addEventListener('DOMContentLoaded', () => {
    // State
    let cart = storageService.getCart();
    let currentCategory = 'All';
    let searchQuery = '';

    // Elements
    const productGrid = document.getElementById('productGrid');
    const categoryFilters = document.getElementById('categoryFilters');
    const productSearch = document.getElementById('productSearch');
    const cartPill = document.getElementById('cartPill');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cartModal');
    const modalBody = document.getElementById('modalBody');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSummary = document.getElementById('cartSummary');
    const confirmOrderBtn = document.getElementById('confirmOrder');

    // Initialize
    init();

    function init() {
        renderCategoryFilters();
        showSkeletons();
        setTimeout(() => {
            renderProducts();
        }, 800); // Shimmer effect duration
        updateCartPill();
        loadCustomerDetails();
        setupEventListeners();
    }

    function setupEventListeners() {
        productSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                productModal.classList.add('hidden');
                cartModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        });

        cartPill.addEventListener('click', () => {
            openCartModal();
        });

        confirmOrderBtn.addEventListener('click', () => {
            handleConfirmOrder();
        });

        // Close on overlay click
        window.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (e.target === cartModal) {
                cartModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    function showSkeletons() {
        productGrid.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton skeleton-card';
            productGrid.appendChild(skeleton);
        }
    }

    function renderCategoryFilters() {
        categoryFilters.innerHTML = '';
        CONFIG.CATEGORIES.forEach(cat => {
            const pill = document.createElement('div');
            pill.className = `cat-pill ${cat === currentCategory ? 'active' : ''}`;
            pill.textContent = cat;
            pill.addEventListener('click', () => {
                currentCategory = cat;
                renderCategoryFilters();
                renderProducts();
            });
            categoryFilters.appendChild(pill);
        });
    }

    function renderProducts() {
        const filtered = menuData.filter(p => {
            const matchesCat = currentCategory === 'All' || p.category === currentCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery) ||
                                 p.description.toLowerCase().includes(searchQuery);
            return matchesCat && matchesSearch;
        });

        productGrid.innerHTML = '';

        if (filtered.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No products found matching your search.';
            noResults.style.gridColumn = '1 / -1';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '40px';
            noResults.style.color = '#6B7280';
            productGrid.appendChild(noResults);
            return;
        }

        filtered.forEach((product, index) => {
            const card = createProductCard(product);
            card.style.animationDelay = `${index * 0.05}s`;
            productGrid.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';

        img.onerror = () => {
            img.style.display = 'none';
            const fallback = createCategoryFallback(product.category);
            imgContainer.appendChild(fallback);
        };

        imgContainer.appendChild(img);

        const info = document.createElement('div');
        info.className = 'product-info';

        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `${CONFIG.CURRENCY} ${product.price}`;

        const addBtn = document.createElement('div');
        addBtn.className = 'add-btn-sm';
        addBtn.textContent = '+';

        info.appendChild(name);
        info.appendChild(price);

        card.appendChild(imgContainer);
        card.appendChild(info);
        card.appendChild(addBtn);

        card.addEventListener('click', () => {
            openProductModal(product);
        });

        return card;
    }

    function createCategoryFallback(category) {
        const fallback = document.createElement('div');
        fallback.className = 'cat-fallback';

        const icon = document.createElement('div');
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;

        const text = document.createElement('span');
        text.textContent = category;

        fallback.appendChild(icon);
        fallback.appendChild(text);
        return fallback;
    }

    function openProductModal(product) {
        modalBody.innerHTML = '';

        const layout = document.createElement('div');
        layout.className = 'product-detail-layout';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'detail-img-container';

        const img = document.createElement('img');
        img.className = 'detail-img';
        img.src = product.image;
        img.onerror = () => {
            img.style.display = 'none';
            imgContainer.appendChild(createCategoryFallback(product.category));
        };

        imgContainer.appendChild(img);

        const info = document.createElement('div');
        info.className = 'detail-info';

        const title = document.createElement('h2');
        title.textContent = product.name;

        const price = document.createElement('div');
        price.className = 'detail-price';
        price.textContent = `${CONFIG.CURRENCY} ${product.price}`;

        const desc = document.createElement('p');
        desc.className = 'detail-desc';
        desc.textContent = product.description;

        const noteLabel = document.createElement('label');
        noteLabel.textContent = 'Special Note (e.g. choice of flavor)';
        noteLabel.style.display = 'block';
        noteLabel.style.fontSize = '0.8rem';
        noteLabel.style.marginBottom = '4px';
        noteLabel.style.fontWeight = '600';

        const note = document.createElement('input');
        note.type = 'text';
        note.className = 'note-input';
        note.placeholder = 'Add a note...';
        note.id = 'productNote';

        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-order-btn';
        addBtn.textContent = 'Add to Order';
        addBtn.addEventListener('click', () => {
            addToCart(product, document.getElementById('productNote').value);
            productModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(desc);
        info.appendChild(noteLabel);
        info.appendChild(note);
        info.appendChild(addBtn);

        layout.appendChild(imgContainer);
        layout.appendChild(info);

        modalBody.appendChild(layout);

        productModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function addToCart(product, note) {
        const existing = cart.find(item => item.id === product.id && item.note === note);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                note: note || ''
            });
        }

        storageService.saveCart(cart);
        updateCartPill();

        // Trigger animation
        cartPill.style.animation = 'none';
        void cartPill.offsetWidth; // trigger reflow
        cartPill.style.animation = 'bounce 0.5s ease';
    }

    function updateCartPill() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (totalItems > 0) {
            cartPill.classList.remove('hidden');
            cartCount.textContent = totalItems;
            cartTotal.textContent = `${CONFIG.CURRENCY} ${totalPrice}`;
        } else {
            cartPill.classList.add('hidden');
        }
    }

    function openCartModal() {
        renderCartItems();
        updateCartSummary();
        cartModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function renderCartItems() {
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            cartModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            return;
        }

        cart.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'cart-item';

            const img = document.createElement('img');
            img.className = 'cart-item-img';
            img.src = item.image;
            img.onerror = () => {
                img.style.display = 'none';
                el.insertBefore(createCategoryFallback(item.category), details);
            };

            const details = document.createElement('div');
            details.className = 'cart-item-details';

            const name = document.createElement('div');
            name.className = 'cart-item-name';
            name.textContent = item.name + (item.note ? ` (${item.note})` : '');

            const price = document.createElement('div');
            price.className = 'cart-item-price';
            price.textContent = `${CONFIG.CURRENCY} ${item.price} x ${item.quantity} = ${CONFIG.CURRENCY} ${item.price * item.quantity}`;

            details.appendChild(name);
            details.appendChild(price);

            const controls = document.createElement('div');
            controls.className = 'cart-qty-controls';

            const minus = document.createElement('button');
            minus.className = 'qty-btn';
            minus.textContent = '-';
            minus.onclick = () => updateQty(index, -1);

            const val = document.createElement('span');
            val.className = 'qty-val';
            val.textContent = item.quantity;

            const plus = document.createElement('button');
            plus.className = 'qty-btn';
            plus.textContent = '+';
            plus.onclick = () => updateQty(index, 1);

            controls.appendChild(minus);
            controls.appendChild(val);
            controls.appendChild(plus);

            el.appendChild(img);
            el.appendChild(details);
            el.appendChild(controls);

            cartItemsList.appendChild(el);
        });
    }

    function updateQty(index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        storageService.saveCart(cart);
        updateCartPill();
        renderCartItems();
        updateCartSummary();
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal >= 2000 ? 0 : CONFIG.DELIVERY_FEE;
        const total = subtotal + deliveryFee;

        cartSummary.innerHTML = '';

        const createRow = (label, value, isTotal = false) => {
            const row = document.createElement('div');
            row.className = `summary-row ${isTotal ? 'total' : ''}`;

            const l = document.createElement('span');
            l.textContent = label;

            const v = document.createElement('span');
            v.textContent = `${CONFIG.CURRENCY} ${value}`;

            row.appendChild(l);
            row.appendChild(v);
            return row;
        };

        cartSummary.appendChild(createRow('Subtotal', subtotal));
        cartSummary.appendChild(createRow('Delivery Fee', deliveryFee));
        cartSummary.appendChild(createRow('Grand Total', total, true));
    }

    function loadCustomerDetails() {
        const details = storageService.getCustomerDetails();
        document.getElementById('fullName').value = details.fullName || '';
        document.getElementById('mobile').value = details.mobile || '';
        document.getElementById('address').value = details.address || '';

        if (details.paymentMethod) {
            const radio = document.querySelector(`input[name="payment"][value="${details.paymentMethod}"]`);
            if (radio) radio.checked = true;
        }
    }

    function handleConfirmOrder() {
        const fullName = document.getElementById('fullName').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const address = document.getElementById('address').value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const instructions = document.getElementById('instructions').value.trim();

        if (!fullName || !mobile || !address) {
            alert('Please fill in your name, mobile, and address.');
            return;
        }

        // Save details for next time
        storageService.saveCustomerDetails({ fullName, mobile, address, paymentMethod });

        // Generate WhatsApp Message
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal >= 2000 ? 0 : CONFIG.DELIVERY_FEE;
        const total = subtotal + deliveryFee;

        let message = `*Order from Quality Mega Mart*\n\n`;
        message += `*Items:*\n`;
        cart.forEach(item => {
            message += `- ${item.name} x${item.quantity} = ${CONFIG.CURRENCY}${item.price * item.quantity}${item.note ? ` (${item.note})` : ''}\n`;
        });

        message += `\n*Bill Summary:*\n`;
        message += `Subtotal: ${CONFIG.CURRENCY}${subtotal}\n`;
        message += `Delivery Fee: ${CONFIG.CURRENCY}${deliveryFee}\n`;
        message += `*Total: ${CONFIG.CURRENCY}${total}*\n\n`;

        message += `*Customer Details:*\n`;
        message += `Name: ${fullName}\n`;
        message += `Mobile: ${mobile}\n`;
        message += `Address: ${address}\n`;
        message += `Payment: ${paymentMethod}\n`;

        if (instructions) {
            message += `\n*Instructions:*\n${instructions}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Optional: Clear cart after ordering
        // cart = [];
        // storageService.clearCart();
        // updateCartPill();
        // cartModal.classList.add('hidden');
    }
});
