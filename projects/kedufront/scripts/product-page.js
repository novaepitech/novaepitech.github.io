const apiUrl = 'https://api.kedufront.juniortaker.com/';
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
var buttonColors = ['lightyellow', 'pink', 'lightgreen'];
var previousColor = null;

fetch(`${apiUrl}item/${productId}`)
	.then(response => response.json())
	.then(data => {
		const item = data.item;

		let image_container = document.querySelector('.product-image-container');
		const img = document.createElement('img');
		img.src = `${apiUrl}item/picture/${item._id}`;
		image_container.appendChild(img);

		let details_container = document.querySelector('.product-details-container');
		const name = document.createElement('h1');
		name.textContent = item.name;
		details_container.appendChild(name);

		const price = document.createElement('h2');
		price.textContent = item.price + ' €';
		details_container.appendChild(price);

		let add_to_cart_container = document.createElement('div');
		add_to_cart_container.classList.add('add-to-cart-container');
		details_container.appendChild(add_to_cart_container);

		const counterContainer = document.createElement('div');
		const decrementButton = document.createElement('button');
		const incrementButton = document.createElement('button');
		const countDisplay = document.createElement('span');

		let count = 1;

		decrementButton.textContent = '-';
		incrementButton.textContent = '+';
		countDisplay.textContent = count;

		decrementButton.addEventListener('click', () => {
			if (count > 1) {
				count--;
				countDisplay.textContent = count;
			}
		});

		incrementButton.addEventListener('click', () => {
			count++;
			countDisplay.textContent = count;
		});

		counterContainer.appendChild(decrementButton);
		counterContainer.appendChild(countDisplay);
		counterContainer.appendChild(incrementButton);
		add_to_cart_container.appendChild(counterContainer);
		counterContainer.classList.add('counter-container');

		const addToCart = document.createElement('button');
		if (item.name != 'Capibarou' && item.name != 'Dromaderou') {
			addToCart.textContent = 'Ajouter au panier';

			addToCart.addEventListener('click', () => {
				// Create a product object
				const product = {
					id: item._id,
					name: item.name,
					price: item.price,
					imageUrl: `${apiUrl}item/picture/${item._id}`,
					quantity: count
				};

				let products = JSON.parse(localStorage.getItem('products')) || [];

				// Check if product is already in cart
				const existingProduct = products.find(p => p.id === product.id);

				if (existingProduct) {
					// If product is already in cart, update quantity
					existingProduct.quantity += product.quantity;
				} else {
					// If product is not in cart, add it
					products.push(product);
				}

				localStorage.setItem('products', JSON.stringify(products));
			});
		} else {
			addToCart.textContent = 'En rupture de stock';
			addToCart.style.opacity = 0.5;
			addToCart.disabled = true;
		}

		add_to_cart_container.appendChild(addToCart);

		var randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];

		while (randomColor === previousColor)
			randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];

		previousColor = randomColor;

		addToCart.classList.add(randomColor);

		const description_container = document.createElement('div');
		description_container.classList.add('description-container');
		details_container.appendChild(description_container);

		const descriptionTitle = document.createElement('h1');
		descriptionTitle.textContent = 'Description';
		description_container.appendChild(descriptionTitle);

		const description = document.createElement('p');
		description.textContent = item.description;
		description_container.appendChild(description);
	})
	.catch(error => console.error('Erreur:', error));
