import rp from 'request-promise';

const Movies = {

  getMovies() {
    const imgArray = [];
    const options = {
      uri: 'https://yts.ag/api/v2/list_movies.json?sort=date_added&limit=2',
      json: true,
    };
    return rp(options)
      .then((res) => {
        imgArray.push(res.data.movies[0].medium_cover_image);
        imgArray.push(res.data.movies[1].medium_cover_image);
        return imgArray;
      })
      .catch(err => console.log(err));
  },
};

module.exports = Movies;
