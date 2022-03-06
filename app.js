const url = `https://api.themoviedb.org/3/search/movie?api_key=68449ab72f738a13ab758ff72962cd8b&language=en-US&query=pi&page=1&include_adult=false`;
const search = document.querySelector("#searchButton");
const poster = document.querySelector(".poster");
const posterBox = document.querySelector(".posterBox");
const imgURL = "https://image.tmdb.org/t/p/w500";
const h1title = document.querySelector(".h1title");
const body = document.querySelector("body");
const h3introduction = document.querySelector(".h3introduction");
const moviewTextInfo = document.querySelector(".moviewTextInfo");
const genres = document.querySelector(".genres");
const companies = document.querySelector(".companies");
const original = document.querySelector(".original");
const day = document.querySelector(".day");
const runningTime = document.querySelector(".runningTime");
const min = document.querySelector(".min");
const money = document.querySelector(".money");
const number = document.querySelector(".number");

search.addEventListener("click", async () => {
  const input = document.querySelector(".input");

  movieName = input.value;

  const movieobjc = await fetchMovieName(movieName);
  const poster = document.querySelector(".poster");
  poster.remove();
});

const fetchMovieName = async function (movieName) {
  await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=68449ab72f738a13ab758ff72962cd8b&language=en-US&query=${movieName}&page=1&include_adult=false`
  )
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      const { id } = data.results[0];
      fetchID(id);
    });
};

const fetchID = function (movieID) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=68449ab72f738a13ab758ff72962cd8b&language=en-US&append_to_response=GET`
  )
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      const movieOb = {
        release_date: data.release_date,
        runtime: data.runtime,
        title: data.title,
        revenue: data.revenue,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        tagline: data.tagline,
        overview: data.overview,
        vote_average: data.vote_average,
        genres: [...data.genres],
        production_companies: [...data.production_companies],
      };

      const mix = `${imgURL}${movieOb.poster_path}`;
      const posterEl = document.createElement("img");
      posterEl.setAttribute("src", mix);
      posterEl.classList.add("poster");
      posterBox.appendChild(posterEl);
      h3introduction.textContent = movieOb.tagline;
      h1title.textContent = movieOb.title;
      moviewTextInfo.textContent = movieOb.overview;

      let genresString = [];
      movieOb.genres.map((name) => {
        genresString.push(name.name);
      });
      genres.textContent = genresString.toString();

      let genresCompanies = [];
      movieOb.production_companies.map((name) => {
        genresCompanies.push(name.name);
      });
      console.log(genresCompanies);
      companies.textContent = genresCompanies.toString();

      day.textContent = movieOb.release_date;
      min.textContent = movieOb.runtime + " mins";
      money.textContent = `$${new Intl.NumberFormat().format(movieOb.revenue)}`;

      console.log(typeof movieOb.revenue);
      number.textContent = movieOb.vote_average + "/10";
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(
        https://image.tmdb.org/t/p/original${movieOb.backdrop_path}
      )`;
      console.log(data);
    });
};
