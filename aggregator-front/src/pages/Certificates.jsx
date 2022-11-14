/* eslint-disable no-unused-vars */
import React from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Certificate from '../components/Certificate';
import certificateImage1 from '../static/pictures/certificate-1000.jpg';
import certificateImage2 from '../static/pictures/certificate-5000.jpg';
import certificateImage3 from '../static/pictures/certificate-10000.jpg';

export default function Sertificates() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full">
        <div className="text-gray-500">
          <h1 id="page-title">Сертификаты</h1>
          <div className="flex justify-center items-center text-center flex-col gap-4 xl:text-2xl text-xl">
            <p className="sm:w-1/2 w-full my-4 mt-20">
              Сертификат - это идеальный подарок, потому что вам не придётся гадать
              с выбором и получатель сам выберет его себе по душе!
            </p>
            <p>
              Срок действия сертификатов - 6 месяцев
            </p>
            <Swiper
              loop
              centeredSlidesBounds
              effect="coverflow"
              id="swiper-color-dark"
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination]}
              className="max-w-[90rem] lg:w-[60vw] xl:w-p[40vw] sm:w-[80vw] w-[86vw] mt-28"
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
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center">
                <Certificate
                  imageUrl={certificateImage3}
                  nominalValue={10000}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
