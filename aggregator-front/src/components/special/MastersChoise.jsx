/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import masterAvatar1 from '../../static/pictures/master_avatar_1.jpg';
import masterAvatar2 from '../../static/pictures/master_avatar_2.jpg';
import masterAvatar3 from '../../static/pictures/master_avatar_3.jpg';
import getRandomCrewColor from '../../colorPallete';

export default class MastersChoise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedSubservices: props.selectedSubservices,
      completeStageController: props.mastersCompletedController,
      masters: [],
    };
  }

  componentDidMount() {
    this.fetchMasters();
  }

  fetchMasters() {
    const elementState = this.state;
    this.setState(() => ({
      isLoading: true,
    }));

    axios.get('http://localhost:8080/date', {
      params: {
        services: elementState.selectedSubservices.map((subservice) => subservice.id),
      },
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState(() => ({
          isLoading: false,
          masters: [
            {
              id: 0,
              name: 'Имя',
              surname: 'Фамилия',
              professionName: 'Мастер по ноготочкам',
              phone: '88005553535',
              email: 'test1@test.com',
              imageUrl: masterAvatar1,
            }, {
              id: 1,
              name: 'Имя',
              surname: 'Фамилия',
              professionName: 'Профессиональный парикмахер',
              phone: '88005553535',
              email: 'test2@test.com',
              imageUrl: masterAvatar2,
            }, {
              id: 2,
              name: 'Имя',
              surname: 'Фамилия',
              professionName: 'Стажер-парикмахер',
              phone: '88005553535',
              email: 'test3@test.com',
              imageUrl: masterAvatar3,
            },
          ],
        }));
      });
  }

  render() {
    const pageState = this.state;
    return (
      pageState.isLoading ? (
        <Loader
          colorCode="#111827"
          height={100}
          width={100}
          isOnFullScreen
        />
      ) : (
        <div className="xl:w-1/2 lg:w-2/3 w-4/5">
          <div className="flex justify-between items-center text-gray-500 ">
            <h1 className="my-4 text-2xl">Выбор специалистов</h1>
            <h1 className="my-4 text-xl whitespace-nowrap">1 / 3</h1>
          </div>
          <div className="flex flex-col gap-4">
            {
              pageState.masters && pageState.masters.map((master) => (
                <div key={master.id} className="block rounded-xl bg-gray-200 border-[1px] border-gray-300">
                  <div className="h-max py-4 px-4 border-[1px] border-gray-300 rounded-xl flex gap-4 bg-gray-100 relative overflow-hidden">
                    <div className="flex gap-4 z-10 sm:flex-row flex-col">
                      <img src={master.imageUrl} alt="master avatar" className="h-20 w-20 rounded-full border-[1px] border-gray-500 shadow-sm shadow-black" />
                      <div className="break-all">
                        <h1 className="text-base">
                          {master.name}
                          {' '}
                          {master.surname}
                        </h1>
                        <h2 className="text-gray-500 italic font-extrabold" style={{ color: `${getRandomCrewColor()}` }}>
                          {master.professionName}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col py-2 px-4">
                    <h1>Название услуги 1</h1>
                    <div className="flex gap-2 font-light">
                      <p>2 ч 20 мин</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="flex justify-between items-center my-4">
            <Link to="/services">
              <div className="bg-gradient-to-l from-[#e45353] to-[#e91f1f] p-2 text-base rounded-lg text-white">
                Вернуться
              </div>
            </Link>
            <button
              type="button"
              className="bg-gradient-to-r from-[#029872] to-[#09b68b] text-base p-2 rounded-lg text-white"
              onClick={pageState.completeStageController}
            >
              Продолжить
            </button>
          </div>
        </div>
      )
    );
  }
}

MastersChoise.propTypes = {
  mastersCompletedController: PropTypes.func.isRequired,
  selectedSubservices: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
