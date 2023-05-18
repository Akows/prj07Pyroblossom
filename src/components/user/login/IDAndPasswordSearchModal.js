import React, { useState } from 'react'
import styled from 'styled-components';

import { appAuth } from '../../../configs/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

import IDAndPasswordSearchdecoimage1 from '../../../assets/images/emoji/Icon_Emoji_010_Amber_Save_me.webp';

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
    height: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: black;
    font-size: 32px;
`;
const IDAndPasswordSearchInfo = styled.div`
    width: 90%;
    height: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: black;
    font-size: 18px;
`;

const IDSearch = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const PWDSearch = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Input = styled.input`
    width: 90%;
    height: 30px;

    margin-top: 3px;

    border: none;
    border-radius: 10px;

    font-size: 18px;
    font-family: 'GIFont';
`;

const IDAndPasswordSearchButton = styled.div`
    width: 30%;
    height: 50px;

    margin-top: 15px;

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

export const IDAndPasswordSearchModal = ({ isOnSearchModal, setIsOnSearchModal }) => {

    const [inputUserEmail, setInputUserEmail] = useState('');
    const [inputUserDisplayName, setInputUserDisplayName] = useState('');

    const onChange = (event) => {
        if (event.target.id === 'email') {
            setInputUserEmail(event.target.value);
        };

        if (event.target.id === 'displayname') {
            setInputUserDisplayName(event.target.value);
        };
    };

    const searchPassword = () => {
        if (!inputUserEmail || !inputUserDisplayName) {
            alert('모든 값을 입력해주세요.');
        };

        sendPasswordResetEmail(appAuth, inputUserEmail)
            .then(() => {
                alert('비밀번호 재설정 이메일이 발송되었습니다.');
                setInputUserEmail('');
                setInputUserDisplayName('');
                setIsOnSearchModal(false);
            })
            .catch((error) => {
                alert('에러가 발생했습니다.');
                setInputUserEmail('');
                setInputUserDisplayName('');
                setIsOnSearchModal(false);
            });
    };

    const onClose = () => {
        setInputUserEmail('');
        setInputUserDisplayName('');
        setIsOnSearchModal(false);
    };

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

                    <IDSearch>

                        <p>아이디 찾기</p>

                    </IDSearch>

                    <PWDSearch>
                        <p>비밀번호 찾기</p>

                        <Input type='text' id='email' placeholder='사용자 이메일을 입력해주세요' spellcheck='false' onChange={onChange} value={inputUserEmail} />
                        <Input type='text' id='displayname' placeholder='사용자 닉네임을 입력해주세요' spellcheck='false' onChange={onChange} value={inputUserDisplayName} />

                        <IDAndPasswordSearchButton>
                            <button onClick={searchPassword}>비밀번호 재설정</button>
                        </IDAndPasswordSearchButton>

                    </PWDSearch>

                    <IDAndPasswordSearchButton>
                        <button onClick={onClose}>닫기</button>
                    </IDAndPasswordSearchButton>

                </IDAndPasswordSearchInfo>

            </IDAndPasswordSearchInnerContents>
        </IDAndPasswordSearchModalBorder>
    );
};
