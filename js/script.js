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
        createDiv.classList = ""
        createDiv.innerHTML = `
        <button id="" onclick="getPostData('${category.category_id}')" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">${category.category}</button>

        `
        categorySection.appendChild(createDiv)
    });
}


//Get Post data from API
const getPostData = async (categoryId='1000') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const postData = await res.json();
    const posts = await postData.data;
    displayPostData(posts)
}
//Display Post data
const displayPostData = (posts) => {
    const postSection = document.getElementById('post-section')
    const emptyData = document.getElementById('empty-data');
    if(posts < 1){
        emptyData.classList.remove('hidden')
    } else{
        emptyData.classList.add('hidden')
    }
    // Sort by views sector

    postSection.textContent = "";
    //Get data one by one 
    posts.forEach(post => {
        const createPostDiv = document.createElement('div')
        createPostDiv.classList = "";
        createPostDiv.innerHTML = `
        <a class="" href="#">
        <img class="rounded-lg w-full h-40" src="${post.thumbnail}" alt="" />
        </a>
        <div class="p-3">
            <div class="py-3 sm:py-4">
                <div class="flex gap-3">
                    <div class="">
                        <img class="w-10 h-10 rounded-full" src="${post.authors[0]?.profile_picture}" alt="user image">
                    </div>
                    <div class="">
                        <h2 class="text-xl">${post.title}</h2>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">${post.authors[0]?.profile_name} <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 21 21">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
                    </svg></p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">${post.others?.views} views</p>
                    </div>
                </div>
            </div>
        </div>
        `
        postSection.appendChild(createPostDiv)

    });
}

// time function 
function secondsToHoursMinutes(seconds) {
    // Calculate the  hours
    const hours = Math.floor(seconds / 3600);
  
    // Calculate the remaining seconds after the hours
    const remainingSeconds = seconds % 3600;
  
    // Calculate the number of whole minutes
    const minutes = Math.floor(remainingSeconds / 60);
  
    return {
      hours: hours,
      minutes: minutes,
    };
  }
  
  // Example usage:
  const totalSeconds = 13200; // Replace with the number of seconds you want to convert
  const result = secondsToHoursMinutes(totalSeconds);
  console.log(`Hours: ${result.hours}, Minutes: ${result.minutes}`);
  



//link with blog page
document.getElementById('blog-btn').addEventListener('click',() =>{
    window.location.href = 'blog.html';
})
getPostData()
getCategories()