import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const transformAnimaiton = styled.div`
    transform: translate3d(0, 0, 0);
    transition: all 1s ease;
`;
const FormBorder = styled(transformAnimaiton)`
    width: 450px;
    height: 100%;

    border: 1px solid gray;

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
    height: 80px;

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
    height: 80px;

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

export const RequestTermsAgreement = () => {
    return (

        <BackGround>

            <FormBorder>

                <InnerContents>

                    <FormTitle htmlFor='email'>
                        <p>계정으로 사용할</p>
                        <p>이메일 주소를 입력해주세요.</p>
                    </FormTitle>

                    <FormInput>
                        <Input type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />

                        <CheckAndResult>
                            <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                            <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                            {/* <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage> */}
                        </CheckAndResult>
                    </FormInput>

                    <FormInput>
                        <Input type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />

                        <CheckAndResult>
                            <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                            <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                            {/* <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage> */}
                        </CheckAndResult>
                    </FormInput>

                    <FormInputNoButton>
                        <Input type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />
                        <OkMassageNoButton>사용 가능한 이메일 주소입니다.</OkMassageNoButton>
                    </FormInputNoButton>

                    <FormScript>
                        <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                        <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>
                    </FormScript>

                    <SubmitButton disabled={true}>다음</SubmitButton>

                </InnerContents>


            </FormBorder >

        </BackGround>


    );
};
