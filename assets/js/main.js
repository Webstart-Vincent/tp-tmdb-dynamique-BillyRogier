const container = document.querySelector('#container')

function getTextColor(r, g, b) {
    var brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 125 ? '#000000' : '#ffffff'
}

fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR&include_adult=false&api_key=0a162f40e6a2a9391d8f39a96afa58b8&region=fr'
)
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach((film) => {
            if (
                film.overview !== '' &&
                film.poster_path !== '' &&
                film.poster_path !== null &&
                film.original_title !== ''
            ) {
                const description = film.overview
                const image = film.poster_path
                const titre = film.original_title

                const createContainer = document.createElement('div')
                createContainer.classList.add('container')
                const imageElt = document.createElement('img')
                imageElt.crossOrigin = 'anonymous'
                imageElt.src = `https://image.tmdb.org/t/p/w400/${image}`
                imageElt.alt = titre
                imageElt.classList.add('poster')

                const colorThief = new ColorThief()

                imageElt.addEventListener('load', () => {
                    const dominantColor = colorThief.getColor(imageElt)

                    createContainer.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
                    const textColor = getTextColor(
                        dominantColor[0],
                        dominantColor[1],
                        dominantColor[2]
                    )
                    createContainer.style.borderColor = textColor
                    title.style.color = textColor
                    texte.style.color = textColor
                })

                const informationDiv = document.createElement('div')
                informationDiv.classList.add('information')

                const title = document.createElement('h1')
                title.classList.add('title')
                title.textContent = titre

                const texte = document.createElement('p')
                texte.classList.add('texte')
                texte.textContent = description

                informationDiv.appendChild(title)
                informationDiv.appendChild(texte)
                createContainer.appendChild(imageElt)
                createContainer.appendChild(informationDiv)
                container.appendChild(createContainer)
            }
        })
    })
    .catch((error) => console.error(error))
