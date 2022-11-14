import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import AddressPanel from '../components/special/AddressPanel';
import WhatsappLink from '../components/special/WhatsappLink';

export default function AboutUs() {
  const [city, setCity] = React.useState('Ярославль');
  const cityButtonsStyle = 'p-2 moving-underline-hover-effect text-gray-500';
  const addresses = [
    {
      id: 0,
      address: <p>150000, Ярославль, Республиканская улица, 75</p>,
      phone: (
        <div className="flex gap-1 flex-col">
          <p>33-50-87 / 99-50-87 / 90-50-87</p>
          <WhatsappLink phoneNumber="8-915-960-81-55" />
        </div>
      ),
      locationLink: 'https://yandex.ru/maps/-/CCUbB6UjdD',
    },
    {
      id: 1,
      address: <p>150000, Ярославль, улица Нахимсона, 23</p>,
      phone: (
        <div className="flex gap-1 flex-col">
          <p>33-95-87</p>
          <WhatsappLink phoneNumber="8-930-114-24-87" />
        </div>
      ),
      locationLink: 'https://yandex.ru/maps/-/CCUbBTf0-A',
    },
    {
      id: 2,
      address: <p>150000, Ярославль, улица Свободы, 21/67</p>,
      phone: (
        <div className="flex gap-1 flex-col">
          <p>33-20-87</p>
          <WhatsappLink phoneNumber="8-980-740-01-01" />
        </div>
      ),
      locationLink: 'https://yandex.ru/maps/-/CCUbBTS0oB',
    },
    {
      id: 3,
      address: <p>150000, Ярославль, улица Собинова, 41</p>,
      phone: (
        <div className="flex gap-1 flex-col">
          <p>97-50-87</p>
          <WhatsappLink phoneNumber="8-910-828-01-01" />
        </div>
      ),
      locationLink: 'https://yandex.ru/maps/-/CCUbBTdSHD',
    },
    {
      id: 4,
      address: <p>123104, Москва, улица Малая Бронная, 16 (М. Пушкинская)</p>,
      phone: (
        <div className="flex gap-1 flex-col">
          <WhatsappLink phoneNumber="+7 (985) 726-44-00" />
        </div>
      ),
      locationLink: 'https://yandex.ru/maps/-/CCUbF4gUDC',
    },
  ];
  const addressesInCurrentCity = addresses.filter((el) => el.address.props.children.includes(city));

  return (
    <div className="min-h-screen text-white flex justify-center">
      <div className="w-11/12 px-4 my-20 h-full text-black ">
        <div className="text-gray-500">
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
          <h1 className="xl:text-4xl md:text-3xl text-2xl mt-14 text-gray-500">Наши салоны</h1>
          <div className="min-h-10 max-h-max text-xl mb-4 flex items-center flex-wrap">
            <span className="whitespace-nowrap">Доступные города: </span>
            <button
              type="button"
              onClick={() => setCity('Ярославль')}
              className={cityButtonsStyle}
              style={{ color: city === 'Ярославль' ? 'green' : '' }}
            >
              Ярославль
            </button>
            <button
              type="button"
              onClick={() => setCity('Москва')}
              className={cityButtonsStyle}
              style={{ color: city === 'Москва' ? 'green' : '' }}
            >
              Москва
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {
            addressesInCurrentCity.length > 0 ? addressesInCurrentCity.map((el) => (
              <AddressPanel
                key={el.id}
                address={el.address}
                phone={el.phone}
                locationLink={el.locationLink}
              />
            )) : (
              <div className="p-2 text-xl flex flex-col justify-center items-center gap-2">
                <h1>Упс, похоже наших салонов в этом городе нет..</h1>
                <FaRegSadTear className="text-[5rem]" />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
