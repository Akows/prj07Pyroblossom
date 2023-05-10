import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CheckDuplication } from '../../redux/actions/userAction';

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

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

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
    height: 50px;

    margin-top: 20px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 500px) {
        height: 120px;

        margin-top: 10px;
        margin-bottom: 10px;

        flex-direction: column;
        align-items: flex-start;
    }
`;

const InputEmail = styled.input`
    width: 80%;
    height: 100%;

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
        height: 50px;

        font-size: 16px;
        margin-bottom: 10px;
    }
`;
const DuplicationCheckButton = styled.button`
    width: 23%;
    height: 35px;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 15px;

    &:hover {
        background-color: gray;
    };

    @media screen and (max-width: 500px) {
        width: 80px;
        height: 35px;
    }
`;

const OkMassage = styled.div`
    width: 90%;

    margin-bottom: 10px;

    font-size: 14px;
    color: green;
`;

const WarningMassage = styled.div`
    width: 90%;

    margin-bottom: 10px;

    font-size: 14px;
    color: red;
`;

const Script = styled.div`
    width: 90%;
    height: 15px;

    margin-top: 5px;
    margin-bottom: 5px;

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

    @media screen and (max-width: 500px) {
        margin-top: 30px;
    }
`;

export const RequestEmailVerify = ({ onChange, dispatch, userData, getUserState, setIsEmailEntered, setIsPasswordEntered }) => {

    const [isMassageRender, setIsMassageRender] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isValidateChecked, setIsValidateChecked] = useState(false);
    const [isDuplicationChecked, setIsDuplicationChecked] = useState(false);

    const validatePattern = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    const onSubmit = (event) => {
        event.preventDefault();

        if (isEmpty) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!isValidateChecked) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        setIsEmailEntered(true);
        setIsPasswordEntered(false);
    };

    const checkProcess = (event) => {
        event.preventDefault();

        if (!isValidateChecked) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        setIsMassageRender(true);
        dispatch(CheckDuplication(userData.email, 'email'));
    };

    useEffect(() => {
        if (!userData.email) {
            setIsMassageRender(false);
            setIsEmpty(true);
        }
        else {
            setIsEmpty(false);
        }

        setIsValidateChecked(validatePattern.test(userData.email));

        // eslint-disable-next-line
    }, [userData.email]);

    useEffect(() => {
        setIsDuplicationChecked(getUserState.processvalue.isCheck);
        setIsLoading(getUserState.processvalue.isLoading);
        // eslint-disable-next-line
    }, [getUserState]);

    return (
        <VerifyForm>
            <InputArea>

                <Title htmlFor='email'>
                    <p>계정으로 사용할</p>
                    <p>이메일 주소를 입력해주세요.</p>
                </Title>

                <InputForm>
                    <InputEmail type='email' id='email' isEmpty={isEmpty} onChange={onChange} value={userData.email} placeholder='이메일 주소를 입력해주세요' spellcheck='false' />
                    <DuplicationCheckButton onClick={checkProcess}>중복검사</DuplicationCheckButton>
                </InputForm>

                {!isMassageRender ?
                    <></>
                    :
                    <>
                        {isDuplicationChecked ?
                            <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                            :
                            <>
                                {isLoading ?
                                    <></>
                                    :
                                    <>
                                        <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage>
                                    </>
                                }
                            </>
                        }
                    </>
                }

                <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>

                {isDuplicationChecked ?
                    <SubmitButton onClick={onSubmit}>다음</SubmitButton>
                    :
                    <SubmitButton disabled={true}>다음</SubmitButton>
                }

            </InputArea>
        </VerifyForm >
    );
};
