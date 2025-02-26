const movies = [
{ title: "veer-zaara", genre: "romance", rating: 8.0, releaseYear: 2000 },
{ title: "super 30", genre: "motivational-drama", rating: 9.0, releaseYear: 2008 },
{ title: "chhava", genre: "action", rating: 10.0, releaseYear: 2025 }
];
const addMovie = (collection, movie) => {
    collection.push(movie);
    };
    addMovie(movies, { title: "mrs.", genre: "family-drama", rating: 8.5, releaseYear: 2025 });
    console.log(movies);
    const listMoviesByGenre = (collection, genre) => {
        return collection.filter(movie => movie.genre === genre);
        };
console.log(listMoviesByGenre(movies, "romance"));
const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => movie.rating > highest.rating ? movie : highest);
    };
console.log(findHighestRatedMovie(movies));
const getMovieTitles = collection => {
    return collection.map(movie => movie.title);
    };
console.log(getMovieTitles(movies));
const moviesAfterYear = (collection, year) => {
    return collection.filter(movie => movie.releaseYear > year);
    };
console.log(moviesAfterYear(movies, 2010));
movies.forEach(movie => {
    console.log(`${movie.title} (${movie.releaseYear}) is a ${movie.genre} movie with a rating of${movie.rating}.`);
});

    