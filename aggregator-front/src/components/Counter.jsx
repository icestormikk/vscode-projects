/* eslint-disable no-console */
import React from 'react';
import CountUp from 'react-countup';

export default function Counter() {
  let count = 0;
  return (
    <CountUp
      start={0}
      end={count}
      onEnd={() => console.log('ended')}
      onStart={() => console.log('started')}
      onUpdate={() => console.log('updated')}
    >
      {({ countUpRef, start, update }) => (
        <div>
          <span ref={countUpRef} />
          <button type="button" onClick={start}>Start</button>
          <button type="button" onClick={() => { count += 20; update(count); }}>Update</button>
        </div>
      )}
    </CountUp>
  );
}
