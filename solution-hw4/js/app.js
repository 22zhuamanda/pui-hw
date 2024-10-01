// get roll type and current roll from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const currentRoll = rolls[rollType];

// price adaptations based on user selections
const glazingOptions = [
    {
        glazingOption: 'Keep original',
        priceAdaptation: 0,
    },
    {
        glazingOption: 'Sugar milk',
        priceAdaptation: 0,
    },
    {
        glazingOption: 'Vanilla milk',
        priceAdaptation: 0.5,
    },
    {
        glazingOption: 'Double chocolate',
        priceAdaptation: 1.5,
    },
];

const packSizeOptions = [
    {
        packSizeOption: 1,
        priceAdaptation: 1,
    },
    {
        packSizeOption: 3,
        priceAdaptation: 3,
    },
    {
        packSizeOption: 6,
        priceAdaptation: 5,
    },
    {
        packSizeOption: 12,
        priceAdaptation: 10,
    },
];

// get glazing selection, pack selection, and base price of roll
const glazingSelect = document.querySelector('#glazing');
const packSelect = document.querySelector('#pack');
const basePrice = rolls[rollType].basePrice;

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

// display on load
populateGlazingOptions();
populatePackOptions();
updatePrice();

// update title and image according to roll
const rollTitleElement = document.querySelector('#roll-title');
rollTitleElement.textContent = `${rollType} Cinnamon Roll`;

const rollImageElement = document.querySelector('.product-detail-image');
rollImageElement.src = `../assets/products/${currentRoll.imageFile}`;
rollImageElement.alt = `${rollType} cinnamon roll`;

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

// call add to cart function when add to cart button is clicked
const addToCartButton = document.querySelector('.add-to-cart-button');
addToCartButton.addEventListener('click', addToCart);
