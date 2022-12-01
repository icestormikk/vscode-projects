import '../css/index.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  AiFillCaretDown, AiFillSetting, AiOutlineClose,
} from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';
import { RiAdminLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { closeHeader, openHeader } from '../store/HeaderSlice';
import Logo from './LogoComponent';
import { logout } from '../store/UserInfoSlice';
import EditUserModal from './special/forms/EditUserModal';

export default function Header() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const currentUser = useSelector((state) => state.users);
  const isListOpen = useSelector((state) => state.header.isOpen);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUserActionsListOpen, setIsUserActionsListOpen] = React.useState(false);
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
        {isListOpen ? (
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
        <div className={`absolute ${isListOpen ? 'z-20' : 'z-2'} left-0 xl:static w-full xl:w-max`}>
          <ul
            className={
              `text-2xl xl:flex xl:items-center bg-gray-100 xl:gap-10 xl:static xl:w-auto xl:px-0 xl:pb-0 text-secondary-color px-9 pb-4 transition-all duration-75 ease-in ${isListOpen
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
                  <>
                    <EditUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    <div className="text-base">
                      <p>Вы вошли как:</p>
                      <div className="flex flex-row gap-2 justify-between items-center relative">
                        <span>{`${currentUser.userInfo.firstname} ${currentUser.userInfo.lastname}`}</span>
                        <button type="button" onClick={() => setIsUserActionsListOpen((prevState) => !prevState)}>
                          <AiFillCaretDown />
                        </button>
                        <div className={`absolute bg-gray-200 xl:w-max w-full top-full right-0 text-left rounded-b-sm ${isUserActionsListOpen ? 'flex flex-col z-[1]' : 'hidden'}`}>
                          {
                            currentUser.userInfo.roles.includes('admin') && (
                              <button
                                type="button"
                                className="break-words p-2 flex flex-row justify-between items-center gap-2 border-b-[1px] border-b-gray-300 hover:bg-gray-300"
                                onClick={() => {
                                  navigator('/administration');
                                  setIsUserActionsListOpen(false);
                                }}
                              >
                                Панель администратора
                                <RiAdminLine className="text-xl" />
                              </button>
                            )
                          }
                          <button
                            type="button"
                            className="border-b-[1px] border-b-gray-300 flex flex-row justify-between items-center p-2 gap-2 hover:bg-gray-300"
                            onClick={() => setIsModalOpen(true)}
                          >
                            Управление аккаунтом
                            <AiFillSetting className="text-xl" />
                          </button>
                          <button
                            type="button"
                            className="w-full h-full p-2 text-left flex flex-row justify-between items-center hover:bg-gray-300"
                            onClick={() => {
                              dispatch(logout());
                              setIsUserActionsListOpen(false);
                            }}
                          >
                            <span>Выйти</span>
                            <BiExit className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
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
