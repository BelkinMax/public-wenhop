export default {
  getMonthName(month) {
    const names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return names[month];
  },
  isCurrentYear(year) {
    return new Date().getFullYear().toString(10) === year;
  },
  getObjectLength(obj) {
    let size = 0;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }
};
