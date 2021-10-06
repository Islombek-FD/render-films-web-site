const elForm = document.querySelector('.form'),
    elGenreSelect = document.querySelector('.form__genre-select'),
    elTitleSearch = document.querySelector('.form__search'),
    elSortSelect = document.querySelector('.form__letter-select'),
    elFormBtn = document.querySelector('.form__btn'),
    elFilmList = document.querySelector('.films__list'),
    elHamburgerMenu = document.querySelector('.hamburger__menu');

function normalizeDate(format) {
    const date = new Date(format),
    year = date.getFullYear(),
    month = String(date.getMonth() + 1).padStart(2, 0),
    day = String(date.getDate()).padStart(2, 0);
    return `${day}.${month}.${year}`;
}

let elOpenMenu = false;
elHamburgerMenu.addEventListener('click', () => {
    if (!elOpenMenu) {
        elHamburgerMenu.classList.add('open__menu');
        elOpenMenu = true;
    }
    else {
        elHamburgerMenu.classList.remove('open__menu');
        elOpenMenu = false;
    }
})

films.forEach(film => {
    film.genres.forEach(genre => {
        if (!elGenreSelect.textContent.includes(genre)) {
            const elGenreOption = document.createElement('option');
            elGenreOption.value = genre;
            elGenreOption.textContent = genre;
            elGenreSelect.appendChild(elGenreOption);
        }
    })
})

const sortFilms = {
    0: (a, b) => {
        if(a.title < b.title) {
            return -1;
        }
        if(a.title > b.title) {
            return 1;
        }
        return 0;
    },
    
    1: (a, b) => {
        if(a.title < b.title) {
            return 1;
        }
        if(a.title > b.title) {
            return -1;
        }
        return 0;
    },

    2: (a, b) => b.release_date - a.release_date,
    
    3: (a, b) => a.release_date - b.release_date,
}

function renderFilms( arr, element) {
    element.innerHTML = null;
    arr.forEach(film => {
        const elFilmItem = document.createElement('li'),
        elFilmTitle = document.createElement('h3'),
        elFilmImg = document.createElement('img'),
        elFilmInfo = document.createElement('p'),
        elGenresTitle = document.createElement('p'), 
        elGenresList = document.createElement('ul'),
        elFilmDate = document.createElement('time');

        elFilmItem.setAttribute('class', 'film__item');
        elFilmTitle.setAttribute('class', 'film__title');
        elFilmImg.setAttribute('class', 'film__img');
        elFilmInfo.setAttribute('class', 'film__description');
        elGenresTitle.setAttribute('class', 'film__genres-title');
        elGenresList.setAttribute('class', 'film__genres-list');
        elFilmDate.setAttribute('class', 'film__date');
        
        elFilmTitle.textContent = film.title.split(' ').slice(0, 3).join(' ');
        elFilmImg.setAttribute('src', film.poster);
        elFilmImg.setAttribute('width', 240);
        elFilmImg.setAttribute('height', 200);
        elFilmInfo.textContent = film.overview.split(' ').slice(0, 10).join(' '); 
        elGenresTitle.textContent = 'Genres type';
        film.genres.forEach(genre => {
            const elGenreItem = document.createElement('li');
            elGenreItem.setAttribute('class', 'film__genre-item');
            elGenreItem.textContent = genre;
            elGenresList.appendChild(elGenreItem);
        })
        elFilmDate.textContent = normalizeDate(film.release_date);
        
        elFilmItem.appendChild(elFilmTitle);
        elFilmItem.appendChild(elFilmImg);
        elFilmItem.appendChild(elFilmInfo);
        elFilmItem.appendChild(elGenresTitle);
        elFilmItem.appendChild(elGenresList);
        elFilmItem.appendChild(elFilmDate);
        
        element.appendChild(elFilmItem);
    })
}
renderFilms(films, elFilmList);

let elFormBtnSubmit = false;

elForm.addEventListener('submit', evt => {
    evt.preventDefault();
    if (!elFormBtnSubmit) {
        elFormBtn.classList.add('form__btn--animation');
        elFormBtnSubmit = true;
    }
    else {
        elFormBtn.classList.remove('form__btn--animation');
        elFormBtnSubmit = false;
    }

    const elGenreSelectValue = elGenreSelect.value,
        elTitleSearchValue = elTitleSearch.value.trim(),
        newRegExp = new RegExp(elTitleSearchValue, 'gi');
    
    let selectedFilms = [];
    if (elGenreSelectValue === 'All') {
        selectedFilms = films.filter(movie => movie.title.match(newRegExp));
    }
    else {
        selectedFilms = films.filter(film => film.genres.includes(elGenreSelectValue)).filter(movie => movie.title.match(newRegExp));
    }

    selectedFilms.sort(sortFilms[elSortSelect.value]);
    renderFilms(selectedFilms, elFilmList);
})