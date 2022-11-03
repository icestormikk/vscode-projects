/* eslint-disable no-console */
import React from 'react';
import MastersChoise from '../components/special/MastersChoise';

export default function OrderRegistration() {
  const [isMastersCompleted, setMastersCompleted] = React.useState(false);

  return (
    !isMastersCompleted ? (
      <div className="min-h-screen text-black flex justify-center">
        <MastersChoise mastersCompletedController={setMastersCompleted} />
      </div>
    ) : (
      <h1>Masters Stage completed</h1>
    )
  );
}
