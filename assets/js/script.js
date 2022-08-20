// Récupère le nom d'un produit et crée une carte en injectant du html dans l'index.html
// Les données qui doivent apparaître dans une carte sont : "image", "title", "desc", "price"
// Trier les produits en fonction de leur "type" (classic, luxe, connected) pour savoir où injecter le html

function createProductCard(product) {
    document.getElementById(product.type).innerHTML += 
    `<div class="productCard">
        <div class="productImg">
            <img src="${product.image}" alt="Nom de la montre : ${product.title}">
        </div>
        <h4>${product.title}</h4>
        <p class="productPrice">${product.price}€</p>
        <p class="productDesc">${product.desc}</p>
        <button id="${product.id}">ajouter au panier</button>
    </div>`
}

fetch('/assets/js/stock.json')
.then(function(response) {
    return response.json();
})
.then(function(json) {
    json.stock.forEach(element => {
        createProductCard(element);
    });
});