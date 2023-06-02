import React from 'react'
import styled from 'styled-components';

import infoimg1 from '../../../assets/images/testImg/test1.jpg';
import infoimg2 from '../../../assets/images/testImg/test2.jpg';
import infoimg3 from '../../../assets/images/testImg/test3.jpg';
import infoimg4 from '../../../assets/images/testImg/test4.jpg';
import infoimg5 from '../../../assets/images/testImg/test5.jpg';
import infoimg6 from '../../../assets/images/testImg/test6.jpg';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
        width: 60%;
        height: 100%;

        @media screen and (max-width: 1000px) {
            width: 90%;
        };
    };
`;

export const ProductInfomation = () => {
    return (
        <BackGround>
            <img src={infoimg1} alt='' />
            <img src={infoimg2} alt='' />
            <img src={infoimg3} alt='' />
            <img src={infoimg4} alt='' />
            <img src={infoimg5} alt='' />
            <img src={infoimg6} alt='' />
        </BackGround>
    );
};
