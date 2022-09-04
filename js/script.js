
const categoryNewsLoader = () => {
  const url = ('https://openapi.programming-hero.com/api/news/categories');
  fetch(url)
  .then(res=> res.json())
  .then(data => allCategory(data.data.news_category))
}

const allCategory = (news) =>{

  news.forEach(category => {
    console.log(category);
    
    const createItem = document.createElement('li');
    createItem.className = 'nav-item';
    createItem.innerHTML =  `
    <a class="nav-link category-nav-item" category="${category.category_id}" href="#">${category.category_name}</a>
    `;
    document.getElementById('category-container').appendChild(createItem);
 });
}

categoryNewsLoader();



// loader snipper function 

const displaySnipperLoader = (showHide) => {
  if(showHide){
      document.getElementById('spinner-load').classList.remove('d-none')
  }
  else{
      document.getElementById('spinner-load').classList.add('d-none')
  }
}




const CountWords  = (words) => {
  const countWord = words.split(' ');
  if(countWord.length > 80){
      return  countWord.slice(0, 80).join(' ') + ' ... ' ;
   
  }else{
      return words
  }
}


// get news function 


function NewsGet () {    
      document.addEventListener('click', function(e){

        if(e.target.hasAttribute('category')){
          const index = e.target.getAttribute('category')
          displaySnipperLoader(true)
        
          const url = `https://openapi.programming-hero.com/api/news/category/${index}`;

         fetch(url)
         .then(res => res.json())
         .then(data => {
          data.data.sort((a,b) => {
              if(a.total_view>b.total_view) return -1;
              if(b.total_view>a.total_view) return 1
          })
          
          if(e.target.classList.contains('category-nav-item')){
              document.getElementById('news-category').innerText = e.target.innerText;
          }
         
          newsDisplay(data.data);
          displaySnipperLoader(false)

         })
         .catch(err => console.log(err))
          

        }else{
          return
        }
       
      })
  
 
}

// showing display news

function newsDisplay(allnews){
  const getNewNumber = allnews.length;
  if(allnews.length == 0){
      document.getElementById('news-number').innerText = 'No News found for'
  }else{
      document.getElementById('news-number').innerText = allnews.length + ' items found for category';

  }
  document.getElementById('news-container').innerHTML = ' ';
  for(news of allnews){
      const createDiv = document.createElement('div');
      createDiv.className = 'card mb-3';
      createDiv.innerHTML = `
                              <div class="row g-0">
                              <div class="col-md-3 p-3">
                              <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="">
                              </div>
                              <div class="col-md-9">
                              <div class="card-body pe-5 pt-4">
                                  <h5 class="card-title fw-bold">${news.title}</h5>
                                  <p class="card-text text-muted" >${CountWords(news.details)}</p>
                                  
                                  <div class="d-flex justify-content-between flex-wrap gap-4 gap-lg-0">
                                  <div>
                                      <div class="d-flex align-items-center">
                                          <img src="${news.author.img}" width="40" height="40" class="rounded-circle" alt="">
                                          <div class="ms-2">
                                              <h6 class="mb-0">${news.author.name ? news.author.name : 'No Author'}</h6>
                                              <span class="text-muted">${news.author.published_date ? news.author.published_date : 'Secret Publish Date'}</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div>
                                      <div class="d-flex align-items-center">
                                          <i class="fa-regular fa-eye me-2"></i>
                                      <span class="fw-bold">${news.total_view ? news.total_view : 'No view yet' }</span>
                                      </div>
                                  </div>
                                  <div>
                                      <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                                  </div>
                                  <div>
                                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  See News Details
                                  </button>
                                  </div>
                              </div>
                              </div>
                              </div>
                          </div>
                          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${news.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                              <img src="${news.image_url}" class="img-fluid rounded" alt="">
                                  <h4 class="mt-3"> News Related Information </h4>
                               
                                  <div class="d-flex flex-wrap justify-content-around">
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                      Publish date : ${news.author.published_date ? news.author.published_date : 'Secret Publish Date'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                      Category ID : ${news.category_id ? news.category_id : 'No Category'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                     ${news.others_info.is_trending ? 'Trending' : 'Not Trending'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                     ${news.others_info.is_todays_pick ? 'Today\'s pick' : 'Not today\'s pick'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                    Rating: ${news.rating.number ? news.rating.number : 'Not Rating Yet'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                    ${news.rating.badge ? news.rating.badge : 'Not Rating Yet'}
                                  </div>
                                  <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                    ${news.total_view ? news.total_view : 'Not View Yet'}
                                  </div>
                                  </div>
                              <p class="card-text text-muted" >${news.details}</p>

                              </div>
                            </div>
                          </div>
                        </div>
                          
      `;
      document.getElementById('news-container').appendChild(createDiv);
      
  }
}

function getCategoryName(id){

  fetch('https://openapi.programming-hero.com/api/news/categories/')
  .then(res => res.json())
  .then(data => {
      const categoryIDNumber = (parseInt(id)) - 1;
     
      document.getElementById('news-category').innerText = data.data.news_category[categoryIDNumber].category_name;

   
  })
  .catch(err => console.log(err))
}

NewsGet();

function displayNewsInitShow(){
  displaySnipperLoader(true)
  fetch('https://openapi.programming-hero.com/api/news/category/08')
  .then(res => res.json())
  .then(datas =>{
      document.getElementById('news-number').innerText = datas.data.length + ' items found';


      if(datas.data.length == 0){
          document.getElementById('spinner-load').classList.remove('d-none')
          setTimeout(()=> {
              document.getElementById('spinner-load').classList.add('d-none')
          },1000)
      }else{
          document.getElementById('spinner-load').classList.add('d-none');
  
      }


      datas.data.sort((a,b) => {
          if(a.total_view>b.total_view) return -1;
          if(b.total_view>a.total_view) return 1
      })
      for(data of datas.data){
          const createDiv = document.createElement('div');
          createDiv.className = 'card mb-3';
          createDiv.innerHTML = `
                                  <div class="row g-0">
                                  <div class="col-md-3 p-3">
                                  <img src="${data.thumbnail_url}" class="img-fluid rounded" alt="">
                                  </div>
                                  <div class="col-md-9">
                                  <div class="card-body pe-5 pt-4">
                                      <h5 class="card-title fw-bold">${data.title}</h5>
                                      <p class="card-text text-muted" >${CountWords(data.details)}</p>
                                      
                                  <div class="d-flex justify-content-between flex-wrap gap-4 gap-lg-0">
                                      <div>
                                          <div class="d-flex align-items-center">
                                              <img src="${data.author.img}" width="40" height="40" class="rounded-circle" alt="">
                                              <div class="ms-2">
                                                  <h6 class="mb-0">${data.author.name ? data.author.name : 'No Author'}</h6>
                                                  <span class="text-muted">${data.author.published_date ? data.author.published_date : 'Secret Publish Date'}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div>
                                          <div class="d-flex align-items-center">
                                              <i class="fa-regular fa-eye me-2"></i>
                                          <span class="fw-bold">${data.total_view ? data.total_view : 'No view yet' }</span>
                                          </div>
                                      </div>

                                      <div>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                          <i class="fa fa-star"></i>
                                      </div>

                                      <div>
                                      <button type="button" class="btn color-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Read More
                                      </button>
                                      </div>
                                  </div>
                                  </div>
                                  </div>
                              </div>
                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${data.title}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                  <img src="${data.image_url}" class="img-fluid rounded" alt="">
                                      <h4 class="mt-3"> News Related Information </h4>
                                     
                                      <div class="d-flex flex-wrap justify-content-around">
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                          Publish date : ${data.author.published_date ? data.author.published_date : 'Secret Publish Date'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                          Category ID : ${data.category_id ? data.category_id : 'No Category'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                         ${data.others_info.is_trending ? 'Trending' : 'Not Trending'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                         ${data.others_info.is_todays_pick ? 'Today\'s pick' : 'Not today\'s pick'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                        Rating: ${data.rating.number ? data.rating.number : 'Not Rating Yet'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                        ${data.rating.badge ? data.rating.badge : 'Not Rating Yet'}
                                      </div>
                                      <div class="px-2 py-1 mx-0 my-1 border border-primary">
                                        ${data.total_view ? data.total_view : 'Not View Yet'}
                                      </div>
                                      </div>
                                  <p class="card-text text-muted" >${data.details}</p>
  
                                  </div>
                                </div>
                              </div>
                            </div>
                              
          `;
          document.getElementById('news-container').appendChild(createDiv);
      }
  })
  displaySnipperLoader(false)
}
displayNewsInitShow();