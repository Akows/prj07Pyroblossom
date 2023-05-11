import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const transformAnimaiton = styled.div`
    transform: translate3d(0, 0, 0);
    transition: all 1s ease;
`;
const FormBorder = styled(transformAnimaiton)`
    width: 450px;
    height: 100%;

    border: 1px solid gray;

    margin-top: 120px;

    @media screen and (max-width: 500px) {
        width: 95%;
        height: 100%;
    }
`;
const InnerContents = styled(transformAnimaiton)`
    width: 100%;
    height: 100%;

    padding: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 500px) {
        padding: 20px;
    }
`;

const FormTitle = styled.label`
    width: 100%;
    height: 70px;

    padding: 5px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 500px) {
        height: 100px;
    }

    & > p {
        font-size: 24px;
        padding: 3px;
    }
`;

const FormInput = styled.div`
    width: 95%;
    height: 100px;

    margin-top: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
`;
const FormInputNoButton = styled.div`
    width: 95%;
    height: 60px;

    margin-top: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 50%;

    border: none;
    border-bottom: 1px solid black;

    font-size: 18px;
    font-family: 'GIFont';

    border-color: ${(props) => props.isEmpty ? 'red' : 'gray'};

    &::placeholder {
        color: ${(props) => props.isEmpty ? 'red' : 'gray'};
    };
`;

const CheckAndResult = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const DuplicationCheckButton = styled.button`
    width: 30%;
    height: 80%;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 15px;

    &:hover {
        background-color: gray;
    };

    @media screen and (max-width: 350px) {
        font-size: 14px;
    }
`;

const InputButton = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;
const Button = styled.button`
    width: 30%;
    height: 80%;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 15px;

    &:hover {
        background-color: gray;
    };

    @media screen and (max-width: 350px) {
        font-size: 14px;
    }
`;


const resultMassage = styled.div`
    width: 70%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    font-size: 14px;

    @media screen and (max-width: 350px) {
        font-size: 12.5px;
    }
`;
const OkMassage = styled(resultMassage)`
    color: green;
`;
const OkMassageNoButton = styled(resultMassage)`
    width: 100%;
    color: green;
`;
const WarningMassage = styled(resultMassage)`
    color: red;
`;
const WarningMassageNoButton = styled(resultMassage)`
    width: 100%;
    color: red;
`;

const FormScript = styled.div`
    width: 95%;
    height: 100%;

    margin-top: 15px;
`;

const Script = styled.p`
    height: 20px;

    font-size: 12px;
    color: gray;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 350px) {
        height: 28px;
    }
`;

const SubmitButton = styled.button`
    width: 95%;
    height: 50px;

    margin-top: 30px;

    border: none;
    border-radius: 10px;

    font-family: 'GIFont';
    font-size: 20px;

    &:hover {
        background-color: gray;
    };
`;

export const RequestOtherVerify = ({ setIsOtherEntered, setIsSignupComplete }) => {

    const onSubmit = (event) => {
        event.preventDefault();

        setIsOtherEntered(true);
        setIsSignupComplete(false);
    };

    return (
        <FormBorder>

            <InnerContents>

                <FormTitle>
                    <p>회원가입 - 기타정보 입력</p>
                </FormTitle>

                <FormInput>
                    <Input type='text' id='displayname' placeholder='닉네임을 입력해주세요' spellcheck='false' />

                    <CheckAndResult>
                        <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                        <OkMassage>사용 가능한 닉네임입니다.</OkMassage>
                        <WarningMassage>사용할 수 없는 닉네임입니다.</WarningMassage>
                    </CheckAndResult>
                </FormInput>

                <FormInputNoButton>
                    <Input type='text' id='name' placeholder='성명을 입력해주세요' spellcheck='false' />
                </FormInputNoButton>

                <FormInput>
                    <Input type='text' id='address' placeholder='자택 주소를 입력해주세요' spellcheck='false' />
                    <Input type='text' id='address2' placeholder='상세 주소를 입력해주세요' spellcheck='false' />

                    <InputButton>
                        <Button>주소입력</Button>
                    </InputButton>
                </FormInput>

                <FormScript>
                    <Script>* 성명과 자택 주소는 팝업 스토어 물건 구매시 이용됩니다.</Script>
                    <Script>* 입력한 개인정보는 가입 이후 마이 페이지에서 조회/수정 가능합니다.</Script>
                </FormScript>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </InnerContents>

        </FormBorder>
    );
};
