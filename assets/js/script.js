// Récupère le nom d'un produit et crée une carte en injectant du html dans l'index.html
// Les données qui doivent apparaître dans une carte sont : "image", "title", "desc", "price"
// Trier les produits en fonction de leur "type" (classic, luxe, connected) pour savoir où injecter le html

const containerItems = document.querySelector(".containerItems");


function createProductCard(product) {
    document.getElementById(product.type).innerHTML +=
        `<div class="productCard">
        <div class="productImg">
            <img src="${product.image}" alt="image de montre">
        </div>
        <h4>${product.title}</h4>
        <p class="productPrice">${product.price}€</p>
        <p class="productDesc">${product.desc}</p>
        <button class="btnAddProduct" id="${product.id}">ajouter au panier</button>
    </div>`
}
let product;

window.addEventListener('load', () => {
    for (i = 0; i < localStorage.length; i++) {
        product = JSON.parse(localStorage.getItem(localStorage.key(i)))
        containerItems.innerHTML +=
            `
        <div class="cartProductCard">
            <div class="imgCart">
                <img src="${product.image}">
            </div>
            <div class="productInfo">
                <h4>${product.title}</h4>
                <span>${product.price}€</span>
                <span>${product.price * product.quantity}€</span>
            </div>
            <div>
            <div class="addproduct-ctn">
                <button><i class="fa-solid fa-plus"></i></button>
                <div>${product.quantity}</div>
                <button><i class="fa-solid fa-minus"></i></button>
            </div>
            </div>
            <div class="ctn-delete-product">
                <button class="delete-product"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `
    }
})

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
                if (localStorage.length == 0) {
                    addToCart(e, json.stock);
                } else {
                    for (i = 0; i < localStorage.length; i++) {
                        let test = JSON.parse(localStorage.getItem(localStorage.key(i)))
                        console.log(test);
                        // console.log(test.id, btn.id);
                        if (test.id == btn.id) {
                            console.log("wsh");
                        }
                        else {
                            addToCart(e, json.stock);
                            product = JSON.parse(localStorage.getItem(localStorage.key(i)))
                            containerItems.innerHTML +=
                                `
                            <div class="cartProductCard">
                                <div class="imgCart">
                                    <img src="${product.image}">
                                </div>
                                <div class="productInfo">
                                    <h4>${product.title}</h4>
                                    <span>${product.price}€</span>
                                    <span>${product.price * product.quantity}€</span>
                                </div>
                                <div>
                                <div class="addproduct-ctn">
                                    <button><i class="fa-solid fa-plus"></i></button>
                                    <div>${product.quantity}</div>
                                    <button><i class="fa-solid fa-minus"></i></button>
                                </div>
                                </div>
                                <div class="ctn-delete-product">
                                    <button class="delete-product"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                            `
                        }
                    }
                }
                // if (btn.id == localStorage.key(i)) {
            })
        })
    })

const addToCart = (e, stock) => {
    stock.forEach((elem) => {
        if (elem.id == e.target.id) {
            localStorage.setItem(elem.id, JSON.stringify(elem));
        }
    })
}

