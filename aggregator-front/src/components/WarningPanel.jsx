import React from 'react';
import PropTypes from 'prop-types';

export default function WarningPanel({
  colorCode, icon, header, content,
}) {
  return (
    <div className="flex flex-row items-center gap-5 rounded-xl p-2 text-secondary-color w-full xl:w-1/2" style={{ backgroundColor: `${colorCode}` }}>
      {icon}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{header}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}

WarningPanel.propTypes = {
  colorCode: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.shape).isRequired,
  header: PropTypes.string,
  content: PropTypes.string,
};

WarningPanel.defaultProps = {
  header: 'Предупреждение',
  content: 'Что-то такое, о чём невозможно молчать',
};
