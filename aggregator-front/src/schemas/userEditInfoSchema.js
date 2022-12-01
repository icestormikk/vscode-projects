/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const PASSWORD_REGEX = '^$|(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}';
const requiredFieldMessage = 'Поле обязательно для заполнения';

// Minimum eight, at least one uppercase letter,
// one lowercase letter, one number and
// one special character:

export const userEditInfoSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Имя пользователя должна содержать не менее двух символов'),
  lastname: Yup.string()
    .min(2, 'Фамилия пользователя должна содержать не менее двух символов'),
  email: Yup.string()
    .email('Укажите корректный адрес электронной почты'),
  phone: Yup.string()
    .length(11, 'Некорректный формат номера телефона'),
  password: Yup.string()
    .matches(PASSWORD_REGEX, 'Пароль не соответствует требованиям')
    .default(''),
  confirmPassword: Yup.string()
    .when('password', {
      is: '',
      then: (schema) => schema.oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
      otherwise: (schema) => schema.required(requiredFieldMessage).oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
});
