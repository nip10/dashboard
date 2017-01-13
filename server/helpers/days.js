const moment = require('moment');

const Days = {};

Days.getList = (n, startOffset, format) => {
    let daysList = [];
    for (i=startOffset;i<(n+startOffset);i++) {
        daysList.push(moment().add(i, 'd').format(format));
    }
    return daysList;
}

module.exports = {Days};
