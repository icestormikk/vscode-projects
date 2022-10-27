import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Sertificates from './pages/Sertificates'
import Contacts from './pages/Contacts'
import Services from './pages/Services'
import Jobs from './pages/Jobs'
import Footer from './components/Footer'
import { FaTelegramPlane, FaViber } from 'react-icons/fa'
import { SlSocialVkontakte } from 'react-icons/sl'
import { AiOutlineYoutube } from 'react-icons/ai' 
import { BsWhatsapp } from 'react-icons/bs'

export default function App() {
  return (
    <>
      <Header companyName="marmalade crew"/>
      <div>
        <Routes>
            <Route path="/">
              <Route index element={<Home companyName="marmalade crew"/>} />
              <Route path="services" element={<Services/>} />
              <Route path="about" element={ <AboutUs/> }/>
              <Route path="jobs" element={ <Jobs/> }/>
              <Route path="sertificates" element={ <Sertificates/>} />
              <Route path='contacts' element={<Contacts/>}/>
            </Route>
        </Routes>
      </div>
      <Footer companyName="marmalade crew" socialMediaLinks={
        [{
          icon: (<FaTelegramPlane/>), url: 'http://tg.me/1'
        },{
          icon: (<SlSocialVkontakte/>), url: 'http://vk.com/1'
        },{
          icon: (<AiOutlineYoutube/>), url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },{
          icon: (<FaViber/>), url: '12'
        },{
          icon: (<BsWhatsapp/>), url: '21'
        }]
      }/>
    </>
  )
}

