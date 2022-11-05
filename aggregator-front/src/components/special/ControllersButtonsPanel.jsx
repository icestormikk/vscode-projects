import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ControllersButtonsPanel({ addressToComeback, nextStageAction }) {
  return (
    <div className="flex justify-between items-center my-4">
      <Link to={addressToComeback}>
        <div className="bg-gradient-to-l from-[#e45353] to-[#e91f1f] p-2 text-base rounded-lg text-white">
          Вернуться
        </div>
      </Link>
      <button
        type="button"
        className="bg-gradient-to-r from-[#029872] to-[#09b68b] text-base p-2 rounded-lg text-white"
        onClick={nextStageAction}
      >
        Продолжить
      </button>
    </div>
  );
}

ControllersButtonsPanel.propTypes = {
  addressToComeback: PropTypes.string.isRequired,
  nextStageAction: PropTypes.func.isRequired,
};
