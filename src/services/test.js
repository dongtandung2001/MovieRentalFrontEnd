import {getMovies} from './fakeMovieService.js';
const states = {movies: getMovies()};


const state = states.movies.map((element)=> {
    let result = ''
    for(const property in element) {
        if(property !== 'genre')
            result +=<td>${element[property]}</td>
    };
    return <tr>result</tr>
});

console.log(state);