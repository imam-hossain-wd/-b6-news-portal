
const newsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
}


const displayNewsCategories = (categories) => {


    // all news category name store

    const breaking = categories[0].category_name;
    const regular = categories[1].category_name;
    const international = categories[2].category_name;
    const sports = categories[3].category_name;
    const entertainment = categories[4].category_name;
    const culture = categories[5].category_name;
    const arts = categories[6].category_name;
    const all = categories[7].category_name;


    const navContainer = document.getElementById('nav-container');
    const ul = document.createElement('ul');
    ul.classList.add('navbar-nav', 'justify-content-between', 'w-100', 'mb-2', 'mb-lg-0')

    
   
     ul.innerHTML=`

     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">Home</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${breaking}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${regular}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${international}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${sports}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${entertainment}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${culture}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${arts}</a>
    </li>
     <li class="nav-item">
         <a class="nav-link active" aria-current="page" href="#">${all}</a>
    </li>     `

    navContainer.appendChild(ul)

}





newsCategories();

