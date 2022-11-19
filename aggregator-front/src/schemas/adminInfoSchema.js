/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const requiredFieldMessage = 'Поле обязательно для заполнения';

export const adminInfoShema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Имя администратора должно содержать не менее двух символов')
    .required(requiredFieldMessage),
  password: Yup.string()
    .min(2, 'Имя администратора должно содержать не менее двух символов')
    .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$', 'Пароль не соответствует формату')
    .required(requiredFieldMessage),
});

// Minimum eight and maximum 10 characters, at least one
// uppercase letter, one lowercase letter, one number and
// one special character:
