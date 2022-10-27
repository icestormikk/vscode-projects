import React from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Loader(props) {
  return (
    <div className='w-full h-full flex flex-col text-secondary-color justify-center items-center'>
      <Triangle
        height={props.height}
        width={props.width || props.height}
        color={props.color}
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1 className={'text-xl text-[' + props.color + ']'}>Загружаем данные. Подождите минутку..</h1>
    </div>
  )
}
