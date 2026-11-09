// All static data for the app. Pages only read from here.

export const CATEGORIES = ['Burgers', 'Mains', 'Sandwiches', 'Sides', 'Drinks', 'Desserts']

// Category -> picture used as a fallback
export const CATEGORY_IMAGE = {
  Burgers: '/images/categories/burgers.png',
  Mains: '/images/categories/mains.png',
  Sandwiches: '/images/categories/sandwiches.png',
  Sides: '/images/categories/sides.png',
  Drinks: '/images/categories/drinks.png',
  Desserts: '/images/categories/desserts.png',
}

// Optional add-ons shown on the item page, per category
export const EXTRAS = {
  Burgers: [
    { name: 'Extra cheese', price: 80 },
    { name: 'Extra patty', price: 250 },
    { name: 'Make it a combo', price: 300 },
  ],
  Mains: [
    { name: 'Extra naan', price: 60 },
    { name: 'Raita', price: 70 },
  ],
  Sandwiches: [
    { name: 'Extra cheese', price: 80 },
    { name: 'Side of fries', price: 200 },
  ],
  Sides: [{ name: 'Masala dip', price: 50 }],
  Drinks: [{ name: 'Extra ice', price: 0 }],
  Desserts: [{ name: 'Ice cream scoop', price: 120 }],
}

export const ORDER_STATUSES = ['Received', 'Preparing', 'Ready', 'Completed']

export const DELIVERY_FEE = 150
export const TAX_RATE = 0.05

// Helper that keeps the menu list below easy to read
const item = (id, name, category, price, description, ingredients, flags, img, popular = false) => ({
  id,
  name,
  category,
  price,
  description,
  ingredients,
  veg: flags.includes('veg'),
  spicy: flags.includes('spicy'),
  popular,
  available: true,
  img: `/images/menu/${img}.png`,
})

export const MENU = [
  item(1, 'Cottage burger', 'Burgers', 850, 'Double beef patty, melted cheddar, pickles and house sauce.',
    ['Beef patty', 'Cheddar', 'Pickles', 'House sauce', 'Brioche bun'], [], 'cottage-burger', true),
  item(2, 'Zinger burger', 'Burgers', 780, 'Crunchy spiced chicken, slaw and garlic mayo.',
    ['Fried chicken', 'Slaw', 'Garlic mayo', 'Brioche bun'], ['spicy'], 'zinger-burger'),
  item(3, 'Veggie smash', 'Burgers', 690, 'Potato and pea patty with tomato and mint chutney.',
    ['Potato patty', 'Tomato', 'Lettuce', 'Mint chutney', 'Brioche bun'], ['veg'], 'veggie-smash'),
  item(4, 'Chicken karahi bowl', 'Mains', 990, 'Slow-cooked karahi over rice with coriander and ginger.',
    ['Chicken', 'Tomato', 'Ginger', 'Green chili', 'Basmati rice'], ['spicy'], 'chicken-karahi-bowl', true),
  item(5, 'Daal chawal', 'Mains', 620, 'Tarka daal over steamed rice with fried onions.',
    ['Yellow daal', 'Basmati rice', 'Cumin', 'Fried onion'], ['veg'], 'daal-chawal'),
  item(6, 'Grilled chicken sandwich', 'Sandwiches', 650, 'Chicken, cheese and roasted peppers on thick bread.',
    ['Chicken', 'Cheese', 'Roasted peppers', 'Sourdough'], [], 'grilled-chicken-sandwich', true),
  item(7, 'Club sandwich', 'Sandwiches', 720, 'Three layers of chicken, egg, lettuce and tomato.',
    ['Chicken', 'Egg', 'Lettuce', 'Tomato', 'Toast'], [], 'club-sandwich'),
  item(8, 'Crispy fries', 'Sides', 350, 'Salted, twice-fried, with masala dip.',
    ['Potato', 'Sea salt', 'Masala'], ['veg'], 'crispy-fries', true),
  item(9, 'Garlic bread', 'Sides', 400, 'Toasted with garlic butter and herbs.',
    ['Bread', 'Garlic', 'Butter', 'Parsley'], ['veg'], 'garlic-bread'),
  item(10, 'Sweet lassi', 'Drinks', 300, 'Thick, cold and made fresh every day.',
    ['Yogurt', 'Sugar', 'Cardamom'], ['veg'], 'sweet-lassi', true),
  item(11, 'Mint lemonade', 'Drinks', 280, 'Fresh lemon and mint, lightly sweet.',
    ['Lemon', 'Mint', 'Sugar', 'Soda'], ['veg'], 'mint-lemonade'),
  item(12, 'Kheer cup', 'Desserts', 380, 'Slow-simmered rice pudding with pistachio.',
    ['Milk', 'Rice', 'Cardamom', 'Pistachio'], ['veg'], 'kheer-cup'),
  item(13, 'Chocolate brownie', 'Desserts', 450, 'Warm brownie with a fudge centre.',
    ['Chocolate', 'Butter', 'Flour', 'Walnut'], ['veg'], 'chocolate-brownie', true),
]

// ---------- sample data (replaced by a real backend later) ----------

export const INITIAL_ORDERS = [
  { id: 'FC-1044', customer: 'Sara M.', items: [{ id: 6, name: 'Grilled chicken sandwich', qty: 2 }],
    subtotal: 1300, fee: 150, tax: 65, total: 1515, status: 'Received', type: 'Delivery', payment: 'Cash', date: 'Today' },
  { id: 'FC-1043', customer: 'Hamza R.', items: [{ id: 4, name: 'Chicken karahi bowl', qty: 1 }, { id: 8, name: 'Crispy fries', qty: 1 }],
    subtotal: 1340, fee: 0, tax: 67, total: 1407, status: 'Preparing', type: 'Pickup', payment: 'Card', date: 'Today' },
  { id: 'FC-1042', mine: true, customer: 'Sample customer', items: [{ id: 1, name: 'Cottage burger', qty: 2 }, { id: 10, name: 'Sweet lassi', qty: 2 }],
    subtotal: 2300, fee: 150, tax: 115, total: 2565, status: 'Completed', type: 'Delivery', payment: 'Cash', date: '5 Nov' },
  { id: 'FC-1041', mine: true, customer: 'Sample customer', items: [{ id: 4, name: 'Chicken karahi bowl', qty: 1 }],
    subtotal: 990, fee: 0, tax: 50, total: 1040, status: 'Completed', type: 'Pickup', payment: 'Card', date: '2 Nov' },
]

export const INITIAL_RESERVATIONS = [
  { ref: 'TB-101', mine: true, customer: 'Sample customer', date: '2026-11-12', time: '8:00 pm', guests: 4, status: 'Confirmed' },
  { ref: 'TB-102', customer: 'Omar S.', date: '2026-11-08', time: '9:00 pm', guests: 2, status: 'Confirmed' },
]

export const INITIAL_USER = {
  name: 'Sample customer',
  phone: '+92 000 0000000',
  email: 'customer@example.com',
  address: 'House 1, Street 2, Your city',
}
