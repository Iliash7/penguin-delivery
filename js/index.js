const responsiveNavBar = () => {
    var x = document.getElementById("top-nav");
    if (x.className === "header-container") {
      x.className += " responsive";
    } else {
      x.className = "header-container";
    }
  }

document.getElementById("icon").addEventListener("click", responsiveNavBar);