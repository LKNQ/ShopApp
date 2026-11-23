const form = document.getElementById("productForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const priceVND = document.getElementById("productPrice").value;
    const description = document.getElementById("productDesc").value;
    const file = document.getElementById("productImage").files[0];

    if (file.size > 300000) {
        alert("Image is too big. Choose one under 300 KB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const products = JSON.parse(localStorage.getItem("myProducts")) || [];

        const product = {
            id: Date.now(),
            title: name,
            price: priceVND / 26000,
            description: description,
            thumbnail: reader.result,
        };

        products.push(product);
        localStorage.setItem("myProducts", JSON.stringify(products));

        alert("Product saved!");
        form.reset();
    };

    reader.readAsDataURL(file);
});