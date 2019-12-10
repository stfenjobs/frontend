import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages';

import api from './api';

console.log('11');
api.user.login({ email: 'czr.cn.525@gmail.com', cipher: '1243453254' }).then(response => {
    console.log(response);
}).catch(err => console.log(err));


ReactDOM.render(<App />, document.getElementById('root'));
