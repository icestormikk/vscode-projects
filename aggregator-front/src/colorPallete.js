/* eslint-disable no-console */
const getRandomCrewColor = () => {
  const colors = [
    '#e5087f80',
    '#0059a580',
    '#02987280',
    '#fdcc0080',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default getRandomCrewColor;
