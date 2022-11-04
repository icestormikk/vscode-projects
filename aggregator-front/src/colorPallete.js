/* eslint-disable no-console */
const getRandomCrewColor = () => {
  const colors = [
    '#e5087f',
    '#0059a5',
    '#029872',
    '#fdcc00',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default getRandomCrewColor;
