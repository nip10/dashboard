import rp from 'request-promise';
import Promise from 'bluebird';

const Movies = {

  getMovies() {
    const imgArray = [];
    const options = {
      uri: 'https://yts.ag/api/v2/list_movies.json?sort=date_added&limit=2',
      json: true,
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((res) => {
          imgArray.push(res.data.movies[0].medium_cover_image);
          imgArray.push(res.data.movies[1].medium_cover_image);
          resolve(imgArray);
        })
        .catch(err => reject(err));
    });
  },
};

module.exports = Movies;
