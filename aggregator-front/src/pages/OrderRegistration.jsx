/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import MastersChoise from '../components/special/MastersChoise';

export default function OrderRegistration() {
  const selectedSubservices = useSelector((state) => state.shoppingCart.selectedSubservices);
  const [isMastersCompleted, setMastersCompleted] = React.useState(false);

  return (
    !isMastersCompleted ? (
      <div className="min-h-screen text-black flex justify-center">
        <MastersChoise
          mastersCompletedController={setMastersCompleted}
          selectedSubservices={selectedSubservices}
        />
      </div>
    ) : (
      <h1>Masters Stage completed</h1>
    )
  );
}
