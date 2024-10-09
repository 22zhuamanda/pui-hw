// create empty cart array
let cart = [];

// Roll class definition
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// glazing price adjustment based on the selection
const glazingPrices = {
    "Original": 0.00,
    "Sugar Milk": 0.00,
    "Vanilla Milk": 0.50,
    "Double Chocolate": 1.50
};

// pack size multipliers based on the selected size
const packSizeMultipliers = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};

// add roll to cart
function addRoll(rollType, rollGlazing, packSize, rollPrice) {
    const newRoll = new Roll(rollType, rollGlazing, packSize, rollPrice);
    cart.push(newRoll);
    return newRoll;
}

// add the four rolls
const originalRoll = addRoll("Original", "Sugar Milk", 1, 2.49);
const walnutRoll = addRoll("Walnut", "Vanilla Milk", 12, 3.49);
const raisinRoll = addRoll("Raisin", "Sugar Milk", 3, 2.99); 
const appleRoll = addRoll("Apple", "Original", 3, 3.49);

// iterate through each roll in cart
for (const newRoll of cart) {
    updateRoll(newRoll);
}

// update DOM with roll
function updateRoll(newRoll) {
    const cartItemTemplate = document.querySelector('#cart-item-template');
    const cartItem = cartItemTemplate.content.cloneNode(true);

    cartItem.querySelector(".cart-image").src = `../assets/products/${rolls[newRoll.type].imageFile}`;
    cartItem.querySelector(".cart-image").alt = `${newRoll.type} cinnamon roll`;
    cartItem.querySelector(".roll-name").innerText = `${newRoll.type} Cinnamon Roll`;
    cartItem.querySelector(".roll-glazing").innerText = `Glazing: ${newRoll.glazing}`;
    cartItem.querySelector(".roll-pack-size").innerText = `Pack Size: ${newRoll.size}`;

    // get glazing and pack size prices from the respective mappings
    const glazingPrice = glazingPrices[newRoll.glazing];
    const packPrice = packSizeMultipliers[newRoll.size];

    // calculate  final price for this item
    const itemFinalPrice = (newRoll.basePrice + glazingPrice) * packPrice;

    // set the price in the UI
    cartItem.querySelector('.roll-price').innerText = `$${itemFinalPrice.toFixed(2)}`;

     // add event listener for  remove button
    const removeButton = newRoll.element = cartItem.querySelector('.cart-product').querySelector('.remove-from-cart');
    
    removeButton.addEventListener('click', () => {
        deleteRoll(newRoll);
    });

    // get the divider element
    const divider = document.querySelector(".divider");

    // append  new item before the divider
    divider.parentNode.insertBefore(cartItem, divider);

    // update total cart price
    updateTotalPrice();
}

// calculate total price of cart
function cartTotal() {
    total = 0;

    for (let i = 0; i < cart.length; i++){
        const glazingPrice = glazingPrices[cart[i].glazing];
        const packPrice = packSizeMultipliers[cart[i].size];
        total += (cart[i].basePrice + glazingPrice) * packPrice;;
    }

    return total;
}

// update total price of cart in UI
function updateTotalPrice() {
    document.querySelector(".total p:nth-of-type(2)").innerText = `$${cartTotal().toFixed(2)}`;
}

// delete roll from cart
function deleteRoll(roll) {
    // find the cart product element that contains this roll
    const cartProductElement = roll.element.closest('.cart-product');
    
    // remove the entire cart product element
    cartProductElement.remove();
    
    // find the index of the roll in the cart array and remove it
    const rollIndex = cart.indexOf(roll);
    if (rollIndex > -1) {
        cart.splice(rollIndex, 1); // femove the roll from the cart array
    }

    // recalculate cart total
    cartTotal()
    updateTotalPrice()
}



