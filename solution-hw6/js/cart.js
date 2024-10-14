// create empty cart array if none exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
    "Keep original": 0.00,
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

// populate the cart on page load
function loadCart() {
    for (const roll of cart) {
        updateRoll(roll);
    }
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
    let total = 0;
    for (const roll of cart) {
        const glazingPrice = glazingPrices[roll.glazing];
        const packMultiplier = packSizeMultipliers[roll.size];
        total += (roll.basePrice + glazingPrice) * packMultiplier;
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
        cart.splice(rollIndex, 1); // remove the roll from the cart array
    }

    // update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // recalculate cart total
    updateTotalPrice()

    // print the entire stored cart to the console
    console.log(localStorage.getItem('cart'));
}

// call loadCart on page load
window.addEventListener('DOMContentLoaded', loadCart);