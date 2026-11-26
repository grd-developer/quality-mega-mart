const storageService = {
    getCart: function() {
        const cart = localStorage.getItem('qmm_cart');
        return cart ? JSON.parse(cart) : [];
    },
    saveCart: function(cart) {
        localStorage.setItem('qmm_cart', JSON.stringify(cart));
    },
    getCustomerDetails: function() {
        const details = localStorage.getItem('qmm_customer');
        return details ? JSON.parse(details) : {
            fullName: '',
            mobile: '',
            address: '',
            paymentMethod: 'Cash on Delivery'
        };
    },
    saveCustomerDetails: function(details) {
        localStorage.setItem('qmm_customer', JSON.stringify(details));
    },
    clearCart: function() {
        localStorage.removeItem('qmm_cart');
    }
};
