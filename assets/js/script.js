// Récupère le nom d'un produit et crée une carte en injectant du html dans l'index.html
// Les données qui doivent apparaître dans une carte sont : "image", "title", "desc", "price"
// Trier les produits en fonction de leur "type" (classic, luxe, connected) pour savoir où injecter le html

const containerItems = document.querySelector(".containerItems");
let product;

function createProductCard(product) {
    document.getElementById(product.type).innerHTML +=
        `<div class="productCard">
        <div class="productImg">
            <img src="${product.image}" alt="Nom de la montre : ${product.title}">
        </div>
        <h4>${product.title}</h4>
        <p class="productPrice">${product.price}€</p>
        <p class="productDesc">${product.desc}</p>
        <button class="btnAddProduct" id="${product.id}">ajouter au panier</button>
    </div>`
}

const addToCart = (e, stock) => {
    stock.forEach((elem) => {
        if (elem.id == e.target.id) {
            localStorage.setItem(elem.id, JSON.stringify(elem));
        }
    })
}

function increaseQuantity(id) {
    let product = JSON.parse(localStorage.getItem(id));
    product.quantity++;
    localStorage.setItem(id, JSON.stringify(product));
}

function decreaseQuantity(id) {
    let product = JSON.parse(localStorage.getItem(id));
    if (product.quantity == 1) {
        localStorage.removeItem(id);
    } else {
        product.quantity--;
        localStorage.setItem(id, JSON.stringify(product));
    }
}

function addOneProduct() {
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            increaseQuantity(btn.dataset.id);
            let quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
            document.querySelector('.increase[data-id ="'+ btn.dataset.id +'"] + div').innerHTML = quantity.quantity;
            document.querySelector('span[data-id ="'+ btn.dataset.id +'"]').innerHTML = quantity.price * quantity.quantity + '€';
        })
    })
}

function substractOneProduct() {
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            decreaseQuantity(btn.dataset.id);
            let quantity = JSON.parse(localStorage.getItem(btn.dataset.id));
            document.querySelector('.increase[data-id ="'+ btn.dataset.id +'"] + div').innerHTML = quantity.quantity;
            document.querySelector('span[data-id ="'+ btn.dataset.id +'"]').innerHTML = quantity.price * quantity.quantity + '€';
        })
    })
}

function deleteProduct() {
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem(btn.dataset.id);
            document.querySelector('.cartProductCard[data-id ="' + btn.dataset.id + '"]').outerHTML = '';
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
                <span>${product.price}€</span>
                <span data-id="${product.id}">${product.price * product.quantity}€</span>
            </div>
            <div>
                <div class="addproduct-ctn">
                    <button data-id="${product.id}" class="increase"><i class="fa-solid fa-plus"></i></button>
                    <div>${product.quantity}</div>
                    <button data-id="${product.id}" class="decrease"><i class="fa-solid fa-minus"></i></button>
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

fetch('/assets/js/stock.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        json.stock.forEach(element => {
            createProductCard(element);
        });

        const btnAddProduct = document.querySelectorAll(".btnAddProduct");
        btnAddProduct.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                
                if(localStorage.length == 0) {
                    addToCart(e, json.stock);
                    displayCart();
                } else {
                    for (i = 0; i < localStorage.length; i++) {
                        product = JSON.parse(localStorage.getItem(localStorage.key(i)))
                        if (btn.id == product.id) {
                            increaseQuantity(btn.id);
                            displayCart();
                        } else {
                            addToCart(e, json.stock);
                            displayCart();
                        }
                    }
                }
                addOneProduct();
                substractOneProduct();
                deleteProduct();
            })
        })
    })

// ouverture / fermeture de la modale panier

const modale = document.querySelector(".modale-background");
const basket = document.querySelector(".container-basket");
const btnCloseModale = document.querySelector(".btn-close-modale")
const backgroundModale = document.querySelector(".modale-background")

navShoppingCartBtn.addEventListener("click", () => {
    modaleOpen()
})

continueShopping.addEventListener("click", () => {
    modaleOpen()
})

btnCloseModale.addEventListener("click", () => {
    modaleOpen()
})

const modaleOpen = () => {
    modale.classList.toggle("modaleActive")
    document.body.classList.toggle("bodyActive")
    basket.classList.toggle("containerBasketActive")
}
// =======
// .then(function(json) {
//     json.stock.forEach(element => {
//         createProductCard(element);
//     });
// });
// >>>>>>> ancreCat