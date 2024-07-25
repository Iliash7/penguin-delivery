const orderTabs = document.querySelectorAll(".order-options a");
const priceTabs = document.querySelectorAll(".price-options a");
const rightArrow = document.querySelector(".order-options .right-arrow svg");
const leftArrow = document.querySelector(".order-options .left-arrow svg");
const orderTabsList = document.querySelector(".order-options ul");
const priceTabsList = document.querySelector(".price-options ul");
const rightArrowContainer = document.querySelector(".order-options .right-arrow");
const leftArrowContainer = document.querySelector(".order-options .left-arrow");

const removeAllActiveClasses = (tabs) => {
    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });
};

orderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        removeAllActiveClasses(orderTabs);
        tab.classList.add("active");
    });
});

priceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        removeAllActiveClasses(priceTabs);
        tab.classList.add("active");
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

async function fetchData() {
    try{
        
    } catch(error) {
        console.error(error);
    }
}