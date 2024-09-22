// base price for a cinnamon roll is $ 2.49
const basePrice = 2.49;

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

// populate the glazing dropdown using a for loop
function populateGlazingOptions() {
    let glazingSelect = document.querySelector('#glazing');
  
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
    let packSelect = document.querySelector('#pack');

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
    const glazingSelect = document.querySelector('#glazing');
    const glazingPrice = parseFloat(glazingSelect.value);

    // get selected pack size option
    const packSelect = document.querySelector('#pack');
    const packPrice = parseFloat(packSelect.value);
  
    // calculate final price
    const finalPrice = (basePrice + glazingPrice) * packPrice;
  
    // update price in UI
    const priceElement = document.querySelector(".price p");
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
}
  
populateGlazingOptions();
populatePackOptions();