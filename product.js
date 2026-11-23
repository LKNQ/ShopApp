const container = document.getElementById("productDetail");
const id = localStorage.getItem("productId");
const myProducts = JSON.parse(localStorage.getItem("myProducts")) || [];

let myProduct = null;

myProducts.forEach((item) => {
    if (item.id == id) {
        myProduct = item;
    }
});

function showProduct(product) {
    const price = (product.price * 26000) + " VND";
    const category = product.category || "Submitted by user";

    let brand = "";
    if (product.brand) {
        brand = '<p class="text-muted mb-2">Brand: ' + product.brand + '</p>';
    }

    let rating = "";
    if (product.rating) {
        rating = '<p class="text-warning mb-3">Rating: ' + product.rating + ' / 5</p>';
    }

    let stock = "";
    if (product.stock) {
        stock = '<p class="text-success fw-bold">' + product.stock + ' in stock</p>';
    }

    let reviews = "";
    if (product.reviews) {
        reviews = '<h4 class="mt-4">Reviews</h4>';
        product.reviews.forEach((review) => {
            reviews +=
                '<div class="border-bottom py-2">' +
                    '<strong>' + review.reviewerName + '</strong> ' +
                    '<span class="text-warning">' + review.rating + ' / 5</span>' +
                    '<p class="mb-0">' + review.comment + '</p>' +
                '</div>';
        });
    }

    container.innerHTML =
        '<div class="col-md-5">' +
            '<div class="card shadow-sm p-3 text-center">' +
                '<img src="' + product.thumbnail + '" class="img-fluid product-image" alt="' + product.title + '">' +
            '</div>' +
        '</div>' +
        '<div class="col-md-7">' +
            '<span class="badge bg-primary mb-2">' + category + '</span>' +
            '<h1 class="h2">' + product.title + '</h1>' +
            brand +
            rating +
            '<h2 class="text-primary fw-bold mb-3">' + price + '</h2>' +
            '<p>' + product.description + '</p>' +
            stock +
            reviews +
        '</div>';
}

if (myProduct) {
    showProduct(myProduct);
} else {
    fetch("https://dummyjson.com/products/" + id)
        .then((response) => response.json())
        .then((product) => showProduct(product))
        .catch((error) => console.error("Lỗi:", error));
}