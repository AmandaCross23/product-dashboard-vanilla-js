function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error occured: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched using:");
      data.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.error("An error occured:", error.message);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");
    if (!response.ok) {
      throw new Error(`Error with: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.slice(0, 5).forEach((item) => {
    const { name, price, image } = item.fields;

    const card = document.createElement("div");
    card.classList.add("product-card");

    const img = document.createElement("img");
    img.src = image[0].url;
    img.alt = name;

    const title = document.createElement("div");
    title.classList.add("product-name");
    title.textContent = name;

    const cost = document.createElement("div");
    cost.classList.add("product-price");
    cost.textContent = `$${(price / 100).toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(cost);
    container.appendChild(card);
  });
}

function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
  const container = document.getElementById("product-container");
  container.innerHTML = `<p style="color:red;">Please try again later can not load.</p>`;
}

fetchProductsThen();
fetchProductsAsync();
