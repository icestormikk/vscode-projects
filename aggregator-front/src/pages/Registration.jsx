/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Formik, Form } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/LogoComponent';
import UserPhoneField from '../components/special/UserPhoneField';
import { userInfoRegistrationSchema } from '../schemas/userInfoSchema';
import { UsersAPI } from '../services/UserService';
import { login } from '../store/UserInfoSlice';

export default function Registration() {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  function handleRegistation(values) {
    UsersAPI.registerUser(values)
      .then(() => {
        navigator('/');
      })
      .catch((error) => {
        // stub, dont use in production!
        const user = values;
        user.roles = ['user'];
        dispatch(login({ user }));

        setErrorMessage(`Не удалось провести регистрацию: ${error.message}`);
      });
  }

  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full text-gray-500">
        <div className="flex justify-center items-center">
          <div className="border-[1px] border-gray-300 shadow-lg w-max h-max p-4 rounded-xl ">
            <div className="p-10">
              <Logo
                componentsAlignProperties="justify-center items-center"
                textSizeProperty="text-5xl"
                componentsFlexDirectionProperty="flex-col"
              />
            </div>
            <Formik
              initialValues={{
                username: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={userInfoRegistrationSchema}
              onSubmit={(values) => handleRegistation(values)}
            >
              {({ errors, touched }) => (
                <>
                  <Form className="flex flex-col gap-2">
                    <label htmlFor="username" className="flex flex-col">
                      <span>Имя пользователя</span>
                      <Field name="username" id="username" className="input-field-special-style w-full" />
                      {touched.username && errors.username ? (
                        <p className="error-label">{errors.username}</p>
                      ) : null}
                    </label>
                    <label htmlFor="username" className="flex flex-col">
                      <span>Адрес электронной почты</span>
                      <Field type="email" name="email" id="email" className="input-field-special-style w-full" />
                      {touched.email && errors.email ? (
                        <p className="error-label">{errors.email}</p>
                      ) : null}
                    </label>
                    <label htmlFor="phone">
                      <span>Контактный телефон</span>
                      <Field name="phone" component={UserPhoneField} />
                    </label>
                    <label htmlFor="password">
                      <span>Пароль</span>
                      <Field type="password" name="password" id="password" className="input-field-special-style w-full" />
                      {touched.password && errors.password ? (
                        <p className="error-label">{errors.password}</p>
                      ) : null}
                    </label>
                    <ul className="list-disc my-4">
                      Пароль должен соответствовать следующим требованиям:
                      <div className="ml-4">
                        <li>
                          Не менее 8 символов
                        </li>
                        <li>
                          Наличие букв в верхнем и нижнем регистре
                        </li>
                        <li>
                          Наличие хотя бы одной цифры и особого символа (@$!%*?&)
                        </li>
                      </div>
                    </ul>
                    <label htmlFor="password">
                      <span>Повторите пароль</span>
                      <Field type="password" name="confirmPassword" id="confirmPassword" className="input-field-special-style w-full" />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <p className="error-label">{errors.confirmPassword}</p>
                      ) : null}
                    </label>
                    <div className="flex flex-col justify-center text-center mt-4">
                      {
                        errorMessage && (
                          <span className="text-red-500">{errorMessage}</span>
                        )
                      }
                      <button
                        type="submit"
                        className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white text-lg rounded-lg cursor-pointer"
                      >
                        Зарегистрироваться
                      </button>
                    </div>
                  </Form>
                  <div className="flex gap-2 justify-center items-center mt-4">
                    <p>Уже есть аккаунт?</p>
                    <Link to="/login" className="underline">Войти</Link>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
