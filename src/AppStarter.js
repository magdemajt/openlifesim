import React from 'react';
import App from './App';
import StartPage from './StartPage';
import { responsiveFontSizes, createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

export default function AppStarter() {
  const [started, setStarted] = React.useState(false);

  let theme = responsiveFontSizes(createMuiTheme({
    palette: {
      text: {
        primary: '#ddd',
        secondary: '#aaa'
      },
      main: '#303030',
      background: {
        default: '#303030',
        paper: '#282828',
      },
      action: {
        disabled: '#aaa'
      }
    }
  }));

  if (started) {

    return (<ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>);
  }
  return <ThemeProvider theme={theme}>
      <CssBaseline />
      <StartPage setStarted={setStarted} />
    </ThemeProvider>

}