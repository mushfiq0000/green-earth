// categorie section
const categoriesList = document.getElementById("categories-list");

const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    const categories = data.categories;
    showCategory(categories);
  } catch (error) {
    
  }
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoriesList.innerHTML += `
        <p class="hover:bg-[#15803d] hover:text-white cursor-pointer rounded-md p-2">${cat.category_name}</p>
        `;
  });

  categoriesList.addEventListener('click', (e) => {
    const allP = document.querySelectorAll('p')
    allP.forEach(p => {
        p.classList.remove('bg-[#15803d]', 'text-white')
    })
     

    if (e.target.localName === 'p'){
        e.target.classList.add('bg-[#15803d]', 'text-white')
    }
    
  })
};

loadCategory();
