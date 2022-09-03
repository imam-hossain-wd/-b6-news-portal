const categoriesNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsCategories(data.data.news_category))
}


const displayNewsCategories = (news) => {
   
const navContainer = document.getElementById('nav-container');
navContainer.innerHTML=`
<li> <a class="nav-link" aria-current="page" href="#">Home</a></li>`

news.forEach(data => {
const li = document.createElement('li')
li.innerHTML=`
<a class="nav-link category-nav-item" aria-current="page" href="#">${data.category_name}</a>

`
navContainer.appendChild(li)


    const x = document.querySelectorAll('.nab-news-category')[1];
     
});

}

categoriesNews();


// function find news 


const findNews = () => {
  const categoryAll = document.querySelectorAll('.category-nav-item');
  categoryAll.forEach((category, index) => {
      category.addEventListener('click', function(){
const url = `https:/openapi.programming-hero.com/api/news/category/0${index+1}`

         fetch(url)
         .then(res => res.json())
         .then(data => {
          data.data.sort((a,b) => {
              if(a.total_view>b.total_view) return -1;
              if(b.total_view>a.total_view) return 1
          })
          showNewsCategory(data.data)
          showNews(data.data);
          
         })
      })
  })
}

findNews()





  









const newsItem = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsItems(data.data))
}

const displayNewsItems = (items) => {

    const newsItems = document.getElementById('news-items-container');

    items.forEach(item => {
        // console.log(item);

        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.setAttribute('style','max-width:90%');
        // console.log(item.author.img);


        div.innerHTML= `
        
                 <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${item.thumbnail_url}" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${item.title}</h5>
                          <p class="card-text text-muted mb-5">${item.details.slice(0,300)}</p>




                          <div class="d-flex justify-content-around align-items-center" >

                            <div class="d-flex align-items-center"  style="width:300px;">
                            <img class="rounded-circle w-25 h-25 img-fluid" src="${item.author.img}">
                            <p class="ps-3">${item.author.name}</p>
                            </div>

                            <div>
                            <i class="fa-light fa-eye w-100"></i>
                            <span>1.5M</span>
                            </div>


                            <div>
                            <button class="btn btn-primary">
                            Read More</button>
                            </div>
                          
                          </div>
                         
                        </div>


                      </div>
                    </div>
        
                `

        newsItems.appendChild(div);
        
        
    });

}
newsItem();