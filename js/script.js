const categoriesNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
}


const displayNewsCategories = (news) => {
   
    // dynamically navbar added
const navContainer = document.getElementById('nav-container');

news.forEach(data => {
    const li = document.createElement('li');
    li.classList.add("nav-item");
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.innerText= data.category_name;
    a.setAttribute("aria-current", "page")
    a.setAttribute('href', "#")

    li.appendChild(a);

    navContainer.appendChild(a)
     
});

}

categoriesNews();



const newsItem = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsItems(data.data))
}

const displayNewsItems = (items) => {

    const newsItems = document.getElementById('news-items-container');

    items.forEach(item => {
        console.log(item);

        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.setAttribute('style','max-width:90%');


        div.innerHTML= `
        
                 <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${item.thumbnail_url}" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${item.title}</h5>
                          <p class="card-text text-muted">${item.details.slice(0,300)}</p>




                          <div>

                          <div>
                          <img class="rounded w-50 img-fluid" src="${item.author.img}">
                          <p>${item.author.name}</p>
                          </div>

                          <div></div>
                          <div></div>
                          
                          </div>
                         
                        </div>


                      </div>
                    </div>
        
        
        
        `

        newsItems.appendChild(div);
        
        
    });

}
newsItem();