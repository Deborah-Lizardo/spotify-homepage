const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('playlist-gallery');
const artistName = document.getElementById('artist-name');
const artistImage = document.getElementById('artist-img');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar artistas.");
            }
            return response.json();
        })
        .then((result) => displayResults(result))
        .catch((error) => {
            console.error("Erro na requisição:", error);
            resultArtist.classList.add('hidden');
            alert("Erro ao carregar os artistas. Tente novamente.");
        });
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    artistName.textContent = ''; 
    artistImage.src = '';

    if (result.length > 0) {
        result.forEach(element => {
            artistName.textContent = element.name;
            artistImage.src = element.urlImg;
        });
        resultArtist.classList.remove('hidden');
    } else {
        artistName.textContent = "Nenhum artista encontrado.";
        resultArtist.classList.remove('hidden');
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
    } else {
        requestApi(searchTerm);
    }
});
