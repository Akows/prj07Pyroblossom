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

const InputEmail = styled.input`
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

    /* &:placeholder-shown {
        border-bottom: 2px solid red;
    } */

    /* &:valid {
        border-bottom: 2px solid green;
    }
    &:invalid {
        border-bottom: 2px solid red;
    } */
`;

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


export const RequestEmailVerify = ({ onChange, userData, setIsEmailEntered, setIsPasswordEntered }) => {

    const validatePattern = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = () => {
        if (!isChecked) {
            alert('이메일 주소가 유효하지 않습니다.');
            return;
        }

        setIsEmailEntered(true);
        setIsPasswordEntered(false);
    };

    useEffect(() => {
        setIsChecked(validatePattern.test(userData.email));
    }, [userData.email]);

    return (
        <VerifyForm>
            <Input>

                <InputTitle htmlFor='email'>
                    <p>계정으로 사용할</p>
                    <p>이메일 주소를 입력해주세요.</p>
                </InputTitle>

                <InputEmail type='email' id='email' onChange={onChange} value={userData.email} pattern={validatePattern} placeholder='이메일 주소를 입력해주세요' spellcheck='false' />

                {!userData.email ?
                    <>
                        <WarningMassage>* 이메일 주소를 입력해주세요.</WarningMassage>
                    </>
                    :
                    <>
                        {!isChecked ?
                            <>
                                <WarningMassage>* 유효하지 않은 이메일 주소입니다.</WarningMassage>
                            </>
                            :
                            <>
                                <OkMassage>* 사용가능한 이메일 주소입니다.</OkMassage>
                            </>
                        }
                    </>
                }

                <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </Input>
        </VerifyForm>
    );
};
