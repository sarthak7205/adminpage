const submit = document.getElementById("sub");

submit.addEventListener("click", function(event) {
    event.preventDefault(); 
    console.log("working man");
    const sellingPrice = document.getElementById("selling-price").value;
    const productName = document.getElementById("product").value;
    const category = document.getElementById("cato").value;

    const newProduct = {
        sellingPrice: sellingPrice,
        productName: productName,
        category: category
    };
    displayNewProduct(newProduct);
    axios.post('https://crudcrud.com/api/1fb05968fcb046d1ad898cecc9781587', postData)
    .then(function (response) {
        
        console.log('POST request successful:', response.data);
    })
    .catch(function (error) {
        console.error('Error making POST request:', error);
    });
  



});
function displayNewProduct(product) {
    const categoryList = document.getElementById(`${product.category}`);

    const listItem = document.createElement('li');
    listItem.textContent = `${product.productName} - ${product.sellingPrice}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.dataset.productId = product._id; 

    listItem.appendChild(deleteButton);

    categoryList.appendChild(listItem);
}
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const productId = event.target.dataset.productId;

        
        event.target.parentElement.remove();

        axios.delete(`https://crudcrud.com/api/your_api_endpoint/${productId}`)
        .then(function (response) {
        
            console.log('Product deleted successfully:', response.data);
        })
        .catch(function (error) {
            console.error('Error deleting product:', error);
        });
    }
});