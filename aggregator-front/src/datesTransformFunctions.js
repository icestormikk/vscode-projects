/* eslint-disable no-console */
export function toObject(datesArray) {
  let index = 0;
  return datesArray.map((elem) => ({
    id: datesArray.length,
    date: new Date(elem),
    // eslint-disable-next-line no-plusplus
    isSelected: index++ === 0,
  }));
}

export function groupDatesObject(datesArray) {
  const groupedDates = {};

  datesArray.forEach((element) => {
    const date = element.date.toDateString();
    if (!groupedDates[date]) {
      groupedDates[date] = {
        timestamps: [],
        isSelected: element.isSelected,
      };
    }
    groupedDates[date].timestamps.push({
      date: element.date,
      isSelected: groupedDates[date].timestamps.length === 0
        && Object.keys(groupedDates).length === 1,
    });
  });

  return groupedDates;
}
