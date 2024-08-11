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
    let cardMenuItem;

    menuHeader.textContent = "Menu:";
    cardMenuSection.appendChild(menuHeader);

    menu.forEach((item) => {
        let itemButton = document.createElement('button')
        let itemContainer = document.createElement('div');

        itemContainer.classList.add('item-container');
        cardMenuItem = document.createElement('p');
        cardMenuItem.textContent = `${item.name}: ${item.price}$`;
        itemButton.textContent = "add to order";
        cardMenuSection.appendChild(itemContainer)
        itemContainer.appendChild(cardMenuItem);
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
    let chosenFoodType = document.querySelector(".order-options ul .active");
    let chosenPriceRange = document.querySelector(".price-options ul .active");
    let cards = document.querySelectorAll(".card");
    
    cards.forEach((card) => {
        card.lastChild.lastChild.classList.add("hide");

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
    
    cards = document.querySelectorAll(".card:not(.hide)");
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

let orderedItems = 0;

const orderedItemsArray = [];


const showOrder = (event) => {
    debugger;
    event.target.classList.toggle("order-open")
    
    console.log(orderWindow)
    orderedItemsArray.forEach(item => {
        let order = document.createElement('div')
        let orderedItem = document.createElement('p')
        let orderListItem = document.createElement('li')
        orderedItem.innerHTML = item
        order.classList.add('ordered-item')
        order.appendChild(orderedItem)
        orderListItem.appendChild(order)
        orderWindow.appendChild(orderListItem)
    });

    if (event.target.classList.contains("order-open")) {
        if (orderedItems == 0) {
            event.target.innerHTML = "you have'nt placed any orders yet"
        } else {
            // hide the grey text
            event.target.innerHTML 
        }
    } else {
        event.target.innerHTML = "See your order"
    }
}

const addItemToOrder = (event) => {
    debugger;
    orderedItems++;
    console.log("this:\n", typeof(event.target.parentNode.firstChild.innerHTML))
    orderedItemsArray.push(event.target.parentNode.firstChild.innerHTML
    );
}

const yourOrderWindow = document.getElementById("your-order");
yourOrderWindow.addEventListener("click", showOrder);

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

