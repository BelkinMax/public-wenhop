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
  getMonthNum(month) {
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

    const idx = names.indexOf(month) + 1;

    return idx.toString(10);
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
