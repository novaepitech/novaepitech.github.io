// URL de l'API
const apiUrl = 'https://api.kedufront.juniortaker.com/';

fetch(`${apiUrl}item/`)
	.then(response => response.json())
	.then(items => {
		// Select all the cards
		let cards = document.querySelectorAll('.product');
		items.forEach((item, index) => {
			// Use the index to get the corresponding card
			let card = cards[index];
			// Création d'une balise img pour chaque item
			const img = document.createElement('img');
			img.src = `${apiUrl}item/picture/${item.image}`;
			card.appendChild(img);

			const name = document.createElement('h1');
			name.textContent = item.name;
			card.appendChild(name);

			const price = document.createElement('h2');
			price.textContent = item.price + ' €';
			card.appendChild(price);

			const addToCart = document.createElement('button');
			if (index <= 3)
				addToCart.textContent = 'Ajouter au panier';
			else {
				addToCart.textContent = 'En rupture de stock';
				addToCart.style.opacity = 0.5;
			}
			card.appendChild(addToCart);
			var colors = ['lightyellow', 'pink', 'lightgreen'];
			var randomColor = colors[Math.floor(Math.random() * colors.length)];
			addToCart.classList.add(randomColor);
		});
	})
	.catch(error => console.error('Erreur:', error));

// Footer

var colors = ['#fffcaf', 'pink', 'lightgreen'];
var randomColor = colors[Math.floor(Math.random() * colors.length)];

document.querySelector('footer').style.backgroundColor = randomColor;
