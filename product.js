const container = document.getElementById("productDetail");
const id = localStorage.getItem("productId");

fetch("https://dummyjson.com/products/" + id)
    .then((response) => response.json())
    .then((product) => {
        const price = Math.round(product.price * 26000) + " VND";
        if (product.brand === undefined) {
            brand = 'No brand'
        } else {
            brand = '<p class="text-muted mb-2">Brand: ' + product.brand + '</p>';

        }

        let reviews = "";
        product.reviews.forEach((review) => {
            reviews +=
                '<div class="border-bottom py-2">' +
                    '<strong>' + review.reviewerName + '</strong> ' +
                    '<span class="text-warning">' + review.rating + ' / 5</span>' +
                    '<p class="mb-0">' + review.comment + '</p>' +
                '</div>';
        });

        container.innerHTML =
            '<div class="col-md-5">' +
                '<div class="card shadow-sm p-3 text-center">' +
                    '<img src="' + product.thumbnail + '" class="img-fluid product-image" alt="' + product.title + '">' +
                '</div>' +
            '</div>' +
            '<div class="col-md-7">' +
                '<span class="badge bg-primary mb-2">' + product.category + '</span>' +
                '<h1 class="h2">' + product.title + '</h1>' +
                brand +
                '<p class="text-warning mb-3">Rating: ' + product.rating + ' / 5</p>' +
                '<h2 class="text-primary fw-bold mb-3">' + price + '</h2>' +
                '<p>' + product.description + '</p>' +
                '<p class="text-success fw-bold">' + product.stock + ' in stock</p>' +
                '<h4 class="mt-4">Reviews</h4>' +
                reviews +
            '</div>';
    })
    .catch((error) => console.error("Lỗi:", error));