import knex from '../db/connection';

const User = {
  getUserSettings(userID) {
        // Get Weather Settings
    const userIDnum = Number.parseInt(userID, 2);
    const p1 = knex.select('lat', 'lng', 'city', 'country')
                            .from('weather')
                            .where('user_id', userIDnum);
        // .then(location => res.send({ data: location }))
        // .catch(err => res.send({ error: err}))
        // Get TvShows (this should return the settings not the tvshows themselves ?)
    const p2 = knex.select('name')
                            .from('tvshows')
                            .join('usertv', 'tvshows.id', '=', 'usertv.tvshow_id')
                            .where('usertv.user_id', '=', userIDnum)
                            .groupBy('tvshows.name');
        // .then(tvshows => res.send({ data: tvshows }))
        // .catch(err => res.send({ error: err }));
    return Promise.all([p1, p2]);
    //             .then((data) => {
    //               console.log('????????????????????????????????????????????', data);
    //               return data;
    //             })
    //             .catch(err => console.log('******************************************* ', err));
  },
};

module.exports = User;
