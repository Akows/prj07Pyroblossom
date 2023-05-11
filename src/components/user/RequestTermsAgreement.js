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
    height: 100px;

    margin-top: 20px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
`;
const InputEmail = styled.input`
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

    @media screen and (max-width: 500px) {

    }
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
    height: 35px;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 15px;

    &:hover {
        background-color: gray;
    };
`;

const resultMassage = styled.div`
    width: 70%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    font-size: 14px;
`;
const OkMassage = styled(resultMassage)`
    color: green;
`;
const WarningMassage = styled(resultMassage)`
    color: red;
`;

const Script = styled.div`
    width: 95%;
    height: 15px;

    margin-top: 5px;
    margin-bottom: 5px;

    font-size: 12px;
    color: gray;
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
                        <InputEmail type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />

                        <CheckAndResult>
                            <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                            <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                            {/* <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage> */}
                        </CheckAndResult>
                    </FormInput>

                    <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                    <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>

                    <SubmitButton disabled={true}>다음</SubmitButton>


                </InnerContents>


            </FormBorder >

        </BackGround>


    );
};
