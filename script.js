const loadCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=> displayCategories(data.categories))
    .catch((error)=> console.log(error))
}

const loadVidoes=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=>res.json())
    .then(data=>displayVideo(data.videos))
    .catch(error=>console.log(error))
}


const removeActiveClass=()=>{
    const buttons=document.getElementsByClassName("category-btn");
    for(btn of buttons){
        btn.classList.remove("active")
    }
}

const loadDetails = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
};

const displayDetails = (video) => {
    const detailsContainer = document.getElementById("modal-content");

    detailsContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description} </p>
    `;

    document.getElementById("customModal").showModal(); // Corrected the typo here
};







const loadCategoryVideos=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass()
        const activeBtn=document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")

        displayVideo(data.category);
        
    })
    .catch(error=>console.log(error))
}


function getTimeString(time){
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}


const displayVideo=(videos)=>{
    const videoContainer=document.getElementById("videos")
    videoContainer.innerHTML=""

    if(videos.length==0){
        videoContainer.innerHTML=`<h1 class="font-bold text-3xl ">No content here</h1>`
    }

    videos.forEach(video=>{
        const card=document.createElement("div")
        card.classList="card card-compact "
        card.innerHTML=`
        <figure class="h-[200px] relative">
    <img class="h-full object-cover"
      src=${video.thumbnail}
      alt="image" />

      ${
        video.others.posted_date?.length==0 ? "":      `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)} </span>`



      }

  </figure>
  <div class="flex gap-4 items-center">
    <div>
        <img class="w-10 h-10 rounded-full object-cover " src=${video.authors[0].profile_picture} />
    </div>
    
        <div>

        <h2 class="font-bold">${video.title} </h2>

        <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name} </p>
        ${video.authors[0].verified== true?'<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>'
            :""}


        </div>

        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button> </p>

        </div>



    </div>
  </div>

        `
        videoContainer.append(card)
    })
}





const displayCategories=(categories)=>{
    const categoryContainer=document.getElementById("categories")
    categories.forEach(item => {
        const buttonContainer=document.createElement("div")
        buttonContainer.innerHTML=`

        <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.category_id})">
        ${item.category}
        </button>

        `       

        categoryContainer.appendChild(buttonContainer)
    });
}



loadCategories()
loadVidoes()


