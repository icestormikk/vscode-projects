/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { BsFillPersonFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import {
  Field, Form, Formik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../LogoComponent';
import { ContactInfoSchema } from '../../schemas/contactInfoSchema';
import UserPhoneField from './UserPhoneField';
import { clearCart } from '../../store/OrdersInfoSlice';

export default function UserDataForm() {
  const dispatch = useDispatch();

  const selectedSubservices = useSelector((state) => state.ordersInfo.selectedSubservices);
  const subservicesToMasters = useSelector((state) => state.ordersInfo.subservicesToMasters);
  const subservicesToDates = useSelector((state) => state.ordersInfo.subservicesToDates);

  const navigate = useNavigate();
  const inputFieldStyle = 'rounded-md h-8 border-[1px] pl-2 border-gray-400 invalid:bg-red-300 font-light placeholder:text-sm invalid:bg-white';
  const errorStyle = 'text-red-500 text-sm';

  function constructOrdersFullInfoObject() {
    const result = [];
    selectedSubservices.forEach((subservice) => {
      result.push({
        selectedSubserviceID: subservice.id,
        masterID: subservicesToMasters[subservice.id][0].id,
        date: subservicesToDates[subservice.id],
      });
    });
    return result;
  }

  function handleSubmit(values) {
    const fullInfoObject = values;
    fullInfoObject.ordersInfo = constructOrdersFullInfoObject();
    axios.post('http://localhost:8080/orders', fullInfoObject)
      .finally(() => {
        console.log(fullInfoObject);
      });
  }

  return (
    <div className="flex flex-col">
      <div className="w-full bg-gray-100 border-[1px] border-gray-300 rounded-xl overflow-hidden block">
        <div className="p-10 shadow-lg rounded-b-xl">
          <Logo
            componentsAlignProperties="justify-center items-center"
            textSizeProperty="text-5xl"
            componentsFlexDirectionProperty="flex-col"
          />
        </div>
        <h1 className="text-center p-2 text-xl">Контактная информация</h1>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            phone: '',
            commentary: '',
          }}
          validationSchema={ContactInfoSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="firstname" className="flex flex-col px-4">
                {/* Guest firstname field */}
                <div className="flex gap-2 text-md text-gray-500 items-center">
                  <BsFillPersonFill />
                  <span>Имя</span>
                </div>
                <Field name="firstname" id="firstname" className={inputFieldStyle} />
                {touched.firstname && errors.firstname ? (
                  <p className={errorStyle}>{errors.firstname}</p>
                ) : null}
              </label>
              {/* Guest lastname field */}
              <label htmlFor="lastname" className="flex flex-col px-4">
                <div className="flex gap-2 text-md text-gray-500 items-center">
                  <BsFillPersonFill />
                  <span>Фамилия</span>
                </div>
                <Field name="lastname" id="lastname" className={inputFieldStyle} />
                {touched.lastname && errors.lastname ? (
                  <p className={errorStyle}>{errors.lastname}</p>
                ) : null}
              </label>
              {/* Field for guest's phone */}
              <label htmlFor="phone" className="flex flex-col px-4">
                <div className="flex gap-2 mt-6 text-md text-gray-500 items-center">
                  <BsFillTelephoneFill />
                  <span>Номер телефона</span>
                </div>
                <Field name="phone" component={UserPhoneField} />
              </label>
              {/* fields for optional comments from the user */}
              <label htmlFor="commentary" className="flex flex-col px-4">
                <div className="flex gap-2 text-md text-gray-500 items-center">
                  <FaComment />
                  <span>Комментарий</span>
                </div>
                <Field
                  as="textarea"
                  name="commentary"
                  id="commentary"
                  className="border-[1px] border-gray-400 rounded-md font-light text-sm max-h-32"
                  maxLength={150}
                />
                {touched.commentary && errors.commentary ? (
                  <p className={errorStyle}>{errors.commentary}</p>
                ) : null}
              </label>
              <input
                type="submit"
                className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white mt-10 text-lg"
                value="Записаться"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
