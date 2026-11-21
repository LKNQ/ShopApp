const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

function viewProduct(id) {
    localStorage.setItem("productId", id);
}

function showProducts(list) {
    let html = "";

    list.forEach((product) => {
        const price = Math.round(product.price * 26000) + " VND";

        html +=
            '<div class="col">' +
                '<div class="card h-100">' +
                    '<img src="' + product.thumbnail + '" class="card-img-top">' +
                    '<div class="card-body d-flex flex-column">' +
                        '<h5 class="card-title">' + product.title + '</h5>' +
                        '<h6 class="text-primary fw-bold">' + price + '</h6>' +
                        '<p class="card-text product-desc">' + product.description + '</p>' +
                        '<a href="product.html" class="btn btn-primary mt-auto" onclick="viewProduct(' + product.id + ')">View Product</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
    });

    grid.innerHTML = html;
}

function updateList() {
    const word = searchInput.value.toLowerCase();
    const result = [];

    allProducts.forEach((product) => {
        if (product.title.toLowerCase().includes(word)) {
            result.push(product);
        }
    });

    showProducts(result);
}

fetch("https://dummyjson.com/products?limit=0")
    .then((response) => response.json())
    .then((data) => {
        allProducts = data.products;
        updateList();
    })
    .catch((error) => console.error("Lỗi:", error));

searchInput.addEventListener("input", updateList);