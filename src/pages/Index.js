import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { logIn, logOut } from '../redux/actions/userAction'

export const Index = () => {

    const IndexBackGround = styled.div`

        width: 1200px;
        height: 100%;

        background-color: antiquewhite;

        font-size: 72px;
        font-weight: 500;

        @media screen and (max-width: 1200px) {
            width: 95%;
            background-color: red;
        }
    `;


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
        <IndexBackGround>
            다람쥐

            <button onClick={onClick}>로그인버튼</button>
            <button onClick={onClick2}>로그아웃버튼</button>
        </IndexBackGround>
    )
}
