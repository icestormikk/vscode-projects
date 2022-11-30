/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/LogoComponent';
import { userInfoLoginSchema } from '../schemas/userInfoSchema';

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { state } = useLocation();
  const { message } = state || '';

  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 mt-20 h-full text-gray-500">
        <div className="flex justify-center items-center flex-col gap-2">
          {
            message && (
              <span className="text-xl text-red-600 text-center">{message}</span>
            )
          }
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
                password: '',
              }}
              validationSchema={userInfoLoginSchema}
              onSubmit={(values) => console.log(values)}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-2">
                  <label htmlFor="username" className="flex flex-col">
                    <span>E-mail</span>
                    <Field name="username" id="username" className="input-field-special-style w-full" />
                    {touched.username && errors.username ? (
                      <p className="error-label">{errors.username}</p>
                    ) : null}
                  </label>
                  <label htmlFor="password">
                    <p>Пароль</p>
                    <Field name="password" id="password" className="input-field-special-style w-full" />
                    {touched.password && errors.password ? (
                      <p className="error-label">{errors.password}</p>
                    ) : null}
                  </label>
                  <input
                    type="submit"
                    className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white mt-10 text-lg rounded-lg"
                    value="Войти"
                  />
                </Form>
              )}
            </Formik>
            <div className="flex gap-2 justify-center items-center mt-4">
              <p>Нет аккаунта?</p>
              <Link to="/registration" className="underline">Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
