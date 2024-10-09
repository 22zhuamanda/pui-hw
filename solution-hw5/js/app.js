// get roll type and current roll from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const currentRoll = rolls[rollType];


// get glazing selection, pack selection, and base price of roll
const glazingSelect = document.querySelector('#glazing');
const packSelect = document.querySelector('#pack');
// const basePrice = rolls[rollType].basePrice;

// populate the glazing dropdown using a for loop
function populateGlazingOptions() {
    // iterate through the glazingOptions array
    for (let i = 0; i < glazingOptions.length; i++) {
        let option = document.createElement('option');
        option.text = glazingOptions[i].glazingOption;
        option.value = glazingOptions[i].priceAdaptation;
        glazingSelect.add(option);
    }
  }
  
//  populate the pack size dropdown using a for loop
function populatePackOptions() {
    // iterate through the packSizeOptions array
    for (let i = 0; i < packSizeOptions.length; i++) {
        let option = document.createElement('option');
        option.text = packSizeOptions[i].packSizeOption;
        option.value = packSizeOptions[i].priceAdaptation;
        packSelect.add(option);
    }
}

// calculate and update the price
function updatePrice() {
    // get selected glazing option
    const glazingPrice = parseFloat(glazingSelect.value);

    // get selected pack size option
    const packPrice = parseFloat(packSelect.value);
  
    // calculate final price
    const finalPrice = (basePrice + glazingPrice) * packPrice;
  
    // update price in UI
    const priceElement = document.querySelector(".price p");
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
}

// // update title and image according to roll
// const rollTitleElement = document.querySelector('#roll-title');
// rollTitleElement.textContent = `${rollType} Cinnamon Roll`;

// const rollImageElement = document.querySelector('.product-detail-image');
// rollImageElement.src = `../assets/products/${currentRoll.imageFile}`;
// rollImageElement.alt = `${rollType} cinnamon roll`;

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

// add to cart function
function addToCart() {
    // https://stackoverflow.com/questions/5913/getting-the-text-from-a-drop-down-box
    // get selected glazing and pack size options
    const glazingOption = glazingSelect.options[glazingSelect.selectedIndex].text;
    const packSize = packSelect.options[packSelect.selectedIndex].text;

    // create an instance of the Roll class with the current selection
    const newRoll = new Roll(rollType, glazingOption, packSize, basePrice);

    // add the new roll to the cart array
    cart.push(newRoll);

    // print the entire cart to the console
    console.log(cart);
}

// // call add to cart function when add to cart button is clicked
// const addToCartButton = document.querySelector('.add-to-cart-button');
// addToCartButton.addEventListener('click', addToCart);

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



