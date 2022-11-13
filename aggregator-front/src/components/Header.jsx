import '../css/index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { closeHeader, openHeader } from '../store/HeaderSlice';
import Logo from './LogoComponent';

export default function Header() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.header.isOpen);
  const links = [
    { name: 'Услуги', url: '/services' },
    { name: 'О нас', url: '/about' },
    { name: 'Сертификаты', url: '/sertificates' },
    { name: 'Контакты', url: '/contacts' },
    { name: 'Работы', url: '/jobs' },
  ];

  return (
    <nav className="w-full bg-primary-color relative z-1">
      <div
        className="lg:flex relative items-center justify-between py-6 lg:px-10 px-7 "
      >
        <Link
          to="/"
          className="font-bold text-3xl flex items-center text-secondary-color w-max"
        >
          <Logo textSizeProperty="text-3xl" />
        </Link>
        {isOpen ? (
          <AiOutlineClose
            onClick={() => dispatch(closeHeader())}
            className="navbar-buttons"
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => dispatch(openHeader())}
            className="navbar-buttons"
          />
        )}
        <div className={`absolute ${isOpen ? 'z-20' : 'z-2'} left-0 lg:static w-full lg:w-max`}>
          <ul
            className={
              `text-2xl lg:flex lg:items-center bg-gray-100 lg:gap-10 lg:static lg:w-auto lg:px-0 lg:pb-0 text-secondary-color px-9 pb-4 transition-all duration-75 ease-in ${isOpen
                ? 'top-20'
                : 'top-[-490px] hidden'}`
            }
          >
            {links.map((link) => (
              <li
                key={link.name}
                className={
                  'cursor-pointer my-4 lg:my-0 before:content-[""] before:h-[2px] before:w-0 hover:before:w-full relative before:absolute before:right-0 hover:before:left-0 hover:before:right-auto before:bottom-0 before:bg-gray-800 before:transition-all before:duration-200 text-xl flex'
                }
              >
                <Link
                  onClick={() => dispatch(closeHeader())}
                  to={link.url}
                  className="w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
