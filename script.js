// Selectors:

const getUl = document.getElementById("movie-list");
const getRadioButtons = document.getElementsByName("movie-filter");
const getSearchButton = document.getElementById("search-button");

console.log(getSearchButton);

// Function add movies to dom:

const addMoviesToDom = function (movies) {
    // Remove all content:
    getUl.innerHTML = "";
    // Itterate over movies:
    movies.forEach(function (movie) {
        // make new li for each movie:
        const makeLi = document.createElement("li");
        // add li to ul:
        getUl.appendChild(makeLi);
        // make new a tag:
        const makeA = document.createElement("a");
        // ad link to a href:
        makeA.href = `https://www.imdb.com/title/${movie.imdbID}`;
        // grab li and add a as child:
        makeLi.appendChild(makeA);
        // make new img tag: 
        const makeImg = document.createElement("img");
        // set source of img to movie.poster:
        makeImg.src = movie.poster;
        // grab a and add img as child:
        makeA.appendChild(makeImg);

    });

}

// Function handleOnChangeEvent with switch statement:
// Switch statement gets input from button id (event.target.id) when clicked;
// if case matches the function addMoviesToDom() with corresponding filter() will run;

const handleOnChangeEvent = function (event) {
    console.log(event.target.id);
    switch (event.target.id) {
        case "all-movies":
            addMoviesToDom(movies);
            break;
        case "latest-movies":
            addMoviesToDom(filterLatestMovies());
            break;
        case "avenger-movies":
            addMoviesToDom(filterMovies("Avengers"));
            break;
        case "x-men-movies":
            addMoviesToDom(filterMovies("X-Men"));
            break;
        case "princess-movies":
            addMoviesToDom(filterMovies("Princess"));
            break;
        case "batman-movies":
            addMoviesToDom(filterMovies("Batman"));
            break;
    }
}

// Function action press search button:

const pressButtonAction = function () {
    // Get value from search field
    const getSearchValue = document.getElementById("search-field-input").value;
    addMoviesToDom(filterMoviesByTag(getSearchValue));
}

// Function loop through radio buttons; 
// add EventListener "change" to buttons;
// execute function handleOnChangeEvent:

const radioButtonLoop = function (getRadioButtons) {
    getRadioButtons.forEach(function (button) {
        button.addEventListener("change", handleOnChangeEvent);
    });
}

// Function filterMovies:
// Filter movies where value of (wordInMovie) is given in the function handleOnChangeEvent

const filterMovies = function (wordInMovie) {
    return movies.filter(function (movie) {
        return movie.title.includes(wordInMovie);
    });
}

// Function filter latest movies:

const filterLatestMovies = function () {
    return movies.filter(function (movie) {
        const stringToNumber = parseInt(movie.year, 10);
        return stringToNumber >= 2014;
    });
}

// Function filterMoviesByTag:

const filterMoviesByTag = function (searchWord) {
    return movies.filter(function (movie) {
        return movie.title.includes(searchWord);
    });
}

// function calls: 

addMoviesToDom(movies);
radioButtonLoop(getRadioButtons);

// Event listeners:

getSearchButton.addEventListener("click", pressButtonAction);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        return pressButtonAction();
    }
});










