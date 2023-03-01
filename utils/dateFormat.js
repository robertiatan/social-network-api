// Create date formatting helper function

const dateFormat = function (date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

module.exports = dateFormat;
