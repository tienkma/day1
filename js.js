
// nếu tạo 1 thẻ rồi `` cho nó thì chỉ cần appenchild cho nó
// không cần html = ''

const API_KEY = 'api_key=989721d982bb3abb0f98cee23d078f32';
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const img_url = "https://image.tmdb.org/t/p/w500"
const search_url = BASE_URL + "/search/movie?" + API_KEY;

const main = document.querySelector("#main");
const span = main.querySelectorAll("#main .movie_info span");
const form = document.querySelector("#form");
const search = document.querySelector("#search");


getMovie(API_URL)

function getMovie(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
           showMovie(data);

        });
};

function showMovie(data){
    main.innerHTML = ""
    data.results.forEach(function(movie){
        
        const movieEL = document.createElement("div");
        movieEL.classList.add("movie");
        movieEL.innerHTML = `
        <img src="${img_url+movie.poster_path}" alt="">
        <div class="movie_info">
            <h3>${movie.title}</h3>
            <span class="${colorText(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${movie.overview}</p>
        </div>
        `
        main.appendChild(movieEL);


        
    })
}


function colorText(length){
    
    if(length>=8){
        return "green";
    }
    else if(length>=5){
        return "orange";
    }
    else{
        return "red";
    }
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovie(search_url+'&query='+searchTerm)
    } else{
        getMovie(API_URL)
    }

})



