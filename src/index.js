import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Static/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TranslateProvider } from './Static/TranslateContext';
import "./Styles/styles.css"
import MainPage from './MainPage/MainPage';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import LevelPage from './LevelPage/LevelPage';
import interactivePage from './InteractivePage/interactivePage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TranslateProvider>
      <Header />
      <Routes>
        <Route path='/' Component={MainPage} />
        <Route path='/level/:id' Component={LevelPage} />
        <Route path='interactive_games' Component={interactivePage}/>
      </Routes>
    </TranslateProvider>
  </BrowserRouter>

);

