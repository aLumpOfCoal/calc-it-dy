import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ITCFormBuilder from './Features/IncomeTaxCalculator/ITCFormBuilder/ITCFormBuilder';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, ThemeProvider } from '@material-ui/core';
import IncomeTaxCalculator from './Features/IncomeTaxCalculator/IncomeTaxCalculator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
    },
    container: {
      flexGrow: 1,
      alignItems: "center",
    }
  }),
);

function App() {

  const classes = useStyles();

  return (
    // <ThemeProvider>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tax Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed className={classes.container}>
          <IncomeTaxCalculator></IncomeTaxCalculator>
        </Container>
      </div>
    // </ThemeProvider>
  );
}

export default App;
