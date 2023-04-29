import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

// const { logIn } = require('../redux/actions/userAction');

import { logIn, logOut } from '../redux/actions/userAction'

export const Index = () => {

    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(logIn({
            id: 'LEE',
            password: 'PWD',
        }));
        // eslint-disable-next-line    
    }, []);

    const onClick2 = useCallback(() => {
        dispatch(logOut());
        // eslint-disable-next-line    
    }, []);


    return (
        <div>
            Index

            <button onClick={onClick}>로그인버튼</button>
            <button onClick={onClick2}>로그아웃버튼</button>
        </div>
    )
}
