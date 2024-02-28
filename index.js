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
  
    axios.post('https://crudcrud.com/api/8c1b052ce0c14ed3b957257beb5bb91d/product', newProduct)
    .then(function (response) {
        
        newProduct._id=response.data._id
        displayNewProduct(newProduct);
        console.log('POST request successful:', newProduct.id);
    })
    .catch(function (error) {
        console.error('Error making POST request:', error);
    });
  
    


});

function displayNewProduct(product) {
    
    const categoryList = document.getElementById(`${product.category}`);

    const listItem = document.createElement('li');
    listItem.textContent = `${product.productName} - ${product.sellingPrice}`;
    listItem.setAttribute('data-id',product._id)
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
       
        axios.delete(`https://crudcrud.com/api/8c1b052ce0c14ed3b957257beb5bb91d/product/${productId}`)
        .then(function (response) {
        
            console.log('Product deleted successfully:', response.data);
        })
        .catch(function (error) {
            console.error('Error deleting product:', error);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    
    axios.get('https://crudcrud.com/api/8c1b052ce0c14ed3b957257beb5bb91d/product')
        .then(function (response) {
            const products = response.data; 
                 
              
            products.forEach(function(product) {
            
              displayNewProduct(product)
                // displayNewProduct(product);
            });
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
});
