import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../components/Loader';
import axios from 'axios';
import "../css/index.css";
import "swiper/swiper-bundle.min.css";
import hairWomanPicture from "../static/pictures/hair_woman.jpg";
import hairManPicture from "../static/pictures/hair_man.jpg";
import manicurePicture from "../static/pictures/manicure.jpg";
import makeupPicture from "../static/pictures/makeup.jpg";
import SwiperElement from '../components/special/SwiperElement';
import ServiceSublist from '../components/ServiceSublist';

export default class Services extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    services: PropTypes.array,
    chosenService: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      chosenServiceId: -1,
      isLoading: false,
      services: []
    }
  }

  getSimpleData() {
    axios.get("https://www.google.com/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
      .then(
        (response) => {
          console.log(response);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      ).finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  componentDidMount() {
    // this.getSimpleData()
  }

  render() {
    return (
      <div className='min-h-screen text-white flex justify-center'>
        <div className='w-11/12 px-4 mt-20 h-full'>
          {
            this.state.isLoading ? <Loader color="#111827" height={100}/> : 
            <>
              <div className='flex flex-col lg:flex-row justify-around items-center gap-8 mb-20'>
                  <div className='text-center md:text-left lg:w-2/5 w-full'>
                    <h1 className='xl:text-6xl md:text-5xl text-4xl text-gray-500'>Услуги</h1>
                    <h2 className='xl:text-3xl md:text-2xl text-xl text-gray-400 mt-4'>Здесь можно разместить полезную информацию об оказываемых услугах или какую-то другую полезную информацию.</h2>
                  </div>
                  <div className='mx-0'>
                    <Swiper
                      effect={"cards"}
                      id='swiper-color'
                      slidesPerView={1}
                      loop={true}
                      modules={[EffectCards]}
                      className='xl:w-[30vw] lg:w-[49vw] sm:w-[55vw] w-[65vw] min-w-[30vw] min-h-[20vh] max-h-[80vh] rounded-lg overflow-hidden'
                    >
                      <SwiperSlide>
                        <SwiperElement 
                          picture={<img src={hairWomanPicture} alt="men's haircuts" className='z-[-1] object-cover overflow-hidden' />}
                          elementTitle={<p>Стрижки женские</p>}
                          agreeHandler={() => {this.setState({chosenServiceId: 1})}}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <SwiperElement 
                          picture={<img src={hairManPicture} alt="men's haircuts" className='z-[-1] object-center overflow-hidden' />}
                          elementTitle={<p>Стрижки мужские</p>}
                          agreeHandler={() => {this.setState({chosenServiceId: 2})}}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <SwiperElement
                          picture={<img src={manicurePicture} alt="manicure" className='z-[-1] object-center object-contain overflow-hidden' />}
                          elementTitle={<p>Маникюр</p>}
                          agreeHandler={() => {this.setState({chosenServiceId: 3})}}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <SwiperElement
                          picture={<img src={makeupPicture} alt="makeup" className='z-[-1] object-center overflow-hidden' />}
                          elementTitle={<p>Макияж</p>}
                          agreeHandler={() => {this.setState({chosenServiceId: 4})}}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
              </div>
              <ServiceSublist chosenServiceId={this.state.chosenServiceId}/>
            </>
          }
        </div>
      </div>
    )
  }
}
