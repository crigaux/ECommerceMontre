// Récupère le nom d'un produit et crée une carte en injectant du html dans l'index.html
// Les données qui doivent apparaître dans une carte sont : "image", "title", "desc", "price"
// Trier les produits en fonction de leur "type" (classic, luxe, connected) pour savoir où injecter le html

const containerItems = document.querySelector(".containerItems");
let product;


function modaleAdded() {
    let modalePopUp = document.querySelector('.modaleAdded');
    modalePopUp.style.transform="translateY(0%)";
    modalePopUp.style.bottom="1%";
    setTimeout(() => {
        modalePopUp.style.transform="translateY(100%)";
        modalePopUp.style.bottom="0";
    }, 1750);
}

function createProductCard(product) {
    document.getElementById(product.type).innerHTML +=
        `<div class="productCard">
            <div class="productImg">
                <img src="${product.image}" alt="Nom de la montre : ${product.title}">
            </div>
            <h4>${product.title}</h4>
            <p class="productPrice">${product.price.toLocaleString()}€</p>
            <p class="productDesc">${product.desc}</p>
            <button class="btnAddProduct" id="${product.id}">Ajouter au panier</button>
        </div>`
}

function calculCartPrice() {
    let sum = 0;
    document.querySelectorAll('.cartProductCard span:nth-child(3)').forEach(price => {
        sum += parseInt(price.innerHTML.replace(/\D/g,''));
    })
    document.querySelector('.totalCartPrice').innerHTML = '<div><div>TOTAL</div><div>(hors frais de livraison)</div></div><div>' + sum.toLocaleString() + '€</div>';
}

const addToCart = (e, stock) => {
    stock.forEach((elem) => {
        if (elem.id == e.target.id) {
            localStorage.setItem(elem.id, JSON.stringify(elem));
        }
    })
    calculCartPrice();
    modaleAdded();
}

function increaseQuantity(id) {
    let product = JSON.parse(localStorage.getItem(id));
    product.quantity++;
    localStorage.setItem(id, JSON.stringify(product));
    calculCartPrice();
}

function decreaseQuantity(id) {
    let product = JSON.parse(localStorage.getItem(id));
    product.quantity--;
    localStorage.setItem(id, JSON.stringify(product));
    calculCartPrice();
}

function addOneProduct() {
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
            increaseQuantity(btn.dataset.id);
            quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
            document.querySelector('.productQuantity[data-id ="' + btn.dataset.id + '"]').innerHTML = quantity.quantity;
            document.querySelector('span[data-id ="' + btn.dataset.id + '"]').innerHTML = (quantity.price * quantity.quantity).toLocaleString() + '€';
            calculCartPrice();
        })
    })
}

function substractOneProduct() {
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
            if (quantity.quantity == 1) {
                localStorage.removeItem(btn.dataset.id);
                document.querySelector('.cartProductCard[data-id ="' + btn.dataset.id + '"]').outerHTML = '';
            } else {
                decreaseQuantity(btn.dataset.id);
                quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
                document.querySelector('.productQuantity[data-id ="' + btn.dataset.id + '"]').innerHTML = quantity.quantity;
                document.querySelector('span[data-id ="' + btn.dataset.id + '"]').innerHTML = (quantity.price * quantity.quantity).toLocaleString() + '€';
            }
            calculCartPrice();
            containerItemsIsEmpty();
        })
    })
}

function deleteProduct() {
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem(btn.dataset.id);
            document.querySelector('.cartProductCard[data-id="' + btn.dataset.id + '"]').outerHTML = '';
            calculCartPrice();
            containerItemsIsEmpty();
        })
    })
}

function displayCart() {
    containerItems.innerHTML = '';
    for (i = 0; i < localStorage.length; i++) {
        product = JSON.parse(localStorage.getItem(localStorage.key(i)))
        containerItems.innerHTML +=
            `
        <div class="cartProductCard" data-id="${product.id}">
            <div class="imgCart">
                <img src="${product.image}">
            </div>
            <div class="productInfo">
                <h4>${product.title}</h4>
                <span>${product.price.toLocaleString()}€</span>
                <span data-id="${product.id}">${(product.price * product.quantity).toLocaleString()}€</span>
            </div>
            <div>
                <div class="addproduct-ctn">
                    <button data-id="${product.id}" class="decrease"><i class="fa-solid fa-minus"></i></button>
                    <div class="productQuantity" data-id="${product.id}">${product.quantity}</div>
                    <button data-id="${product.id}" class="increase"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div class="ctn-delete-product">
                <button class="delete-product" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `
    }
}

displayCart();
addOneProduct();
substractOneProduct();
deleteProduct();
calculCartPrice();

fetch('/assets/js/stock.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        json.stock.forEach(element => {
            createProductCard(element);
        });

        let btnAddProduct = document.querySelectorAll(".btnAddProduct");
        btnAddProduct.forEach((btn) => {
            let test = false;
            btn.addEventListener("click", (e) => {
                if (localStorage.length == 0) {
                    addToCart(e, json.stock);
                    displayCart();
                    btnAddProduct = document.querySelectorAll(".btnAddProduct");
                } else {
                    for (let i = 0; i < localStorage.length; i++) {
                        let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
                        if (btn.id == product.id) {
                            test = true;
                        }
                    }
                }
                if (test == true) {
                    let product = JSON.parse(localStorage.getItem(btn.id));
                    increaseQuantity(btn.id);
                    product = JSON.parse(localStorage.getItem(btn.id));
                    document.querySelector('.productQuantity[data-id ="' + btn.id + '"]').innerHTML = product.quantity;
                    document.querySelector('span[data-id ="' + btn.id + '"]').innerHTML = product.price * product.quantity + '€';
                    calculCartPrice();
                    
                } else {
                    addToCart(e, json.stock);
                    displayCart();
                    addOneProduct();
                    substractOneProduct();
                    deleteProduct();
                    calculCartPrice();

                }
                containerItemsIsEmpty();
                modaleAdded();
            })
        })
    })
const basket = document.querySelector(".container-basket");
const btnCloseModale = document.querySelector(".btn-close-modale")
const modaleBackground = document.querySelector(".modale-background")
const emptyContainerItems = document.querySelector(".emptyContainerItems")


// ------- Modale


navShoppingCartBtn.addEventListener("click", () => {
    modaleOpen()
})

continueShopping.addEventListener("click", () => {
    modaleOpen()
})

btnCloseModale.addEventListener("click", () => {
    modaleOpen()
})
modaleBackground.addEventListener("click", () => {
    modaleOpen()
})

const modaleOpen = () => {
    document.body.classList.toggle("bodyActive")
    basket.classList.toggle("containerBasketActive")
    modaleBackground.classList.toggle("modaleBackgroundActive")
}
// ------- Navbar

const nav = document.querySelector(".nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    if (window.scrollY < lastScroll) {
        nav.style.top = "0";
    } else {
        nav.style.top = "-100px";
    }
    lastScroll = window.scrollY
})

// Js tri items

const selectedWatchRadio = document.querySelectorAll(".selectedWatchRadio")

selectedWatchRadio.forEach(radio => {
    radio.addEventListener("click", (e) => {
        if (e.target.id == "selectedWatchClassic") {
            selectedClassic.style.display = "block"
            selectedLuxury.style.display = "none"
            selectedConnected.style.display = "none"
        }
        if (e.target.id == "selectedWatchLuxury") {
            selectedClassic.style.display = "none"
            selectedLuxury.style.display = "block"
            selectedConnected.style.display = "none"
        }
        if (e.target.id == "selectedWatchConnected") {
            selectedClassic.style.display = "none"
            selectedLuxury.style.display = "none"
            selectedConnected.style.display = "block"
        }
    })
});


// Si le panier est vide

const containerItemsIsEmpty = () => {
    if (containerItems.childElementCount === 0) {
        emptyContainerItems.style.display = "block"
        btnCheckout.style.display = "none"
    } else {
        emptyContainerItems.style.display = "none"
        btnCheckout.style.display = "block"
    }
}

window.addEventListener("load", () => {
    containerItemsIsEmpty()
})

document.querySelector('#classicBtnCat').addEventListener('click', () => {
    document.querySelector('#jumpToClassic').scrollIntoView()
})

document.querySelector('#luxeBtnCat').addEventListener('click', () => {
    document.querySelector('#jumpToLuxe').scrollIntoView()
})

document.querySelector('#connectedBtnCat').addEventListener('click', () => {
    document.querySelector('#jumpToConnected').scrollIntoView()
})