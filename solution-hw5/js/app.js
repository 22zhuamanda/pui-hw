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

const glazingPrices = {
    "Original": 0.00,
    "Sugar Milk": 0.00,
    "Vanilla Milk": 0.50,
    "Double Chocolate": 1.50
};

// Pack size multipliers based on the selected size
const packSizeMultipliers = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};

function addRoll(rollType, rollGlazing, packSize, rollPrice) {
    const newRoll = new Roll(rollType, rollGlazing, packSize, rollPrice);
    cart.push(newRoll);
    return newRoll;
}

const originalRoll = addRoll("Original", "Sugar Milk", 1, 2.49);
const walnutRoll = addRoll("Walnut", "Vanilla Milk", 12, 3.49);
const raisinRoll = addRoll("Raisin", "Sugar Milk", 3, 2.99); 
const appleRoll = addRoll("Apple", "Original", 3, 3.49);

console.log(cart)

for (const newRoll of cart) {
    updateRoll(newRoll);
}

function updateRoll(newRoll) {
    const cartItemTemplate = document.querySelector('#cart-item-template');
    const cartItem = cartItemTemplate.content.cloneNode(true);

    cartItem.querySelector(".cart-image").src = `../assets/products/${rolls[newRoll.type].imageFile}`;
    cartItem.querySelector(".cart-image").alt = `${newRoll.type} cinnamon roll`;
    cartItem.querySelector(".roll-name").innerText = `${newRoll.type} Cinnamon Roll`;
    cartItem.querySelector(".roll-glazing").innerText = `Glazing: ${newRoll.glazing}`;
    cartItem.querySelector(".roll-pack-size").innerText = `Pack Size: ${newRoll.size}`;

     // Get glazing and pack size prices from the respective mappings
     const glazingPrice = glazingPrices[newRoll.glazing]; // Get the glazing price adjustment
     const packPrice = packSizeMultipliers[newRoll.size]; // Get the pack size price multiplier

     // Calculate the final price for this item (basePrice + glazingPrice) * packPrice
     const itemFinalPrice = (newRoll.basePrice + glazingPrice) * packPrice;

     // Set the price in the UI
     cartItem.querySelector('.roll-price').innerText = `$${itemFinalPrice.toFixed(2)}`;

     // Add event listener for the remove button
    const removeButton = newRoll.element = cartItem.querySelector('.cart-product').querySelector('.remove-from-cart');
    
    removeButton.addEventListener('click', () => {
        deleteRoll(newRoll);
    });

     // Get the divider element
    const divider = document.querySelector(".divider");

    // Append the new item before the divider
    divider.parentNode.insertBefore(cartItem, divider);

     updateTotalPrice();

}

function cartTotal() {
    total = 0;

    for (let i = 0; i < cart.length; i++){
        // Get glazing and pack size prices from the respective mappings
        const glazingPrice = glazingPrices[cart[i].glazing]; // Get the glazing price adjustment
        const packPrice = packSizeMultipliers[cart[i].size]; // Get the pack size price multiplier
        total += (cart[i].basePrice + glazingPrice) * packPrice;;
    }

    return total;
}

function updateTotalPrice() {
    document.querySelector(".total p:nth-of-type(2)").innerText = `$${cartTotal().toFixed(2)}`;
}

function deleteRoll(roll) {
    // find the cart product element that contains this roll
    const cartProductElement = roll.element.closest('.cart-product');
    
    // Remove the entire cart product element
    cartProductElement.remove();
    
    // Find the index of the roll in the cart array and remove it
    const rollIndex = cart.indexOf(roll);
    if (rollIndex > -1) {
        cart.splice(rollIndex, 1); // Remove the roll from the cart array
    }


    cartTotal()
    updateTotalPrice()
}



