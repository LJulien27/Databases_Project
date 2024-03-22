import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import pg from 'pg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const client = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'super',
  database: 'postgres'
  })
  await client.connect()
  const res = await
  client.query('SELECT * FROM laboratories.artist;')
  console.log(res.rows)
  await client.end()
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
