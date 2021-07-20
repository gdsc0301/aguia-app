import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Index from './pages';
import reportWebVitals from './reportWebVitals';
import "@fontsource/roboto";

import Header from "./parts/Header";

const url = window.location.pathname.slice(-1) === "/" ? window.location.pathname : window.location.pathname +"/";
const filePath = `./pages${url}index.js`;

var Page = undefined;
import(filePath+"").then(obj => {
    Page = obj.default;
    load();
}).catch((obj)=>{
    Page = Index;
    load();
});

function load() {
    ReactDOM.render(
        <React.StrictMode>
            <Header />
            <Page />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// ReactDOM.render(
//     <React.StrictMode>
//         <Header />
//         <Typography variant="h1">Bem vindo</Typography>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
