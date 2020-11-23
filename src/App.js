import React, { useEffect, useState } from 'react';
import { random } from 'lodash';
import Cookies from 'js-cookie';
import Navigation from './Navigation';
import './App.css';
import { generateUser, updateUser } from './backend/User';
import MainPage from './pages/MainPage';
import SimpleAppBar from './SimpleAppBar';
import history from './history';
import HousePage from './pages/HousePage';
import JobPage from './pages/JobPage';
import LifeStatsPage from './pages/LifeStatsPage';
import InfoSnackbar from './pages/components/InfoSnackbar';
import CarsPage from './pages/CarsPage';
import Person from './backend/Person';
import RelationsPage from './pages/RelationsPage';
import BusinessPage from './pages/BusinessPage';

const MAIN_PAGE = 0;
const JOBS_PAGE = 1;
const HOUSES_PAGE = 2;
const CARRERS_PAGE = 6;
const CARS_PAGE = 3;
const RELATIONS_PAGE = 4;
const FOOD_PAGE = 5;
const BUSINESS_PAGE = 7;

function App() {
  const [year, setYear] = useState(random(1960, 2019));
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(generateUser());

  useEffect(() => {
    // const save = Cookies.getJSON('save');
    // if (save !== undefined && save.user !== undefined) {
    //   // console.log(save.user)
    //   // const newUser = save.user;
    //   // setUser(updateUser(newUser))
    //   // setYear(save.year);
    // } else {
    const newUser = updateUser(user);
    newUser.parents = Person.generateParents(user);
    const howManyBrothers = random(0, 3);
    for (let i = 0; i < howManyBrothers; i += 1) {
      Person.generateSibling(newUser);
    }
    setUser(updateUser(newUser));
    // }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    Cookies.set('save', {
      year, ...Cookies.getJSON('save'),
    }, { expires: Date.now() + 3600 * 1000 });
    // eslint-disable-next-line
  }, [year]);

  const [info, setInfo] = useState('');
  const [color, setColor] = useState('info');

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const nextYear = () => {
    user.nextYear(setInfo, setColor, year);
    setYear(year + 1);
    setUser(updateUser(user));
  };
  const gameOver = () => {
    Cookies.remove('save');
    history.go(0);
  };

  const generateContent = () => {
    if (page === MAIN_PAGE) {
      return <MainPage user={user} year={year} nextYear={nextYear} />;
    }
    if (page === JOBS_PAGE) {
      return (
        <JobPage
          user={user}
          year={year}
          setUser={setUser}
          setPage={setPage}
          setColor={setColor}
          setInfo={setInfo}
        />
      );
    }
    if (page === HOUSES_PAGE) {
      return <HousePage user={user} year={year} setUser={setUser} />;
    }
    if (page === CARS_PAGE) {
      return <CarsPage user={user} setUser={setUser} year={year} />;
    }
    if (page === FOOD_PAGE) {
      return (
        <LifeStatsPage
          user={user}
          year={year}
          setUser={setUser}
          setPage={setPage}
          setInfo={setInfo}
          setColor={setColor}
        />
      );
    }
    if (page === RELATIONS_PAGE) {
      return (
        <RelationsPage
          user={user}
          year={year}
          setUser={setUser}
          setPage={setPage}
          setColor={setColor}
          setInfo={setInfo}
        />
      );
    }
    if (page === BUSINESS_PAGE) {
      return (
        <BusinessPage
          user={user}
          year={year}
          setUser={setUser}
          setPage={setPage}
          setColor={setColor}
          setInfo={setInfo}
        />
      );
    }
    return null;
  };

  return (
    <div className="App">
      <SimpleAppBar user={user} year={year} />
      {generateContent()}
      <Navigation setPage={changePage} page={page} user={user} />
      <InfoSnackbar info={info} setInfo={setInfo} color={color} />
    </div>
  );
}
export default App;
