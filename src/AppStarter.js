import React from 'react';
import App from './App';
import StartPage from './StartPage';

export default function AppStarter() {
  const [started, setStarted] = React.useState(false);

  if (started) {
    return <App />
  }
  return <StartPage setStarted={setStarted} />

}