const orderTabs = document.querySelectorAll(".order-options a");
const priceTabs = document.querySelectorAll(".price-options a");
const rightArrow = document.querySelector(".order-options .right-arrow svg");
const leftArrow = document.querySelector(".order-options .left-arrow svg");
const orderTabsList = document.querySelector(".order-options ul");
const priceTabsList = document.querySelector(".price-options ul");
const rightArrowContainer = document.querySelector(".order-options .right-arrow");
const leftArrowContainer = document.querySelector(".order-options .left-arrow");

const responsiveNavBar = () => {
    var x = document.getElementById("top-nav");
    if (x.className === "header-container") {
      x.className += " responsive";
    } else {
      x.className = "header-container";
    }
  }

document.getElementById("icon").addEventListener("click", responsiveNavBar);

const removeAllActiveClasses = (tabs) => {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
};

orderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        removeAllActiveClasses(orderTabs);
        tab.classList.add("active");
        filterCardsFromDB();
    });
});

priceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        removeAllActiveClasses(priceTabs);
        tab.classList.add("active");
        filterCardsFromDB();
    });
});

const manageIcons = () => {
    let maxScrollValue = orderTabsList.scrollWidth - orderTabsList.clientWidth -20;

    if (orderTabsList.scrollLeft >= 20) {
        leftArrowContainer.classList.add("active");
    } else {
        leftArrowContainer.classList.remove("active");
    }

    if(orderTabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
    } else { 
        rightArrowContainer.classList.add("active");
    }
};

rightArrow.addEventListener("click", () => {
    orderTabsList.scrollLeft += 200;
    manageIcons();
});

leftArrow.addEventListener("click", () => {
    orderTabsList.scrollLeft -= 200;
    manageIcons();
});

orderTabsList.addEventListener("scroll", manageIcons)

const cardList = document.getElementById("card-list");

const createCard = (name, priceRange, foodType, location) => {
    const cardListItem = document.createElement('li');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const cardRestaurantName = document.createElement('h3');
    cardRestaurantName.classList.add('card-restaurant-name');
    cardRestaurantName.textContent = name;

    const cardPriceRange = document.createElement('p');
    cardPriceRange.classList.add('card-price-range');
    cardPriceRange.textContent = priceRange;

    const cardFoodType = document.createElement('p');
    cardFoodType.classList.add('card-food-type');
    cardFoodType.textContent = foodType;

    const cardLocation = document.createElement('p');
    cardLocation.classList.add('card-location');
    cardLocation.textContent = location;

    card.appendChild(cardContent);
    cardContent.appendChild(cardRestaurantName);
    cardContent.appendChild(cardPriceRange);
    cardContent.appendChild(cardFoodType);
    cardContent.appendChild(cardLocation);
    cardListItem.appendChild(card);
    cardList.appendChild(cardListItem);
}

const generateCardsFromDB = (data) => {
    for (let i in data) {
        const currentRestaurant = data[i];
        createCard(currentRestaurant.name,
            currentRestaurant.price_range,
            currentRestaurant.food_type,
            currentRestaurant.location)
    }
}

const filterCardsFromDB = () => {
    let chosenFoodType = document.querySelector(".order-options ul .active");
    let chosenPriceRange = document.querySelector(".price-options ul .active");
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        
        if (chosenFoodType.innerHTML == "All") {
            card.classList.remove("hide");
        } else {
            if (card.firstChild.childNodes[2].innerHTML.includes(chosenFoodType.innerHTML)) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        }
    });
debugger;
    cards = document.querySelectorAll(".card:not(.hide)");
    cards.forEach((card) => {

        if (chosenPriceRange.innerHTML == "All") {
            card.classList.remove("hide");
        } else {
            if (card.firstChild.childNodes[1].innerHTML == chosenPriceRange.innerHTML) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        }
    });
}

const fetchJsonData = () => {
    fetch("../DB/restuarants.json")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    generateCardsFromDB(data.restaurants);
                }
                )
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}

fetchJsonData();
