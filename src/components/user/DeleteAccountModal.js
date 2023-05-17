import React, { useState } from 'react'
import styled from 'styled-components';

import DeleteAccountdecoimage from '../../assets/images/emoji/Icon_Emoji_Kamisato_Ayato_3.webp';
import { UserDelete } from '../../redux/actions/userAction';

const DeleteAccountModalBorder = styled.div`
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    display: ${(props) => props.isDeleteAccount ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: absolute;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.5);
`;

const DeleteAccountDecoImageBox = styled.div`
    width: 500px;
    height: 280px;

    margin-top: 70px;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
`;

const DeleteAccountDecoImage = styled.div`
    width: 100%;
    height: 100%;

    background-image: url(${DeleteAccountdecoimage});
    background-size: 250px 250px;
    background-position: left;
    background-repeat: no-repeat;

    @media screen and (max-width: 300px) {
        background-size: 200px 200px;
    }
`;

const DeleteAccountInnerContents = styled.div`
    width: 530px;
    height: 350px;

    margin-top: -30px;

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

const DeleteAccountTitle = styled.div`
    width: 95%;
    height: 15%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: black;
    font-size: 32px;
`;
const DeleteAccountInfo = styled.div`
    width: 90%;
    height: 45%;

    margin-top: 20px;

    text-align: center;

    color: black;
    font-size: 18px;

    & > input {
        width: 100%;
        height: 40px;

        border: none;
        border-bottom: 1px solid black;
        border-radius: 10px;

        font-size: 18px;
        font-family: 'GIFont';
    };
`;

const DeleteAccountButton = styled.div`
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

export const DeleteAccountModal = ({ isDeleteAccount, navigate, dispatch, userData }) => {

    const [inputPassword, setInputPassword] = useState('');

    const onChange = (event) => {
        setInputPassword(event.target.value);
    };

    const onSubmit = () => {
        if (!inputPassword) {
            alert('비밀번호를 입력해주세요.');
        };

        dispatch(UserDelete(userData.email, inputPassword, navigate));
    };

    return (
        <DeleteAccountModalBorder isDeleteAccount={isDeleteAccount}>
            <DeleteAccountDecoImageBox>
                <DeleteAccountDecoImage />
            </DeleteAccountDecoImageBox>

            <DeleteAccountInnerContents>

                <DeleteAccountTitle>
                    회원탈퇴
                </DeleteAccountTitle>

                <DeleteAccountInfo>
                    <input type='text' id='password' placeholder='계정 삭제를 위해서 사용자 비밀번호를 입력해주세요.' spellCheck='false' onChange={onChange} value={inputPassword} />
                </DeleteAccountInfo>

                <DeleteAccountButton>
                    <button onClick={onSubmit}>탈퇴하기</button>
                </DeleteAccountButton>

            </DeleteAccountInnerContents>
        </DeleteAccountModalBorder>
    );
};
