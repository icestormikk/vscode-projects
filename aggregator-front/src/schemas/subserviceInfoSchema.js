/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

const requiredFieldMessage = 'Поле обязательно для заполнения';

export const subserviceInfoSchema = Yup.object().shape({
  title: Yup.string()
    .required(requiredFieldMessage)
    .min(2, 'Название услуги должно содердать минимум 2 символа'),
  description: Yup.string()
    .required(requiredFieldMessage)
    .max(150, 'Описание должно содеражать масимум 150 символов'),
  duration: Yup.number()
    .required(requiredFieldMessage)
    .positive('Поле должно содержать положительное число')
    .integer('Поле должно содержать целое число')
    .max(120, 'Длительность услуги не может составлять более 2 часов'),
  lowerPrice: Yup.number()
    .required(requiredFieldMessage)
    .positive('Поле должно содержать положительное число'),
  topPrice: Yup.number()
    .required(requiredFieldMessage)
    .positive('Поле должно содержать положительное число')
    .when('lowerPrice', (lowerPrice) => Yup.number()
      .min(lowerPrice, 'Поле не может содержать значение меньшее, чем значение в поле "Нижняя граница цены"')
      .typeError('Lower price is required')),
  incompatibleServicesIDs: Yup.array()
    .required(requiredFieldMessage),
});
