import React from 'react';
import useRouter from 'use-react-router';

import Detail from './components/Detail';
import Cards from './components/Cards';

export default () => {
    const { location } = useRouter();

    return (
        <div style={{ padding: "0 12%" }}>
            <div style={{float: 'left', paddingTop: '3%', width: '70%' }}>
                <Detail id={location.pathname.split('/').pop() as string}/>
            </div>
            <Cards style={{ float: 'right', paddingTop: '3rem' }}/>
        </div>
    )
};