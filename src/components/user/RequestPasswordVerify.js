import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const VerifyForm = styled.div`
    width: 500px;
    height: 400px;

    border: 1px solid gray;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;
`;

const Input = styled.div`
    width: 100%;
    height: 100%;

    padding: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 880px) {
        width: 400px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }

    @media screen and (max-width: 500px) {
        width: 300px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }

    @media screen and (max-width: 400px) {
        width: 250px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }
`;

const InputTitle = styled.label`
    width: 95%;
    height: 80px;

    padding: 5px;

    /* border: 1px solid red; */

    text-align: left;

    & > p {
        font-size: 24px;

        padding: 3px;
    }
`;

const InputPassword = styled.input`
    width: 90%;
    height: 50px;

    margin-top: 20px;

    border: none;
    border-bottom: 1px solid black;

    font-size: 18px;
    font-family: 'GIFont';

    &:focus {
        border-bottom: 1px solid gray;
    };
`;

const Script = styled.div`
    width: 90%;
    height: 15px;

    margin-top: 5px;

    font-size: 11px;
    color: gray;
`;

const SubmitButton = styled.button`
    width: 90%;
    height: 50px;

    margin-top: 50px;

    border: none;
    border-radius: 10px;

    font-family: 'GIFont';
    font-size: 20px;

    &:hover {
        background-color: gray;
    };
`;


export const RequestPasswordVerify = ({ onChange, userData, setIsPasswordEntered, setIsOtherEntered }) => {

    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPasswordRight, setIsPasswordRight] = useState(false);

    const onChangeCheck = (event) => {
        setPasswordCheck(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (isPasswordRight) {
            setIsPasswordEntered(true);
            setIsOtherEntered(false);
        }
        else {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
    };

    useEffect(() => {
        if (userData.password !== passwordCheck) {
            setIsPasswordRight(false);
            return;
        }
        else {
            setIsPasswordRight(true);
        };
        // eslint-disable-next-line
    }, [passwordCheck]);


    return (
        <VerifyForm>
            <Input>

                <InputTitle htmlFor='password'>
                    <p>계정을 안전하게 보호할</p>
                    <p>비밀번호를 입력해주세요.</p>
                </InputTitle>

                <InputPassword type='text' id='password' onChange={onChange} value={userData.password} placeholder='비밀번호를 입력해주세요' spellcheck='false' />

                <InputPassword type='text' id='passwordCheck' onChange={onChangeCheck} value={passwordCheck} placeholder='비밀번호를 한번 더 입력해주세요' spellcheck='false' />

                <Script>* 보안을 위해서 비밀번호는 2번 입력해야합니다.</Script>
                <Script>* 두 비밀번호는 반드시 일치하여야합니다.</Script>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </Input>
        </VerifyForm>
    );
};
