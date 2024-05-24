

 function now_playing() {
    fetch('https://api.themoviedb.org/3/movie/now_playing', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU'
        }
      })
        .then(response => response.json())
        .then(response => {return response})
        .catch(err => console.error(err));
}
 
 function popular() {
    fetch('https://api.themoviedb.org/3/movie/popular', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU'
        }
      })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}
function top_rated() {
    fetch('https://api.themoviedb.org/3/movie/top_rated', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU'
        }
      })
  .then(response => response.json())
  .then(response => console.log(response))
}

function upcoming() {
    fetch('https://api.themoviedb.org/3/movie/upcoming', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU'
        }
      })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}
  

