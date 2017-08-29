import rp from 'request-promise';

const Movies = {
  getMovies() {
    const movieImages = [];
    const options = {
      uri: 'https://yts.ag/api/v2/list_movies.json?sort=date_added&limit=2',
      json: true,
    };
    return rp(options)
      .then((res) => {
        movieImages.push(res.data.movies[0].medium_cover_image);
        movieImages.push(res.data.movies[1].medium_cover_image);
        return movieImages;
      })
      .catch(err => err);
  },
};

module.exports = Movies;
