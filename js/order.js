const orderTabs = document.querySelectorAll(".order-options a");
const priceTabs = document.querySelectorAll(".price-options a");
const rightArrow = document.querySelector(".order-options .right-arrow svg");
const leftArrow = document.querySelector(".order-options .left-arrow svg");
const orderTabsList = document.querySelector(".order-options ul");
const priceTabsList = document.querySelector(".price-options ul");
const rightArrowContainer = document.querySelector(".order-options .right-arrow");
const leftArrowContainer = document.querySelector(".order-options .left-arrow");
const menuItems = document.querySelectorAll(".card-menu-section p");

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

menuItems.forEach((item) => {
    item.addEventListener("click", item.style.color = "red")
});


const manageIcons = () => {
    let maxScrollValue = orderTabsList.scrollWidth - orderTabsList.clientWidth - 20;

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

const createCard = (name, priceRange, foodType, location, menu) => {
    const cardListItem = document.createElement('li');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    const cardInfoSection = document.createElement('div');
    cardInfoSection.classList.add('card-info-section');
    const cardMenuSection = document.createElement('div');
    cardMenuSection.classList.add('card-menu-section');
    cardMenuSection.classList.add('hide');
    cardMenuSection.setAttribute("id", "menu");

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

    addMenuItems(menu, cardMenuSection)

    card.appendChild(cardContent);
    cardInfoSection.appendChild(cardRestaurantName);
    cardInfoSection.appendChild(cardPriceRange);
    cardInfoSection.appendChild(cardFoodType);
    cardInfoSection.appendChild(cardLocation);
    cardContent.appendChild(cardInfoSection)
    card.appendChild(cardMenuSection);
    cardListItem.appendChild(card);
    cardList.appendChild(cardListItem);
}


/*
cardInfoSection
cardContent.appendChild(cardRestaurantName);
    cardContent.appendChild(cardPriceRange);
    cardContent.appendChild(cardFoodType);
    cardContent.appendChild(cardLocation);
    cardContent.appendChild(cardInfoSection)
    cardContent.appendChild(cardMenuSection);*/

const menuItemsList = document.createElement('ul');

const addMenuItems = (menu, cardMenuSection) => {
    const menuHeader = document.createElement('h4');
    let cardMenuItemName;
    let cardMenuItemPrice;

    menuHeader.textContent = "Menu:";
    cardMenuSection.appendChild(menuHeader);

    menu.forEach((item) => {
        let itemButton = document.createElement('button')
        let itemContainer = document.createElement('div');

        itemContainer.classList.add('item-container');
        cardMenuItemName = document.createElement('p');
        cardMenuItemPrice = document.createElement('p');
        cardMenuItemName.textContent = `${item.name}: `;
        cardMenuItemPrice.textContent = `${item.price}$`;
        itemButton.textContent = "add to order";
        cardMenuSection.appendChild(itemContainer)
        itemContainer.appendChild(cardMenuItemName);
        itemContainer.appendChild(cardMenuItemPrice);
        itemContainer.appendChild(itemButton);
    })

}

const createMenu = (event) => {   
    debugger;
    let cardMenu = event.target.parentNode.lastChild;
    console.log(cardMenu)
    if (event.target.id != "menu" && event.target.className != "item-container") {
        if (cardMenu.classList.contains("hide")) {
            cardMenu.classList.remove("hide");
        } else {
            cardMenu.classList.add("hide");
        }
    }
};

const generateCardsFromDB = (data) => {
    for (let i in data) {
        const currentRestaurant = data[i];
        createCard(currentRestaurant.name,
            currentRestaurant.price_range,
            currentRestaurant.food_type,
            currentRestaurant.location,
            currentRestaurant.menu) 
    }
}

 
const filterCardsFromDB = () => {
    debugger;
    let chosenFoodType = document.querySelector(".order-options ul .active");
    let chosenPriceRange = document.querySelector(".price-options ul .active");
    let cards = document.querySelectorAll(".card-container .card");
    
    cards.forEach((card) => {
        if (chosenFoodType.innerHTML == "All") {
            card.classList.remove("hide");
        } else {
            if (card.firstChild.firstChild.childNodes[2].innerHTML.includes(chosenFoodType.innerHTML)) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        }
    });
    
    cards = document.querySelectorAll(".card-container .card:not(.hide)");
    cards.forEach((card) => {

        if (chosenPriceRange.innerHTML == "All") {
            card.classList.remove("hide");
        } else {
            if (card.firstChild.firstChild.childNodes[1].innerHTML == chosenPriceRange.innerHTML) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        }
    });
};

const orderWindow = document.querySelector(".your-order ul");

const orderedItemsArray = [];

const hideAllOrderedItems = () => {
    orderWindow.childNodes.forEach((item) => {
        if (!item.classList.contains('checkout')) {
            item.classList.add('hide')
        }
    })
}

const showAllOrderedItems = () => {
    orderWindow.childNodes.forEach((item) => {
        console.log(orderWindow.childNodes)
        if (!item.classList.contains('checkout')) {
            item.classList.remove('hide')
        }
    })
}

const showOrder = () => {
    debugger;
    const window = document.querySelector(".your-order");
    const windowText = document.getElementById("order-window-text")
    const checkout = document.querySelector(".checkout")
    console.log(checkout)

    if (window.classList.contains("order-open")) {
        window.classList.remove("order-open")
        windowText.classList.remove("hide")
        checkout.classList.add('hide')
        hideAllOrderedItems()
    } else {
        window.classList.add("order-open")
        windowText.classList.add("hide")
        checkout.classList.remove('hide')
        showAllOrderedItems()
    }
}
const yourOrderWindow = document.getElementById("your-order");
yourOrderWindow.addEventListener("click", showOrder);

const addItemToOrder = (event) => {
    debugger;
    console.log("this:\n", (event.target.parentNode))
    orderedItemsArray.push(event.target.parentNode)
    console.log(orderedItemsArray)
    orderWindow.innerHTML = "";

    orderedItemsArray.forEach((item) => {
        const orderedListItem = document.createElement('li');
        orderedListItem.classList.add('hide')

        const card = document.createElement('div');
        card.classList.add('card');
        
        console.log("sure is an item:",item.childNodes[1])
        
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        const cardInfoSection = document.createElement('div');
        cardInfoSection.classList.add('card-info-section');
        const itemName = document.createElement('h3');
        itemName.textContent = item.childNodes[0].innerHTML;
        const itemPrice = document.createElement('p');
        itemPrice.textContent = item.childNodes[1].innerHTML;

          
        card.appendChild(cardContent);
        cardContent.appendChild(cardInfoSection)
        cardInfoSection.appendChild(itemName)
        cardInfoSection.appendChild(itemPrice)
        orderedListItem.appendChild(card)
        orderWindow.appendChild(orderedListItem)
    })
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

                    const cards = document.querySelectorAll(".card-content");
                    cards.forEach((card) => {
                        card.addEventListener("click", createMenu)
                    }); 
                    
                    const orderButtons = document.querySelectorAll(".item-container button");
                    orderButtons.forEach((button) => {
                        button.addEventListener("click", addItemToOrder)
                    });
                }
                )
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}

fetchJsonData();

window.addEventListener('mouseup',function(event){
    let yourOrder = document.getElementById('your-order');
    if (yourOrder.classList.contains('order-open')) {
        if(event.target != yourOrder && event.target.parentNode != yourOrder){
            showOrder()
        }
    }
});

