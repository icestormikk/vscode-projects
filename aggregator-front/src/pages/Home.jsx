/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../css/index.css';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import topSectionPicture from '../static/pictures/cosmetics_article1.jpg';
import middleSectionPicture from '../static/pictures/beautysalon_article2.jpg';
import HomePageSection from '../components/special/HomePageSection';

export default function Home() {
  return (
    <div className="max-h-min text-white block">
      <HomePageSection
        heightCoefficient="h-[66vh]"
        backgroundPicture={topSectionPicture}
        sectionTitle={(
          <h1 className="text-4xl font-bold leading-tight">
            Студия красоты
            <br />
            Marmalade crew
          </h1>
        )}
        description={(
          <p className="text-[#e4e6ca] font-light text-xl w-full md:w-2/3 lg:w-4/5">
            Это сеть студий красоты, куда гости приходят вместе
            с друзьями, чтобы иметь возможность общаться, в то
            время как мастера оказывают им профессиональные
            услуги.
          </p>
        )}
        button={(
          <Link to="/services" className="flex gap-1.5 justify-center items-center text-xl text-gray-100 w-max py-4 px-8 rounded-md shadow-2xl bg-[#e00d7c] hover:bg-[#ca0a71]  duration-200 ease-in transition-all font-bolder tracking-wide">
            <span>Записаться</span>
            <AiOutlineRight className="mt-0.6" />
          </Link>
        )}
        textside="right"
      />
      <HomePageSection
        heightCoefficient="h-[50vh]"
        backgroundPicture={middleSectionPicture}
        sectionTitle={(
          <h1 className="text-4xl font-bold leading-tight">
            9 лет на страже красоты
          </h1>
        )}
        description={(
          <p className="text-[#e4e6ca] font-light text-xl w-full md:w-2/3 lg:w-4/5">
            Маникюр, брови, ресницы, волосы, депиляция, солярий
            - это все в одном месте
          </p>
        )}
        textside="left"
      />
    </div>
  );
}
