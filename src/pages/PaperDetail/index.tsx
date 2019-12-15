import React from 'react';

import Detail from './components/Detail';
import Cards from './components/Cards';

export default () => {


    return (
        <div style={{ padding: "0 12%" }}>
            <div style={{float: 'left', paddingTop: '3%', width: '65%' }}>
                <Detail />
            </div>
            <Cards style={{ float: 'right', paddingTop: '3rem' }}/>
        </div>
    )
};