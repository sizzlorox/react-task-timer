import React, { useState, useEffect } from 'react';

const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const pad = (digit) => digit < 10 ? '0' + digit : '' + digit;

const Timer = () => {
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [hours, setHours] = useState('00');

  const [timer, setTimer] = useState();
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  const _start = () => {
    if (!started) {
      setStarted(true);
      setPaused(false);
    }
  };
  const _pause = () => {
    setStarted(false);
    setPaused(true);
  }
  const _stop = () => {
    if (started || paused) {
      setStarted(false);
      setPaused(false);
      setSeconds('00');
      setMinutes('00');
      setHours('00');
      setElapsed(0);
      clearInterval(timer);
    }
  }

  useEffect(() => {
    setTimer(setTimeout(() => {
      if (started && !paused) {
        setElapsed((previous) => previous + 1);
        setSeconds(() => pad(elapsed % 60));
        setMinutes(() => pad(Math.floor(elapsed / 60) % 60));
        setHours(() => pad(Math.floor(elapsed / 3600) % 60));
      }
    }, 1000));
  }, [started, elapsed]);

  return (
    <div className="timer-container">
      <div className="controls-container">
        <button onClick={_start}>Start</button>
        <button onClick={_pause}>Pause</button>
        <button onClick={_stop}>Stop</button>
      </div>
      <div className="display-container">
        <div className="clock">
          <span className={
            hours
              ?
              `digit ${digits[hours.charAt(0)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
          <span className={
            hours
              ?
              `digit ${digits[hours.charAt(1)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
          <span className="colon" />
          <span className={
            minutes
              ?
              `digit ${digits[minutes.charAt(0)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
          <span className={
            minutes
              ?
              `digit ${digits[minutes.charAt(1)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
          <span className="colon" />
          <span className={
            seconds
              ?
              `digit ${digits[seconds.charAt(0)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
          <span className={
            seconds
              ?
              `digit ${digits[seconds.charAt(1)]} ${paused ? 'blink' : ''}`
              :
              'digit'
          } />
        </div>
      </div>
    </div>
  );
};
export default Timer;
