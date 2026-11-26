const menuData = [
    {
        id: 1,
        name: "National Salt",
        category: "Daily Essentials",
        price: 60,
        description: "High-quality refined iodized salt for your daily cooking needs.",
        image: "https://www.catchnpack.pk/wp-content/uploads/2023/02/Refined-Salt-2.jpg"
    },
    {
        id: 2,
        name: "Chakki Fresh Atta",
        category: "Daily Essentials",
        price: 850,
        description: "Whole wheat flour freshly ground for soft and healthy rotis.",
        image: "https://4.imimg.com/data4/WD/QJ/MY-35150943/chakki-fresh-atta-500x500.jpg"
    },
    {
        id: 3,
        name: "Super Kernel Basmati Rice",
        category: "Daily Essentials",
        price: 350,
        description: "Premium long-grain basmati rice with exquisite aroma and taste.",
        image: "https://tse2.mm.bing.net/th/id/OIP.mPcopl-7f6yBsZUAGnMw8wAAAA?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 4,
        name: "White Sugar",
        category: "Daily Essentials",
        price: 150,
        description: "Pure white crystalline sugar for all your sweetening needs.",
        image: "https://tse2.mm.bing.net/th/id/OIP.4VvIukNSughyqlJDewf6twHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 5,
        name: "Habib Cooking Oil",
        category: "Daily Essentials",
        price: 520,
        description: "Premium quality cooking oil for healthy and tasty meals.",
        image: "https://tse3.mm.bing.net/th/id/OIP.M1VvTKwxa0XODwNupr562wHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 6,
        name: "Shan Desi Ghee",
        category: "Daily Essentials",
        price: 1200,
        description: "Traditional pure desi ghee for authentic flavor and health.",
        image: "https://tse4.mm.bing.net/th/id/OIP.1XOa-ECn_nCWc6XvYqMh_wHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 7,
        name: "Slanty Chips",
        category: "Snacks & Biscuits",
        price: 50,
        description: "Crispy and savory potato chips in your favorite flavors.",
        image: "https://tse3.mm.bing.net/th/id/OIP.VkMafgC8GDlwzyMVv_nipwHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 8,
        name: "Peek Freans Glucose Biscuits",
        category: "Snacks & Biscuits",
        price: 40,
        description: "Energy-packed glucose biscuits for a quick snack.",
        image: "https://tse1.mm.bing.net/th/id/OIP.RqO50_Pu-Aow7YxYOZUy-wHaC5?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 9,
        name: "Nimco Mix",
        category: "Snacks & Biscuits",
        price: 80,
        description: "Traditional spicy and savory snack mix.",
        image: "https://tse3.mm.bing.net/th/id/OIP.YdvoAyNxo8fW6ixIvtZjJAHaKo?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 10,
        name: "Kurkure Masala Munch",
        category: "Snacks & Biscuits",
        price: 60,
        description: "Crunchy corn snacks with a spicy masala twist.",
        image: "https://tse4.mm.bing.net/th/id/OIP.eTT3w24Pb9S-JKIIw85AewHaKE?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 11,
        name: "Tapal Danedar Tea",
        category: "Daily Essentials",
        price: 250,
        description: "Strong and aromatic tea for the perfect cup every time.",
        image: "https://tse2.mm.bing.net/th/id/OIP.ymQyyXN5heu23_grF66DQwHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 12,
        name: "Coca-Cola",
        category: "Beverages",
        price: 180,
        description: "Refreshing 1.5L bottle of classic Coca-Cola.",
        image: "https://tse4.mm.bing.net/th/id/OIP.V3-ovACkrfEzTHmc8CVvRwHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 13,
        name: "Pepsi (1.5L)",
        category: "Beverages",
        price: 180,
        description: "Classic refreshing cola drink in a 1.5L bottle.",
        image: "https://tse2.mm.bing.net/th/id/OIP.twWu9mtdnPmclTvNGIMEegHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 14,
        name: "Rooh Afza Syrup (800ml)",
        category: "Beverages",
        price: 350,
        description: "Traditional refreshing herbal syrup for summer drinks.",
        image: "https://tse2.mm.bing.net/th/id/OIP.m-Bqqsm0jHRKvKV8AKucZgHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 15,
        name: "Nestle Pure Life Water (1.5L)",
        category: "Beverages",
        price: 90,
        description: "Clean and safe drinking water in a 1.5L bottle.",
        image: "https://tse2.mm.bing.net/th/id/OIP.2WwjOAAkBRlG0W2Jsf5akAHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 16,
        name: "Surf Excel Detergent (1kg)",
        category: "Household",
        price: 550,
        description: "Powerful detergent for clean and bright clothes.",
        image: "https://tse1.mm.bing.net/th/id/OIP.aVU9fzpF8jefZGE7_mmZ7gHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 17,
        name: "Vim Dishwash Liquid (500ml)",
        category: "Household",
        price: 280,
        description: "Effective dishwashing liquid for grease-free utensils.",
        image: "https://tse1.mm.bing.net/th/id/OIP.MZpMbKnpLaB8_idvty1YNgHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 18,
        name: "Harpic Toilet Cleaner (500ml)",
        category: "Household",
        price: 320,
        description: "Specialized cleaner for a hygienic and sparkling toilet.",
        image: "https://tse2.mm.bing.net/th/id/OIP.wbYEV1LlD4z6qYKalJMi2QHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 19,
        name: "Glass Cleaner Spray (500ml)",
        category: "Household",
        price: 240,
        description: "Effective spray for crystal clear glass surfaces.",
        image: "https://tse1.mm.bing.net/th/id/OIP.mPuPwABx1VX8LUpAodLvuwHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 20,
        name: "Safeguard Soap (4 Pack)",
        category: "Personal Care",
        price: 450,
        description: "Antibacterial soap for complete family protection.",
        image: "https://tse1.mm.bing.net/th/id/OIP.pXR_FFXtRbm4XVsWSxnaNQHaEU?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 21,
        name: "Colgate Toothpaste (150g)",
        category: "Personal Care",
        price: 220,
        description: "Trusted toothpaste for strong teeth and fresh breath.",
        image: "https://tse3.mm.bing.net/th/id/OIP.VvGN9czs6xJC2bqSPBg6wgHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 22,
        name: "Pantene Shampoo (340ml)",
        category: "Personal Care",
        price: 480,
        description: "Nourishing shampoo for smooth and healthy hair.",
        image: "https://tse3.mm.bing.net/th/id/OIP.u9-d2w7lma3-KQhrAS8uUAHaHa?r=0&pid=Api&h=220&P=0"
    },
    {
        id: 23,
        name: "Dove Body Wash (250ml)",
        category: "Personal Care",
        price: 650,
        description: "Moisturizing body wash for soft and radiant skin.",
        image: "https://tse4.mm.bing.net/th/id/OIP.BwmtOTblnKUafqtSjx_OzAHaHa?r=0&pid=Api&h=220&P=0"
    }
];
