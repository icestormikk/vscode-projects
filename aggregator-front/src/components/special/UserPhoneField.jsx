import { getIn } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';

export default function UserPhoneField(props) {
  const {
    field: { name, value },
    form: {
      touched, setFieldValue, errors,
    },
    onChange,
  } = props;

  const isError = getIn(touched, name) && getIn(errors, name);

  const onValueChange = (phoneNumber) => {
    setFieldValue(name, phoneNumber);
    if (onChange !== undefined) {
      onChange(phoneNumber);
    }
  };

  return (
    <label htmlFor={name}>
      <PhoneInput
        placeholder="Введите свой номер телефона"
        name={name}
        value={value}
        onChange={(phone) => onValueChange(phone)}
        specialLabel=""
        country="ru"
        inputClass="text-base h-8 font-light rounded-md border-[1px] border-gray-400"
      />
      <div className="text-red-500 text-sm">
        {isError && getIn(errors, name)}
      </div>
    </label>
  );
}

UserPhoneField.propTypes = {
  field: PropTypes.objectOf(PropTypes.shape).isRequired,
  form: PropTypes.objectOf(PropTypes.shape).isRequired,
  onChange: PropTypes.func,
};

UserPhoneField.defaultProps = {
  onChange: undefined,
};
