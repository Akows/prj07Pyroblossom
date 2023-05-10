import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const VerifyForm = styled.div`
    width: 500px;
    height: 400px;

    border: 1px solid gray;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 500px) {
        width: 95%;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }
`;

const InputArea = styled.div`
    width: 100%;
    height: 100%;

    padding: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 500px) {
        padding: 20px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }
`;

const Title = styled.label`
    width: 95%;
    height: 80px;

    padding: 5px;

    text-align: left;

    & > p {
        font-size: 24px;
        padding: 3px;

        @media screen and (max-width: 500px) {
            font-size: 20px;
            padding: 2px;
        }
    }
`;

const InputForm = styled.div`
    width: 95%;
    height: 120px;

    margin-top: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 500px) {
        height: 120px;

        margin-top: 10px;
        margin-bottom: 10px;

        align-items: flex-start;
    }
`;


const passwordInput = styled.input`
    width: 100%;
    height: 50%;

    border: none;
    border-bottom: 1px solid black;

    font-size: 18px;
    font-family: 'GIFont';

    border-color: ${(props) => props.isEmpty ? 'red' : 'gray'};

    &:focus {
        border-bottom: 1px solid gray;
    };
    &::placeholder {
        color: ${(props) => props.isEmpty ? 'red' : 'gray'};
    };
    @media screen and (max-width: 500px) {
        width: 100%;
        height: 50%;

        font-size: 16px;
        margin-bottom: 10px;
    }
`;
const InputPassword = styled(passwordInput)``;
const InputRewritePassword = styled(passwordInput)``;

const WarningMassage = styled.div`
    width: 100%;

    font-size: 14px;
    color: red;
`;

const OkMassage = styled.div`
    width: 100%;

    font-size: 14px;
    color: green;
`;

const Script = styled.div`
    width: 90%;
    height: 15px;

    margin-top: 5px;

    font-size: 11px;
    color: gray;

    @media screen and (max-width: 400px) {
        margin-top: 10px;
    }
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
    @media screen and (max-width: 500px) {
        width: 80%;
        height: 35px;
    }
`;


export const RequestPasswordVerify = ({ onChange, userData, setIsPasswordEntered, setIsOtherEntered }) => {

    const dispatch = useDispatch();

    const [passwordRewrite, setPasswordRewrite] = useState('');

    const [isMassageRender1, setIsMassageRender1] = useState(false);
    const [isMassageRender2, setIsMassageRender2] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);
    const [isRewriteEmpty, setIsRewriteEmpty] = useState(false);
    const [isValidateChecked, setIsValidateChecked] = useState(false);
    const [isRewriteChecked, setIsRewriteChecked] = useState(false);

    const validatePattern = new RegExp('[0-9]');

    const onChangeCheck = (event) => {
        setPasswordRewrite(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'PROCESSINIT' });
        dispatch({ type: 'LOADING' });

        if (isEmpty && isRewriteEmpty) {
            setIsEmpty(true);
            setIsRewriteEmpty(true);
            return;
        }
        else {
            if (!userData.password) {
                setIsEmpty(true);
                return;
            }

            if (!passwordRewrite) {
                setIsRewriteEmpty(true);
                return;
            };
        }

        if (!isValidateChecked) {
            alert('유효한 비밀번호를 입력해주세요.');
            return;
        }

        if (!isRewriteChecked) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        dispatch({ type: 'CHECK_SUCCESS' });

        setIsPasswordEntered(true);
        setIsOtherEntered(false);
    };

    useEffect(() => {
        if (!userData.password) {
            setIsMassageRender1(true);
        }
        else {
            setIsMassageRender1(false);
        }

        if (!passwordRewrite) {
            setIsMassageRender2(true);
        }
        else {
            setIsMassageRender2(false);
        }

        setIsRewriteChecked(userData.password === passwordRewrite);
        setIsValidateChecked(validatePattern.test(userData.password));

        // eslint-disable-next-line
    }, [userData.password, passwordRewrite]);


    return (
        <VerifyForm>
            <InputArea>

                <Title htmlFor='password'>
                    <p>계정을 안전하게 보호할</p>
                    <p>비밀번호를 입력해주세요.</p>
                </Title>

                <InputForm>
                    <InputPassword type='text' id='password' isEmpty={isEmpty} onChange={onChange} value={userData.password} placeholder='비밀번호를 입력해주세요' spellcheck='false' />
                    {!isMassageRender1 ?
                        <>
                            {!isValidateChecked ?
                                <WarningMassage>유효하지 않은 비밀번호입니다.</WarningMassage>
                                :
                                <OkMassage>유효한 비밀번호입니다.</OkMassage>
                            }
                        </>
                        :
                        <>

                        </>
                    }

                    <InputRewritePassword type='text' id='passwordCheck' isEmpty={isRewriteEmpty} onChange={onChangeCheck} value={passwordRewrite} placeholder='비밀번호를 한번 더 입력해주세요' spellcheck='false' />
                    {!isMassageRender2 ?
                        <>
                            {!isRewriteChecked ?
                                <WarningMassage>비밀번호가 일치하지 않습니다.</WarningMassage>
                                :
                                <OkMassage>비밀번호가 일치합니다.</OkMassage>
                            }
                        </>
                        :
                        <>

                        </>
                    }
                </InputForm>



                <Script>* 보안을 위해서 비밀번호는 2번 입력해야합니다.</Script>
                <Script>* 두 비밀번호는 반드시 일치하여야합니다.</Script>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </InputArea>
        </VerifyForm>
    );
};
