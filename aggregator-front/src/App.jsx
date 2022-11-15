import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SlSocialVkontakte } from 'react-icons/sl';
import { AiOutlineInstagram, AiFillSkype } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Certificates from './pages/Certificates';
import OurSalons from './pages/OurSalons';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
import Footer from './components/Footer';
import OrderRegistration from './pages/OrderRegistration';

export default function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Home />}
            />
            <Route path="services">
              <Route index element={<Services />} />
              <Route path="order" element={<OrderRegistration />} />
            </Route>
            <Route path="about" element={<AboutUs />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="sertificates" element={<Certificates />} />
            <Route path="contacts" element={<OurSalons />} />
          </Route>
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
