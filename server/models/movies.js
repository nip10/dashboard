const request = require('request');

const Movies = {};

Movies.url = 'https://yts.ag/api/v2/list_movies.json?sort=date_added&limit=2';

Movies.getMovies = () => {
  const imgArray = [];
  return new Promise((resolve, reject) => {
    request({
      url: Movies.url,
    }, (error, response, body) => {
      if (response.statusCode === 200 && !error) {
        const bodyJSON = JSON.parse(body);
        imgArray.push(bodyJSON.data.movies[0].medium_cover_image);
        imgArray.push(bodyJSON.data.movies[1].medium_cover_image);
        // console.log(imgArray);
        // return imgArray;
        resolve(imgArray);
      } else {
        // return 'Erro';
        reject('Erro');
      }
    });
  });
};

module.exports = { Movies };
