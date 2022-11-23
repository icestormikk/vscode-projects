import React from 'react';
import PropTypes from 'prop-types';
import MasterInfoPanel from './MasterInfoPanel';
import ClientInfo from './ClientInfo';
import SubserviceInfoPanel from './SubserviceInfoPanel';

export default function OrderInfoPanel(
  { order },
) {
  return (
    <div className="flex flex-col gap-1 ml-3">
      <span className="font-normal">Выбранные услуги</span>
      <div className="ml-10 flex flex-col gap-1 mb-4">
        {
          order.selectedSubservices.map((elem) => (
            <span key={elem.id} className="flex items-center">
              <SubserviceInfoPanel subservice={elem} />
            </span>
          ))
        }
      </div>
      <span>
        <span className="font-normal">Клиент:</span>
        <ClientInfo client={order.clientInfo} />
      </span>
      <span>
        <span className="font-normal">Мастер:</span>
        <MasterInfoPanel master={order.masterInfo} />
      </span>
      <span>
        <span className="font-normal">Время записи: </span>
        {order.date.toLocaleTimeString('ru')}
      </span>
    </div>
  );
}

OrderInfoPanel.propTypes = {
  order: PropTypes.objectOf(PropTypes.shape).isRequired,
};
