export async function popular() {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    
    return data;
  } catch (err) {
    console.error("Can't fetch data for popular movies:", err);
    throw err;
  }
}

export async function top_rated() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Can't fetch data for top rated movies:", err);
    throw err;
  }
}

export async function upcoming() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    
    return data;
  } catch (err) {
    console.error("Can't fetch data for upcoming movies:", err);
    throw err;
  }
}

export async function now_playing() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    
    return data;
  } catch (err) {
    console.error("Can't fetch data for now playing movies:", err);
    throw err;
  }
}
