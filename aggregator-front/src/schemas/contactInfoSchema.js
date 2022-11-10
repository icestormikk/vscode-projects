/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const requiredFieldMessage = 'Поле обязательно для заполнения';

export const ContactInfoSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Имя должно состоять из не менее, чем 2-ух символов')
    .required(requiredFieldMessage),
  lastname: Yup.string()
    .min(2, 'Фамилия должна состоять из не менее, чем 2-ух символов')
    .required(requiredFieldMessage),
  phone: Yup.string()
    .length(11, 'Некорректный формат номера телефона')
    .required(requiredFieldMessage),
});
