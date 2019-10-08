import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';

export default function SleepButton({ setCanClose, canClose, onClick, children, ...props}) {
  const [timeSleep, setTimeSleep] = useState(0);

  useEffect(() => {
    let interval = null;
    const decreaseTimeSleepOrCanClose = () => {
      if (timeSleep > 0) {
        interval = setTimeout(function () {
          setTimeSleep(timeSleep - 1);
        }, 1000);
      } else {
        setCanClose(true);
      }
    }

    decreaseTimeSleepOrCanClose();
    // eslint-disable-next-line
  }, [timeSleep]);
  useEffect(() => {
    if (canClose && timeSleep > 0) {
      setCanClose(false);
    }
    // eslint-disable-next-line
  }, [canClose])

  const onClickSleep = (e) => {
    if (timeSleep === 0) {
      onClick(e);
      setTimeSleep(5);
      setCanClose(false);
    }
  }
  
  return (
      <Button onClick={onClickSleep} disabled={timeSleep > 0} {...props}>
        {timeSleep > 0 ? timeSleep + 's' : children}
      </Button>
  );
}
