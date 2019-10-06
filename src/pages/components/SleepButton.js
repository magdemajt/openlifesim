import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';

export default function SleepButton({ setCanClose, onClick, children, ...props}) {
  const [timeSleep, setTimeSleep] = useState(0);
  
  let currentTime = 5;

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
