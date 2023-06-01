import React from 'react'
import styled from 'styled-components';

import TitleIMGsrc from '../assets/images/icon/Element_Pyro.svg';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba( 0, 0, 0, 1 );
    color: white;
`;

const FooterImg = styled.img`
    width: 200px;
    height: 200px;

    margin-top: 30px;

    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
`;
const FooterText = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 24px;

    margin-bottom: 30px;

`;

export const Footer = () => {
    return (
        <BackGround>

            <FooterImg src={TitleIMGsrc} />

            <FooterText>Pyro Blossom</FooterText>

        </BackGround>
    );
};
