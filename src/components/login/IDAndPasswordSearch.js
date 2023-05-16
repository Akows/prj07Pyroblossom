import React from 'react'
import styled from 'styled-components';

import IDAndPasswordSearchdecoimage1 from '../../assets/images/emoji/Icon_Emoji_010_Amber_Save_me.webp';

const IDAndPasswordSearchModalBorder = styled.div`
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    display: ${(props) => props.isOnSearchModal ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: absolute;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.5);
`;

const IDAndPasswordSearchDecoImageBox = styled.div`
    width: 500px;
    height: 280px;

    margin-top: 70px;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
`;

const IDAndPasswordSearchDecoImage = styled.div`
    width: 100%;
    height: 100%;

    background-image: url(${IDAndPasswordSearchdecoimage1});
    background-size: 300px 300px;
    background-position: left;
    background-repeat: no-repeat;

    @media screen and (max-width: 300px) {
        background-size: 200px 200px;
    }
`;

const IDAndPasswordSearchInnerContents = styled.div`
    width: 600px;
    height: 600px;

    margin-top: -20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
    border-radius: 20px;

    background-color: #d2d2d2;

    opacity: 0.9;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
    @media screen and (max-width: 300px) {
        margin-top: -70px;
    }
`;

const IDAndPasswordSearchTitle = styled.div`
    width: 90%;
    height: 20%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: black;
    font-size: 32px;
`;
const IDAndPasswordSearchInfo = styled.div`
    width: 90%;
    height: 40%;

    color: black;
    font-size: 18px;
`;
const IDAndPasswordSearchButton = styled.div`
    width: 50%;
    height: 60px;

    &:hover {
        color: white;
        background-color: black;
    };

    & > button {
        width: 100%;
        height: 100%;

        border: none;
        border-radius: 10px;

        color: black;
        font-family: 'GIFont';
        font-size: 20px;
    };
`;

export const IDAndPasswordSearch = ({ isOnSearchModal, offSearch }) => {
    return (
        <IDAndPasswordSearchModalBorder isOnSearchModal={isOnSearchModal}>
            <IDAndPasswordSearchDecoImageBox>
                <IDAndPasswordSearchDecoImage />
            </IDAndPasswordSearchDecoImageBox>

            <IDAndPasswordSearchInnerContents>

                <IDAndPasswordSearchTitle>
                    아이디 / 비밀번호 찾기
                </IDAndPasswordSearchTitle>

                <IDAndPasswordSearchInfo>

                </IDAndPasswordSearchInfo>

                <IDAndPasswordSearchButton>
                    <button onClick={offSearch}>확인</button>
                </IDAndPasswordSearchButton>

            </IDAndPasswordSearchInnerContents>
        </IDAndPasswordSearchModalBorder>
    );
};
