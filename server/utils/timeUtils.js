const milliFromNow = time => new Date().getTime() + time;

const daysFromNow = (now, days) => new Date().setDate(now.getDate() + days);

module.exports = { milliFromNow, daysFromNow };
