/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Navigate, Outlet, Route, Routes, useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlSocialVkontakte } from 'react-icons/sl';
import { AiOutlineInstagram, AiFillSkype } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Certificates from './pages/Certificates';
import OurSalons from './pages/OurSalons';
import Services from './pages/Services';
import OurWorks from './pages/OurWorks';
import Footer from './components/Footer';
import OrderRegistration from './pages/OrderRegistration';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';

function ProtectedRoute({
  isAllowed,
  redirectPath = '/login',
  redirectingMessage,
  childrenComponent,
}) {
  if (isAllowed) {
    return childrenComponent;
  }

  const location = useLocation();
  return (
    <Navigate
      to={redirectPath}
      state={
        { prev: location, message: redirectingMessage }
      }
      replace
    />
  );
}

export default function App() {
  const currentUser = useSelector((state) => state.users);

  useEffect(() => {
    const handleTabClose = (event) => {
      // Cookies ?
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route
              path="administration"
              element={(
                <ProtectedRoute
                  isAllowed={currentUser.userInfo.roles.includes('user')}
                  redirectingMessage="Данная страница доступна только авторизированным пользователям.
                  Пожалуйста, войдите в систему."
                />
              )}
            >
              <Route index element={<AdminPanel />} />
            </Route>
            <Route path="services">
              <Route index element={<Services />} />
              <Route path="order" element={<OrderRegistration />} />
            </Route>
            <Route path="about" element={<AboutUs />} />
            <Route path="jobs" element={<OurWorks />} />
            <Route path="sertificates" element={<Certificates />} />
            <Route path="contacts" element={<OurSalons />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer
        companyName="marmalade crew"
        socialMediaLinks={[
          {
            icon: <SlSocialVkontakte />,
            url: 'https://vk.com/marmalade_nail__bar',
            id: 'vk-link',
          },
          {
            icon: <AiOutlineInstagram />,
            url: 'https://www.instagram.com/marmaladenails',
            id: 'instagram-link',
          },
          {
            icon: <AiFillSkype />,
            url: 'skype:33-95-87?call',
            id: 'skype-link',
          },
          {
            icon: <BsWhatsapp />,
            url: 'https://wa.link/wk8ne7',
            id: 'whatsapp-link',
          },
        ]}
      />
    </>
  );
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  redirectingMessage: PropTypes.string.isRequired,
  childrenComponent: PropTypes.objectOf(PropTypes.shape),
};

ProtectedRoute.defaultProps = {
  redirectPath: '/login',
  childrenComponent: <Outlet />,
};
