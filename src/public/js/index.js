const socket = io();
// socket.emit('message', 'Hola, me estoy comunicando desde un websocket!');

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCategory = document.getElementById("form-category");
const inputThumbnail = document.getElementById("form-thumbnail");

// Escuchando servidor
socket.on("productsList", (productManager) => {
    renderProducts(productManager);
});

const renderProducts = (productList) => {
    fetch("/realTimeProducts")
        .then((result) => result.text())
        .then((serverTemplate) => {
            const template = Handlebars.compile(serverTemplate);
            const html = template({ productList });
            document.getElementById("productList").innerHTML = html;
        });
};

formProducts.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescript.value,
        price: +inputPrice.value,
        thumbnail: inputThumbnail.value,
        code: inputCode.value,
        stock: +inputStock.value,
        category: inputCategory.value,
    };
    socket.emit("createProduct", newProduct);
});

