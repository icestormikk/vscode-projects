/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EffectCards, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import Loader from '../components/Loader';
import '../css/index.css';
import 'swiper/swiper-bundle.min.css';
import hairWomanPictureUrl from '../static/pictures/hair_woman.jpg';
import hairManPictureUrl from '../static/pictures/hair_man.jpg';
import manicurePictureUrl from '../static/pictures/manicure.jpg';
import makeupPictureUrl from '../static/pictures/makeup.jpg';
import SwiperElement from '../components/special/SwiperElement';
import ServiceSublist from '../components/ServiceSublist';
import ShoppingСart from '../components/ShoppingСart';

export default class Services extends Component {
  constructor(props) {
    super(props);

    this.sublistChild = React.createRef();
    this.state = {
      isLoading: true,
      chosenService: props.chosenService || {},
      services: props.services,
    };
  }

  componentDidMount() {
    this.getAllServices();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  getAllServices() {
    axios
      .get('http://localhost:8080/services', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((response) => {
        console.log(response.data);
        // this.setState(() => ({
        //   services: response.data,
        // }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const componentState = this.state;
    return (
      <div className="min-h-screen text-white flex justify-center">
        <div className="w-11/12 px-4 mt-20 h-full">
          {componentState.isLoading ? (
            <Loader
              colorCode="#111827"
              height={100}
              width={100}
              isOnFullScreen
            />
          ) : (
            <>
              <div className="flex flex-col lg:flex-row justify-around items-center gap-8 mb-20">
                <div className="text-center md:text-left lg:w-2/5 w-full">
                  <h1 id="page-title">
                    Услуги
                  </h1>
                  <h2 className="xl:text-2xl text-xl text-gray-400 mt-4">
                    Здесь можно разместить полезную
                    информацию об оказываемых услугах или
                    какую-то другую полезную информацию.
                  </h2>
                </div>
                <div className="mx-0">
                  <Swiper
                    navigation
                    effect="cards"
                    id="swiper-color"
                    slidesPerView={1}
                    loop
                    modules={[EffectCards, Navigation]}
                    className="xl:w-[26vw] lg:w-[34vw] sm:w-[50vw] w-[65vw] min-w-[20vw] min-h-[10vh] max-h-[80vh] rounded-lg overflow-hidden"
                  >
                    {componentState.services.map((service) => (
                      <SwiperSlide key={service.id}>
                        <SwiperElement
                          picture={(
                            <img
                              src={service.imageUrl}
                              alt="service-type"
                              className="z-[-1] object-cover overflow-hidden"
                            />
                          )}
                          elementTitle={<p>{service.title}</p>}
                          agreeHandler={() => {
                            this.sublistChild.current.getServiceById(
                              service.id,
                            );
                            this.setState(() => ({
                              chosenService: service,
                            }));
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <ServiceSublist
                ref={this.sublistChild}
                chosenService={componentState.chosenService}
              />
            </>
          )}
          <ShoppingСart />
        </div>
      </div>
    );
  }
}

Services.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  services: PropTypes.array,
  chosenService: PropTypes.objectOf(PropTypes.shape),
};
Services.defaultProps = {
  services: [
    {
      id: 0,
      title: 'Женские стрижки',
      imageUrl: hairWomanPictureUrl,
    },
    {
      id: 1,
      title: 'Мужские стрижки',
      imageUrl: hairManPictureUrl,
    },
    {
      id: 2,
      title: 'Маникюр',
      imageUrl: manicurePictureUrl,
    },
    {
      id: 3,
      title: 'Макияж',
      imageUrl: makeupPictureUrl,
    },
  ],
  chosenService: {},
};
