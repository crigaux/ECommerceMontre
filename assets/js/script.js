// Récupère le nom de l'élément et crée une carte de produit en injectant du html dans l'index.html
// Les données qui doivent apparaître dans une carte sont : "id" (en display none), "image", "title", "desc", "price"
// Trier les produits en fonction de leur "type" (classic, luxe, connected) pour savoir où injecter le html

function createProductCard(element) {
    document.getElementById(element.type).innerHTML += 
    `<div class="productCard">
        <div class="productImg">
            <img src="${element.image}" alt="image de montre">
        </div>
        <h4>${element.title}</h4>
        <p class="productPrice">${element.price}€</p>
        <p class="productDesc">${element.desc}</p>
        <button>ajouter au panier</button>
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
