import React from 'react';

export default function PasswordDescription() {
  return (
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
  );
}
