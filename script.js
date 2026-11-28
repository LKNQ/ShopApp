const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

function viewProduct(id) {
    localStorage.setItem("productId", id);
}

function showProducts(list) {
    let html = "";
    let categories = {};

    list.forEach((product) => {
        const category = product.category || "Other";
        if (!categories[category]) {
            categories[category] = [];
        }

        categories[category].push(product);
    });

    Object.keys(categories).forEach((category) => {
        html += '<div class="mb-5">';
        html += '<h3 class="ms-5">' + category.toUpperCase() + '</h3>';
        html += '<div class="row row-cols-1 row-cols-md-5 g-4">';

        categories[category].forEach((product) => {
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

        html += '</div></div>';
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
        const myProducts = JSON.parse(localStorage.getItem("myProducts")) || [];
        allProducts = myProducts.concat(data.products);
        updateList();
    })
    .catch((error) => console.log(error));

searchInput.addEventListener("input", updateList);
