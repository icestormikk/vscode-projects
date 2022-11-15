import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 my-20 h-full text-gray-500 flex flex-col justify-center items-center">
        <h1 id="page-title">О нас</h1>
        <div className="xl:text-xl text-lg my-4 flex flex-col lg:w-1/2 gap-4">
          <p>
            <b>Marmalade crew </b>
            предоставляет широкий спектр услуг в области красоты парикмахерские услуги,
            маникюр, педикюр,наращивание ресниц, наращивание волос, кератиновое выпрямление
            волос, мужские стрижки.
          </p>
          <p>
            Обратившись к нам, вы окунетесь в атмосферу уюта и доброжелательности.
            Каждый визит обязательно подарит Вам прекрасное настроение, а наша команда
            профессионалов откроет в вашем стиле что-то новое!
          </p>
          <p>
            Сочетание демократических цен и качества сервиса, внимательное отношение к
            клиентам, уютный интерьер сделают незабываемым пребывание в наших салонах.
          </p>
        </div>
      </div>
    </div>
  );
}
