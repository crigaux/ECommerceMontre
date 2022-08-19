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

window.addEventListener('load', () => {
    for(i=0 ; i < localStorage.length ; i++) {
        let product = JSON.parse(localStorage.getItem(localStorage.key(i)))
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
        </div>
        `
    }
})

fetch('/assets/js/stock.json')
.then(function(response) {
    return response.json();
})
.then(function(json) {
    json.stock.forEach(element => {
        createProductCard(element);
    });

    const btnAddProduct = document.querySelectorAll(".btnAddProduct");
        btnAddProduct.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                addToCart(e, json.stock);
                for(i=0 ; i < localStorage.length ; i++) {
                    if(btn.id == localStorage.key(i)){
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
                        </div>
                        `
                    }
                }
            })
        })
    });
    
const addToCart = (e, stock) => {
    stock.forEach((elem) => {
        if (elem.id == e.target.id){
            localStorage.setItem(elem.id, JSON.stringify(elem));
        }
    })
}

