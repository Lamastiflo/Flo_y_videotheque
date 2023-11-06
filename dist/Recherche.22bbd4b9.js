document.addEventListener("DOMContentLoaded", ()=>{
    const searchForm = document.getElementById("rechercheForm");
    const resultsDiv = document.getElementById("resultats");
    const paginationDiv = document.getElementById("pagination");
    searchForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        const title = document.getElementById("titleInput").value.trim();
        const year = document.getElementById("yearInput").value;
        const type = document.getElementById("typeSelect").value;
        searchMovies(title, year, type);
    });
    function searchMovies(title, year, type, page = 1) {
        const apiKey = "2bcd0c1";
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&y=${year}&type=${type}&page=${page}`;
        fetch(url).then((response)=>response.json()).then((data)=>{
            displayResults(data);
            setupPagination(data, title, year, type);
        }).catch((error)=>console.error("Erreur:", error));
        console.log(url);
    }
    function displayResults(data) {
        resultsDiv.innerHTML = "";
        if (data.Response === "True") data.Search.forEach((movie)=>{
            const movieElement = document.createElement("div");
            movieElement.innerHTML = `
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/200x300"}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                `;
            resultsDiv.appendChild(movieElement);
        });
        else resultsDiv.innerHTML = `<p>${data.Error}</p>`;
    }
    function setupPagination(data, title, year, type) {
        paginationDiv.innerHTML = "";
        if (data.totalResults > 10) {
            const totalPages = Math.ceil(data.totalResults / 10);
            for(let i = 1; i <= totalPages; i++){
                const pageButton = document.createElement("button");
                pageButton.className = "page";
                pageButton.innerText = i;
                pageButton.addEventListener("click", ()=>{
                    resultsDiv.scrollIntoView();
                    searchMovies(title, year, type, i);
                });
                paginationDiv.appendChild(pageButton);
            }
        }
    }
});

//# sourceMappingURL=Recherche.22bbd4b9.js.map
