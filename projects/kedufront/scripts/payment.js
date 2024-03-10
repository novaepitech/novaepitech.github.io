document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    var email = document.getElementById('email').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var country = document.getElementById('country').value;
    var zip = document.getElementById('zip').value;

    // Create an object to store the data
    var order = {
        email: email,
        name: fname + ' ' + lname,
        address: address + ', ' + city + ', ' + state + ', ' + country + ', ' + zip,
        cart: products.map(product => ({ id: product._id, amount: product.quantity }))
    };

    // Send the order object to your API
    fetch('https://api.kedufront.juniortaker.com/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
