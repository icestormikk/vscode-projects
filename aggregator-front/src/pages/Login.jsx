/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/LogoComponent';
import PasswordDescription from '../components/PasswordDescription';
import { userInfoLoginSchema } from '../schemas/userInfoSchema';
import { UsersAPI } from '../services/UserService';
import { login } from '../store/UserInfoSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { message } = state || '';

  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleLogin(values) {
    UsersAPI.verifyUser(values)
      .then((response) => {
        const user = response.data;
        dispatch(login({ user }));
        navigate(state ? state.prev : '/');
      })
      .catch((error) => {
        setErrorMessage(`Не удалось пройти авторизацию: ${error.response ? 'Неверные данные' : 'нет доступа к серверу'}`);
      });
  }

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
              onSubmit={(values) => handleLogin(values)}
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
                    <Field type="password" name="password" id="password" className="input-field-special-style w-full" />
                    {touched.password && errors.password ? (
                      <p className="error-label">{errors.password}</p>
                    ) : null}
                  </label>
                  <PasswordDescription />
                  <div className="flex flex-col justify-center text-center mt-4">
                    {
                      errorMessage && (
                        <span className="text-red-500">{errorMessage}</span>
                      )
                    }
                    <input
                      type="submit"
                      className="w-full p-1 bg-gradient-to-r from-[#029872] to-[#09b68b] text-white mt-10 text-lg rounded-lg cursor-pointer"
                      value="Войти"
                    />
                  </div>
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
