import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import styled from 'styled-components';

import IDAndPasswordSearchdecoimage1 from '../../../assets/images/emoji/Icon_Emoji_010_Amber_Save_me.webp';
import { userCollectionRef } from '../../../configs/firebase/config';

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

const CloseButton = styled.button`
    width: 30%;

    margin-top: 30px;

    border: none;
    border-radius: 5px;

    font-family: 'GIFont';
    font-size: 20px;
`;

export const IDAndPasswordSearchModal = ({ isOnSearchModal, setIsOnSearchModal }) => {

    const [inputUserDisplayName, setInputUserDisplayName] = useState('');
    const [inputUserEmail, setInputUserEmail] = useState('');
    const [resultEmail, setResultEmail] = useState('결과없음');

    const [isEmailResultRender, setIsEmailResultRender] = useState(false);
    const [isPasswordResultRender, setIsPasswordResultRender] = useState(false);

    const onChange = (event) => {
        if (event.target.id === 'displayname') {
            setInputUserDisplayName(event.target.value);
        };

        if (event.target.id === 'inputemail') {
            setInputUserEmail(event.target.value);
        };
    };

    const searchEmail = () => {

        if (!inputUserDisplayName) {
            alert('값을 입력해주세요.');
            return;
        };

        const process = async () => {
            const docRef = doc(userCollectionRef, inputUserDisplayName);
            const docSnap = await getDoc(docRef);

            return docSnap.data().email;
        };

        process()
            .then((result) => {
                if (result) {
                    setIsEmailResultRender(true);
                    setResultEmail(result);
                };
            })
            .catch(() => {
                setIsEmailResultRender(true);
            });
    };

    const searchPassword = () => {
        const process = async () => {
            const docRef = doc(userCollectionRef, inputUserDisplayName);
            const docSnap = await getDoc(docRef);
            const userEmail = docSnap.data().email;

        };


        console.log(inputUserEmail);
    };

    const reSearch = () => {
        setIsEmailResultRender(false);
        setInputUserDisplayName('');
        setResultEmail('결과없음');
    };

    const onClose = () => {
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

                        {isEmailResultRender ?
                            <>
                                {inputUserDisplayName}님, 귀하의 아이디는 {resultEmail} 입니다.

                                <CloseButton onClick={reSearch}>다시 찾기</CloseButton>
                            </>
                            :
                            <>
                                <p>아이디 찾기</p>

                                <Input type='text' id='displayname' placeholder='사용자 닉네임을 입력해주세요' spellcheck='false' onChange={onChange} value={inputUserDisplayName} />

                                <IDAndPasswordSearchButton>
                                    <button onClick={searchEmail}>아이디 찾기</button>
                                </IDAndPasswordSearchButton>
                            </>
                        }
                    </IDSearch>

                    <PWDSearch>
                        <p>비밀번호 찾기</p>

                        <Input type='text' id='displayname' placeholder='사용자 닉네임을 입력해주세요' spellcheck='false' onChange={onChange} value={inputUserDisplayName} />
                        <Input type='text' id='inputemail' placeholder='사용자 이메일을 입력해주세요' spellcheck='false' onChange={onChange} value={inputUserEmail} />

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
