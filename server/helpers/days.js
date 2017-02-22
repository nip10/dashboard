const moment = require('moment');

const days = {
  getListOfFive(n, startOffset, format) {
    const daysList = [];
    for (let i = startOffset; i < (n + startOffset); i++) {
      daysList.push(moment().add(i, 'd').format(format));
    }
    return daysList;
  },
};

module.exports = days;
