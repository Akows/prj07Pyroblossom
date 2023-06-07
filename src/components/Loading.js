import React from 'react'
import styled from 'styled-components';

import loading from '../assets/images/background/loading.gif';

const BackGround = styled.div`
    width: 100%;
    height: 100%;
    
    position: fixed;

    top: 0;
    left: 0;

    z-index: 999;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: rgba( 65, 71, 89, 0.8 );

    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;


    & > img {
        opacity: 0.8;
    };
    & > p {
        font-size: 64px;
    };
`;

export const Loading = () => {

    return (
        <BackGround>
            <img src={loading} alt='' />
            <p>Loading...</p>
        </BackGround>
    );
};
