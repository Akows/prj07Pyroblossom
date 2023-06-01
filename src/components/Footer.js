import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 100%;
    height: 300px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba( 0, 0, 0, 1 );
    color: white;
`;

export const Footer = () => {
    return (
        <BackGround>
            Footer
        </BackGround>
    );
};
