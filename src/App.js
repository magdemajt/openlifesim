import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import logo from './logo.svg';
import { random } from 'lodash';
import './App.css';
import { updateUser, generateUser } from './backend/User';
import MainPage from './pages/MainPage';
import SimpleAppBar from './SimpleAppBar';
import { unemployed, student } from './backend/database';
import history from './history';
import HousePage from './pages/HousePage';
import JobPage from './pages/JobPage';
import LifeStatsPage from './pages/LifeStatsPage';
import InfoSnackbar from './pages/components/InfoSnackbar';
import CarsPage from './pages/CarsPage';
import Person from './backend/Person';
import RelationsPage from './pages/RelationsPage';

const MAIN_PAGE = 0;
const JOBS_PAGE = 1;
const HOUSES_PAGE = 2;
const CARRERS_PAGE = 6;
const CARS_PAGE = 3;
const RELATIONS_PAGE = 4;
const FOOD_PAGE = 5;

function App() {
  const [year, setYear] = useState(random(1960, 2019));
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(generateUser());
  
  useEffect(() => {
    const newUser = updateUser(user);
    const parents = Person.generateParents(user);
    newUser.parents = parents;
    const howManyBrothers = random(0, 3);
    for (let i = 0; i<howManyBrothers; i+=1) {
      Person.generateSibling(newUser)
    }
    setUser(updateUser(newUser))
    //eslint-disable-next-line
  }, []);


  const [info, setInfo] = useState('');
  const [color, setColor] = useState('info');
  
  const changePage = (page) => {
    // if (user.age >= 16) {
      setPage(page);
    // }
  }

  const nextYear = () => {
    user.nextYear(setInfo, setColor, year);
    setYear(year + 1);
    setUser(updateUser(user));
  }
  const gameOver = () => {
    history.go(0);
  }

  const generateContent = () => {
    if (page === MAIN_PAGE) {
      return <MainPage user={user} year={year} nextYear={nextYear} />
    }
    if (page === JOBS_PAGE) {
      return <JobPage user={user} year={year} setUser={setUser} setPage={setPage} setColor={setColor} setInfo={setInfo} />
    }
    if (page === HOUSES_PAGE) {
      return <HousePage user={user} year={year} setUser={setUser} />
    }
    if (page === CARS_PAGE) {
      return <CarsPage user={user} setUser={setUser} year={year} />
    }
    if (page === FOOD_PAGE) {
      return <LifeStatsPage user={user} year={year} setUser={setUser} setPage={setPage} />
    }
    if (page === RELATIONS_PAGE) {
      return <RelationsPage user={user} year={year} setUser={setUser} setPage={setPage} setColor={setColor} setInfo={setInfo} />
    }
    if (page === CARRERS_PAGE) {
      return <RelationsPage user={user} year={year} setUser={setUser} setPage={setPage} setColor={setColor} setInfo={setInfo} />
    }
  };

  return (
    <div className="App">
      <SimpleAppBar user={user} year={year} />
      {generateContent()}
      <Navigation setPage={changePage} page={page} user={user}/>
      <InfoSnackbar info={info} setInfo={setInfo} color={color} />
    </div>
  );
}

export default App;
