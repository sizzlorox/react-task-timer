import React, { useState, useEffect, useContext } from 'react';
import TasksContext from '../../stores/tasks/tasksContext';

const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const pad = (digit) => digit < 10 ? '0' + digit : '' + digit;

const Timer = ({ tasks }) => {
  const dispatch = useContext(TasksContext);

  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [hours, setHours] = useState('00');

  const [timer, setTimer] = useState();
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [taskName, setTaskName] = useState();

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

  const getNavigatorLanguage = () => {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
  };

  const _start = () => {
    if (!started || paused) {
      setStarted(true);
      setPaused(false);
    }
    if (started && !paused) {
      setStarted(false);
      setPaused(true);
    }
  };
  const _reset = () => {
    if (started || paused) {
      setStarted(false);
      setPaused(false);
      setSeconds('00');
      setMinutes('00');
      setHours('00');
      setElapsed(0);
      clearInterval(timer);
    }
  };
  const _save = () => {
    dispatch({
      type: 'ADD',
      value: tasks.concat([{
        name: taskName.trim(),
        time: `${hours}:${minutes}:${seconds}`,
        date: new Date().toLocaleString(getNavigatorLanguage()),
      }]),
    });

    _reset();
  };

  return (
    <div className="timer-container">
      <div className="controls-container">
        <div className="controls">
          <button onClick={_start}>&#9199;</button>
          <button disabled={elapsed === 0} onClick={_reset}>Reset</button>
        </div>
        {
          paused
            ? (
              <div className="actions">
                <input onChange={e => setTaskName(e.target.value)}/>
                <button disabled={!taskName} onClick={_save}>Save</button>
              </div>
            )
            : null
        }
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
