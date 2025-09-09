const categoriesList = document.getElementById("categories-list");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
let cartPrice = Number(document.getElementById("total-price").innerText);
let cartBox = [];
let modalBox = document.getElementById("modal_contant");

const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  const categories = data.categories;
  showCategory(categories);
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoriesList.innerHTML += `
        <p onclick="loadPlantCategory('${cat.id}', '${cat.category_name}')" id="${cat.id}" class="hover:bg-[#15803d] hover:text-white cursor-pointer rounded-md p-2">${cat.category_name}</p>
        `;
  });

  categoriesList.addEventListener("click", (e) => {
    const allP = document.querySelectorAll("p");
    allP.forEach((p) => {
      p.classList.remove("bg-[#15803d]", "text-white");
    });

    if (e.target.localName === "p") {
      showLoading()
      e.target.classList.add("bg-[#15803d]", "text-white");
      
    }
  });
};

const loadPlantCategory = async (categoryId, category) => {
  console.log(category);
  
  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  const res = await fetch(url);
  const data = await res.json();
  const newData = data.plants;
  console.log(newData);
  
  showCardByCategory(newData, category);
};
const showCardByCategory = (e, category) => {
  console.log(e, category);
  
  const categoryCard = e.filter((el) => el.category === category);
  
  displayAllCard(categoryCard);
};

const loadAllCard = async () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  const res = await fetch(url);
  const data = await res.json();
  const cardData = data.plants;
  displayAllCard(cardData);
};

const displayAllCard = (datas) => {
  cardContainer.innerHTML = "";
  datas.forEach((data) => {
    cardContainer.innerHTML += `
    <div id="${data.id}" class="rounded-xl bg-base-100 shadow-lg p-4 space-y-3 h-full">
    
    <figure class="">
    <img src="${data.image}" alt="" class="rounded-xl w-full h-60 object-cover" />
    </figure>
    <div class="">
    <h2 onclick="modalBtn(${data.id})" class="card-title pb-1">${data.name}</h2>
    <p class=" text-xs text-gray-600">
    ${data.description}
    </p>
    </div>
    
    <div class="flex justify-between items-center">
    <button class="bg-[#dcfce7] p-2 rounded-2xl">${data.category}</button>
    
    <p class="pr-4">৳${data.price}</p>
    </div>
    
    <div class="card-actions pt-4">
    <button  class="btn bg-[#15803d] text-white w-full rounded-3xl">
    Add to Cart
    </button>
    </div>
    </div>
    
    `;
  });
};

cardContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    console.log(e.target.innerText);
    // cartHandle(e);
    const title =
    e.target.parentNode.parentNode.children[1].children[0].innerText;
    const price =
    e.target.parentNode.parentNode.children[2].children[1].innerText;
    const id = e.target.parentNode.parentNode.id;
    
    cartBox.push({
      title: title,
      price: price,
      id: id,
    });
    alert(`${title} has been added to the cart`);
    showCartHandle(cartBox);
  }
});

const showCartHandle = (carts) => {
  cartContainer.innerHTML = "";
  cartPrice = 0;
  carts.forEach((cart) => {
    console.log(cart);

    cartContainer.innerHTML += `
      <div >

            <div
              class="flex justify-between items-center p-3 bg-[#F0FDF480] shadow-md rounded-lg"
            >
              <div class="">
                <p class="text-lg font-bold">${cart.title}</p>
                <p>${cart.price} x 1</p>
              </div>

              <span  onclick="cartRemove('${cart.id}')" class="btn cursor-pointer">✖</span>
            </div>
            
            </div>
      `;

    let price = Number(cart.price.split("৳").join(""));
    console.log(price);
    cartPrice = cartPrice + price;
  });
  document.getElementById("total-price").innerText = cartPrice;
};

const cartRemove = (cartId) => {
  console.log(cartId);

  cartBox = cartBox.filter((item) => item.id !== cartId);

  showCartHandle(cartBox);
};

const modalBtn = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayModal(data.plants);
};
const displayModal = (data) => {
  modalBox.innerHTML = `
    <div class="   p-4 space-y-3 h-full ">

        <h2 onclick="modalBtn(${data.id})" class="text-xl font-bold pb-1">${data.name}</h2>
            <figure class="">
              <img src="${data.image}" alt="" class="rounded-xl w-full h-80 object-cover" />
            </figure>
            <div class=" space-y-3">
            <p class=""><span class="font-bold">Category: </span>${data.category}</p>

            <p class=""><span class="font-bold">Price: </span>৳${data.price}</p>
          
            <p class="">
            <span class="font-bold">Description: </span>
            ${data.description}
            </p>
            </div>
            
            
            <div class="card-actions pt-4">
            </div>
          </div>
          `;

  document.getElementById("modalDialog").showModal();
};

const showLoading  = () => {
    cardContainer.innerHTML = `
    <div class="loading loading-spinner text-neutral pr-15  md:pr-20 md:mx-180"></div>
    `
}

loadCategory();
loadAllCard();
