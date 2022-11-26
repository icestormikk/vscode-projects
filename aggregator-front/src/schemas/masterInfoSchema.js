/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const requiredFieldMessage = 'Поле обязательно для заполнения';

export const masterInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required(requiredFieldMessage)
    .min(2, 'Поле должно содержать минимум 2 символа'),
  surname: Yup.string()
    .required(requiredFieldMessage)
    .min(2, 'Поле должно содержать минимум 2 символа'),
  professionTitle: Yup.string()
    .required(requiredFieldMessage),
  phone: Yup.string()
    .length(11, 'Некорректный формат номера телефона')
    .required(requiredFieldMessage),
  email: Yup.string()
    .required(requiredFieldMessage)
    .email('Неверный формат'),
  providedServiceIDs: Yup.array()
    .required(requiredFieldMessage),
  availableDates: Yup.array()
    .required(requiredFieldMessage),
});
