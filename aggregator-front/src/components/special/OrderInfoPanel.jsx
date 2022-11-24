/* eslint-disable react/no-array-index-key */
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
          order.ordersInfo.map((elem, index) => (
            <span key={index} className="flex items-center">
              <SubserviceInfoPanel subservice={elem.selectedSubservice} />
            </span>
          ))
        }
      </div>
      <span>
        <span className="font-normal">Клиент:</span>
        <ClientInfo client={order.clientInfo} />
      </span>
      <span>
        <span className="font-normal">Задействованные мастера:</span>
        <div className="ml-10 flex flex-col">
          {
            order.ordersInfo.map((elem) => (
              <MasterInfoPanel key={elem.master.id} master={elem.master} />
            ))
          }
        </div>
      </span>
      <span>
        <span className="font-normal">Время записи: </span>
        {new Date(order.date).toLocaleTimeString('ru')}
      </span>
      {
        (order.clientCommentary !== '') && (
          <span>
            <span className="font-normal">Примечание от клиента: </span>
            {order.clientCommentary}
          </span>
        )
      }
    </div>
  );
}

OrderInfoPanel.propTypes = {
  order: PropTypes.objectOf(PropTypes.shape).isRequired,
};
