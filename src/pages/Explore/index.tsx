import React from 'react';

import useUserModel from '../../models/userModel';


export default () => {
    const { id, token } = useUserModel();

    return (
        <div>{`id: ${id} token: ${token}`}</div>
    );
};
