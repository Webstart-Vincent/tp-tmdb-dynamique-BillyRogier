const body = document.querySelector('body')

fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=0a162f40e6a2a9391d8f39a96afa58b8")
.then((response) => response.json())
.then((data) => {
    for (var i = 0; i < data.results.length; i++) {
        var filmCard = `
        <section>
        <img src="https://image.tmdb.org/t/p/w400/${data.results[i].poster_path}" alt="affiche film">
        <div class="film_container">
            <h2>${data.results[i].original_title
            }</h2>
            <p>${data.results[i].overview}</p>
        </div>
        </section>`
        body.innerHTML += filmCard
    }
})