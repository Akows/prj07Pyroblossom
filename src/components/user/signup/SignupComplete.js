import React from 'react'
import { useNavigate } from 'react-router-dom';
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

export const SignupComplete = ({ userData, getUserState }) => {

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        navigate('/', { replace: true });
    };

    return (
        <>
            <FormBorder>

                <InnerContents>

                    <FormTitle>
                        <p>회원가입 완료!</p>
                    </FormTitle>

                    <FormScript>
                        사용자 이메일 : {userData.email}<br />
                        사용자 비밀번호 : {userData.password}<br />
                        사용자 성명 : {userData.name}<br />
                        사용자 닉네임 : {userData.displayname}<br />
                        사용자 주소 : {userData.address}<br />
                        <Script>* 가입 완료와 동시에 이메일 인증 메일이 발송됩니다.</Script>
                        <Script>* 본 홈페이지의 모든 기능을 경험하기 위해서는 이메일 인증이 완료되어야합니다.</Script>
                        <Script>* 이메일 인증 여부는 로그인 {'>'} 마이 페이지에서 확인가능합니다. </Script>
                    </FormScript>

                    <SubmitButton onClick={onSubmit}>완료</SubmitButton>

                </InnerContents>

            </FormBorder>
        </>
    );
};
