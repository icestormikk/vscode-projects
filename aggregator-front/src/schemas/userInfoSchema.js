/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const requiredFieldMessage = 'Поле обязательно для заполнения';
const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

// Minimum eight, at least one uppercase letter,
// one lowercase letter, one number and
// one special character:

export const userInfoRegistrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Имя пользователя должна содержать не менее двух символов')
    .required(requiredFieldMessage),
  lastname: Yup.string()
    .min(2, 'Фамилия пользователя должна содержать не менее двух символов')
    .required(requiredFieldMessage),
  email: Yup.string()
    .email('Укажите корректный адрес электронной почты')
    .required(requiredFieldMessage),
  phone: Yup.string()
    .length(11, 'Некорректный формат номера телефона')
    .required(requiredFieldMessage),
  password: Yup.string()
    .matches(PASSWORD_REGEX, 'Пароль не соответствует требованиям')
    .required(requiredFieldMessage),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required(requiredFieldMessage),
});

export const userInfoLoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Имя администратора должно содержать не менее двух символов')
    .required(requiredFieldMessage),
  password: Yup.string()
    .matches(PASSWORD_REGEX, 'Пароль не соответствует требованиям')
    .required(requiredFieldMessage),
});
