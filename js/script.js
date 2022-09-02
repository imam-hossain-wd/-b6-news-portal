const newsCategories = (news) => {
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

    const categoryContainer = document.getElementById('category-container');
    const div = document.createElement('div');
    div.classList.add('d-flex', 'justify-content-between')
       
     div.innerHTML=`
            <a href="">Home</a>
            <a href="">${breaking}</a>
            <a href="">${regular}</a>
            <a href="">${international}</a>
            <a href="">${sports}</a>
            <a href="">${entertainment}</a>
            <a href="">${culture}</a>
            <a href="">${arts}</a>
            <a href="">${all}</a>
            <a href="">null</a>   `

    categoryContainer.appendChild(div);

}

newsCategories();

