import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
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

const passwordInput = styled.input`
    width: 90%;
    height: 50px;

    margin-top: 20px;

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
`;
const InputPassword = styled(passwordInput)``;
const InputRewritePassword = styled(passwordInput)``;

const WarningMassage = styled.div`
    width: 90%;

    font-size: 14px;
    color: red;
`;

const OkMassage = styled.div`
    width: 90%;

    font-size: 14px;
    color: green;
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
            <Input>

                <InputTitle htmlFor='password'>
                    <p>계정을 안전하게 보호할</p>
                    <p>비밀번호를 입력해주세요.</p>
                </InputTitle>

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

                <Script>* 보안을 위해서 비밀번호는 2번 입력해야합니다.</Script>
                <Script>* 두 비밀번호는 반드시 일치하여야합니다.</Script>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </Input>
        </VerifyForm>
    );
};
