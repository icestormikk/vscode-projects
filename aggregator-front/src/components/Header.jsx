import '../css/index.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { closeHeader, openHeader } from '../store/HeaderSlice';
import Logo from './LogoComponent';

export default function Header() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const currentUser = useSelector((state) => state.users);
  const isOpen = useSelector((state) => state.header.isOpen);
  const links = [
    { name: 'Услуги', url: '/services' },
    { name: 'О нас', url: '/about' },
    { name: 'Сертификаты', url: '/sertificates' },
    { name: 'Наши салоны', url: '/contacts' },
    { name: 'Работы', url: '/jobs' },
  ];

  return (
    <nav className="w-full bg-primary-color relative z-1">
      <div
        className="xl:flex relative items-center justify-between py-6 xl:px-10 px-7 "
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
        <div className={`absolute ${isOpen ? 'z-20' : 'z-2'} left-0 xl:static w-full xl:w-max`}>
          <ul
            className={
              `text-2xl xl:flex xl:items-center bg-gray-100 xl:gap-10 xl:static xl:w-auto xl:px-0 xl:pb-0 text-secondary-color px-9 pb-4 transition-all duration-75 ease-in ${isOpen
                ? 'top-20'
                : 'top-[-490px] hidden'}`
            }
          >
            {links.map((link) => (
              <li
                key={link.name}
                className="cursor-pointer my-4 xl:my-0 text-xl flex moving-underline-hover-effect"
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
            <li>
              {
                currentUser.isLoggedIn ? (
                  <span>{`Привет, ${currentUser.userInfo.username}`}</span>
                ) : (
                  <button
                    type="button"
                    className="bg-gradient-to-r from-[#029872] to-[#09b68b] text-lg text-white px-4 py-1 rounded-xl"
                    onClick={() => navigator('/login')}
                  >
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <span>Войти</span>
                      <BsFillPersonFill />
                    </div>
                  </button>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
