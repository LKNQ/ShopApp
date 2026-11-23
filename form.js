const addForm = document.getElementById("productForm");
if (!currentUser) {
    alert("Please log in to sell a product.");
    window.location.href = "login.html";
}
addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const priceVND = document.getElementById("productPrice").value;
    const description = document.getElementById("productDesc").value;
    const file = document.getElementById("productImage").files[0];

    if (!file) {
        alert("Please choose an image.");
        return;
    }

    if (file.size > 300000) {
        alert("Image is too big. Choose one under 300 KB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const products = JSON.parse(localStorage.getItem("myProducts")) || [];

        products.push({
            id: Date.now(),
            title: name,
            price: priceVND / 26000,
            description: description,
            thumbnail: reader.result,
        });

        localStorage.setItem("myProducts", JSON.stringify(products));

        addForm.reset();
        alert("Product saved!");
    };

    reader.readAsDataURL(file);
});