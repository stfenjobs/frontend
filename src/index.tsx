import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages';

// import api from './api';

// api.user.register({ email: 'aaabbbb', password: '1234', userName: 'name'}).then(response => {
//     console.log(response);
// }).catch(err => console.log(err));

ReactDOM.render(<App />, document.getElementById('root'));
