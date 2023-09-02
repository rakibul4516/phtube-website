//Fetch category from API
const getCategories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categoryData = await res.json();
    const categories = await categoryData.data;
    displayCategory(categories)
}
// Display Category name
const displayCategory = (categories) => {
    const categorySection = document.getElementById('category-button-section')
    //Get data one by one 
    categories.forEach(category => {
        //Create and append category
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <button id="" onclick="getPostData('${category.category_id}')" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">${category.category}</button>

        `
        //append child to parent
        categorySection.appendChild(createDiv)
    });
}

//Get Post data from API
const getPostData = async (categoryId = '1000') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const postData = await res.json();
    const posts = await postData.data;
    displayPostData(posts);
    document.getElementById('sort-btn').addEventListener('click',() =>{
        displaySortdata(posts,shouldSort=true);
    });
}


//Display Post data
const displayPostData = (posts) => {
    const postSection = document.getElementById('post-section')
    //condition for empty data
    const emptyData = document.getElementById('empty-data');
    if(posts < 1){
        emptyData.classList.remove('hidden')
    } else{
        emptyData.classList.add('hidden')
    }
    postSection.textContent = "";

    //Get data one by one 
    posts.forEach(post => {
        //get and formet the published time 
        const seconds = post.others?.posted_date
        const publishedTime = formatTime(seconds);

        //Create post div and append childs
        const createPostDiv = document.createElement('div')
        createPostDiv.classList = "";
        createPostDiv.innerHTML = `
        <a class="relative" href="#">
            <img class="rounded-lg w-full h-40" src="${post.thumbnail}" alt="post thumbnail" />
            <h4 id="published-time" class="absolute bottom-2 lg:left-32 left-48 max-sm:left-60 bg-slate-900 text-white px-2 rounded-sm ${ seconds === 0 ? 'hidden' : ''}">${publishedTime}</h4>
        </a>
        <div class="p-3">
            <div class="py-3 sm:py-4">
                <div class="flex gap-3">
                    <div class="">
                        <img class="w-10 h-10 rounded-full" src="${post.authors[0]?.profile_picture}" alt="user image">
                    </div>
                    <div class="">
                        <h2 class="text-xl">${post.title}</h2>
                        <div class="flex items-center gap-3">
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">${post.authors[0]?.profile_name} </p>
                            <p class="mt-2">${post.authors[0]?.verified?`<img src="./images/verified.svg">`:""}</p>
                        </div>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">${post.others?.views} views</p>
                    </div>
                </div>
            </div>
        </div>
        `
        //append child in parent 
        postSection.appendChild(createPostDiv);
    });
}

// Format time seconds to hours and minutes
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    //condition for undefined time
    if (hours === 0 && minutes === 0) {
      return '';
    } else {
      return `${hours} hrs ${minutes} min ago`;
    }
  }

//Sorting all data by views
const displaySortdata =(datas, shouldSort = false)=>{
    datas.forEach(post => {
        const getViews = post.others?.views
        post.convertNumber = convertStringToNumber(getViews)

    });
     // sort the datas array convertNumber
   datas.sort((a, b) => b.convertNumber - a.convertNumber);
   displayPostData(datas)
}

//funtion for convert string views to number
function convertStringToNumber(viewsString) {
    const multiplier = viewsString.endsWith('K') ? 1000 : 1;
    return parseFloat(viewsString) * multiplier;
  }


//link with blog page
document.getElementById('blog-btn').addEventListener('click',() =>{
    window.location.href = 'blog.html';
})
//call the funtions
getPostData()
getCategories()

