import Swal from 'sweetalert2'

var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller",
        genre: "Action"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi",
        genre: "Superero"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven",
        genre: "Horror"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti",
        genre: "Horror"
    }
];

const showAddButton = document.getElementById('showAdd');
const addForm = document.getElementById('addForm');
const fillForm = document.getElementById('fillForm');
const filmsTable = document.querySelector('table');
const filterSelect = document.getElementById('filtre');
const currentYear = new Date().getFullYear();


addForm.style.display = 'none';

function updateTable() {
    filmsTable.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

    films.forEach(film => {
        let row = filmsTable.insertRow();
        row.insertCell().textContent = film.title;
        row.insertCell().textContent = film.years;
        row.insertCell().textContent = film.authors;
        row.insertCell().textContent = film.genre;

        let deleteCell = row.insertCell();
        let deleteButton = document.createElement('button');
        deleteButton.className = 'buttonSupp'
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            Swal.fire({
                title: 'Êtes-vous sûr?',
                text: "Vous ne pourrez pas revenir en arrière!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimez-le!'
            }).then((result) => {
                if (result.isConfirmed) {
                    films = films.filter(f => f !== film);
                    updateTable();
                    Swal.fire(
                        'Supprimé!',
                        'Le film a été supprimé.',
                        'success'
                    )
                }
            });
        });
        deleteCell.appendChild(deleteButton);
    });
}

function showErrorMessages(errors) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errors.join('<br>'),
    });
}


function validateFilm(title, year, author, genre) {
    let errors = [];
    if (title.length < 2) errors.push("- Le titre doit avoir au moins 2 caractères.\n");
    if (year < 1900 || year > currentYear) errors.push("- L'année doit être comprise entre 1900 et l'année en cours.\n");
    if (author.length < 5) errors.push("- L'auteur doit avoir au moins 5 caractères.\n");
    if (genre.length === 0) errors.push("- Le genre ne peut pas être vide.\n");
    return errors;
}


showAddButton.addEventListener('click', () => {
    addForm.style.display = 'block';
});


fillForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.querySelector('input[placeholder="Titre"]').value.trim();
    const year = parseInt(event.target.querySelector('input[placeholder="Année"]').value.trim(), 10);
    const author = event.target.querySelector('input[placeholder="Réalisateur"]').value.trim();
    const genre = event.target.querySelector('input[placeholder="Genre"]').value.trim();

    const validationErrors = validateFilm(title, year, author, genre);
    if (validationErrors.length === 0) {
        films.push({
            title: title.charAt(0).toUpperCase() + title.slice(1),
            years: year,
            authors: author.charAt(0).toUpperCase() + author.slice(1),
            genre: genre.charAt(0).toUpperCase() + genre.slice(1),
        });
        updateTable();
        Swal.fire(
            'Ajouté !',
            'Le film a été ajouté.',
            'success'
        )
        addForm.style.display = 'none';
    } else {
        showErrorMessages(validationErrors);
    }
});

filterSelect.addEventListener('change', (event) => {
    const filter = event.target.value;
    if (filter === 'alpha') {
        films.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === 'decroissant') {
        films.sort((a, b) => b.years - a.years);
    }
    updateTable();
});

updateTable();