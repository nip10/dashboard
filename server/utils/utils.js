import moment from 'moment';

const Utils = {

  getListOfFiveDays(n, startOffset, format) {
    const daysList = [];
    for (let i = startOffset; i < (n + startOffset); i += 1) {
      daysList.push(moment().add(i, 'd').format(format));
    }
    return daysList;
  },

};

module.exports = Utils;
