/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Certificate from '../components/Certificate';
import certificateImage1 from '../static/pictures/certificate-1000.jpg';
import certificateImage2 from '../static/pictures/certificate-5000.jpg';
import certificateImage3 from '../static/pictures/certificate-10000.jpg';
import SpecialTag from '../components/SpecialTag';

export default function Sertificates() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full text-gray-500">
        <h1 id="page-title">Сертификаты</h1>
        <div className="flex justify-center items-center text-center flex-col gap-4 xl:text-2xl text-xl">
          <p className="sm:w-1/2 w-full my-4 mt-20">
            Сертификат - это идеальный подарок, потому что вам не придётся гадать
            с выбором и получатель сам выберет его себе по душе!
          </p>
          <p>
            Срок действия сертификатов - 6 месяцев
          </p>
          <h1 className="mt-20 text-lg">Мы предоставляем сертификаты номиналом 1 000, 5 000, 10 000 рублей</h1>
          <Swiper
            loop
            navigation
            centeredSlidesBounds
            id="swiper-color-dark"
            slidesPerView={1}
            spaceBetween={30}
            modules={[Navigation]}
            className="max-w-[90rem] lg:w-[60vw] xl:w-p[40vw] sm:w-[80vw] w-[86vw] mb-2"
          >
            <SwiperSlide className="flex justify-center">
              <Certificate
                imageUrl={certificateImage1}
                nominalValue={1000}
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <Certificate
                imageUrl={certificateImage2}
                nominalValue={5000}
                additionalTag={
                  <SpecialTag text="Самое популярное!" colorCode="#de0e7a" />
                }
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <Certificate
                imageUrl={certificateImage3}
                nominalValue={10000}
                additionalTag={
                  <SpecialTag text="Самое выгодное!" colorCode="#e0bd2f" />
                }
              />
            </SwiperSlide>
          </Swiper>
          <button
            type="button"
            className="relative mb-10 w-max sm:px-20 px-4 py-2 sm:text-lg text-base text-white bg-green-400 rounded-xl h-max before:content-['']  before:absolute before:w-0 before:h-0 before:bottom-full before:left-1/2 before:-translate-x-1/2
            before:border-[20px] before:border-transparent before:border-b-green-500 shadow-xl"
          >
            Приобрести
          </button>
        </div>
      </div>
    </div>
  );
}
