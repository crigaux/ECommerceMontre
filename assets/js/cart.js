// Ajout de la classe "overlayIn" et suppresion de la classe "overlayOut" à l'overlay du panier au clic sur le bouton "panier"

function overlayIn();

// Ajout de la classe "overlayOut" et supression de la classe "overlayIn" à l'overlay du panier au clic sur la croix ou en dehors du panier

function overlayOut();

// Au clic sur le bouton "ajouter au panier" d'un produit, intéroger stock.json pour récupérer les données de l'articles (Id, titre, image, prix), créer un objet avec ces informations + une quantité, ajouter au local storage.
// Si le produit existe déjà dans le panier, incrémenter son compteur.

function addToCart();

// Au clic sur le bouton "+", récupérer l'article dans le local storage (avec son Id), incrémenter sa quantité et restocker l'objet en local storage

function increaseQuantity();

// Au clic sur le bouton "-", récupérer l'article dans le local storage (avec son Id), décrémenter sa quantité et restocker l'objet en local storage

function decreaseQuantity();

// Au clic sur l'icone "poubelle", supprimer l'objet correspondant dans le local storage qu'importe sa quantité (avec son Id)

function deleteProduct();

// A chaque ajout de produit, ajouter le prix de l'article au total du panier

function cartSumCalc();