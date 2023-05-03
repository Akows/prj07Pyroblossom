import React from 'react'
import styled from 'styled-components';

const VerifyForm = styled.div`
    width: 500px;
    height: 500px;

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

const InputOther = styled.input`
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


export const RequestOtherVerify = ({ onChange, userData, onSubmit }) => {

    return (
        <VerifyForm>
            <Input>

                <InputTitle htmlFor='name'>
                    <p>더 다양한 기능을 사용하기 위해서</p>
                    <p>회원님의 나머지 정보를 입력해주세요.</p>
                </InputTitle>

                <InputOther type='text' id='name' onChange={onChange} value={userData.name} placeholder='사용자 이름을 입력해주세요' spellcheck='false' />

                <InputOther type='text' id='displayName' onChange={onChange} value={userData.displayName} placeholder='사용자 닉네임을 입력해주세요' spellcheck='false' />

                <InputOther type='text' id='address' onChange={onChange} value={userData.address} placeholder='사용자 주소를 입력해주세요' spellcheck='false' />


                <Script>* 사용자 이름과 주소는 팝업 스토어 제품 구매에 필요한 정보입니다.</Script>
                <Script>* 회원 가입 이후 마이 페이지에서 언제든 수정가능합니다.</Script>

                <SubmitButton onClick={onSubmit}>다음</SubmitButton>

            </Input>
        </VerifyForm>
    );
};
