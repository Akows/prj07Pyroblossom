import React, { useState } from 'react'
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
const FormShowTerms = styled.div`
    width: 100%;
    height: 300px;

    padding: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 350px) {
        margin-bottom: 50px;
    }
`;

const TermsTitle = styled.div`
    width: 100%;
    height: 10%;

    font-size: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const TermsText = styled.div`
    width: 100%;
    height: 90%;

    & > p {
        font-size: 15px;
        padding: 3px;
    }
`;


const FormInputSmall = styled.div`
    width: 95%;
    height: 25px;

    margin-top: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
`;
const InputCheckbox = styled.input`
    width: 10%;
    height: 90%;

    font-size: 18px;
    font-family: 'GIFont';
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

export const RequestTermsAgreement = ({ setIsTermsAgreement, setIsEmailAndPasswordEntered }) => {

    const [isAgreement, setIsAgreement] = useState(false);

    const onCheck = (event) => {
        if (event.target.checked) {
            setIsAgreement(true);
        }
        else {
            setIsAgreement(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!isAgreement) {
            alert('약관 동의가 필요합니다.');
            return;
        }

        setIsTermsAgreement(true);
        setIsEmailAndPasswordEntered(false);
    };

    return (
        <FormBorder>

            <InnerContents>

                <FormTitle>
                    <p>회원가입 - 약관 동의</p>
                </FormTitle>

                <FormShowTerms>

                    <TermsTitle>
                        개인정보 처리방침
                    </TermsTitle>

                    <TermsText>
                        <p>Apple 개인정보 처리방침에는 Apple이 고객의 개인 데이터를 수집, 사용 및 공유하는 방법이 설명되어 있습니다.</p>
                        <p>개인정보 처리방침 외에도 Apple에서는 제품에 내장된 데이터 및 개인 정보 보호와 관련된 정보와 개인 데이터 사용을 요청하는 특정 기능에 관한 정보를 제공합니다. 제품별 정보에는 데이터 및 개인 정보 보호 아이콘이 표시됩니다.</p>
                        <p>해당 기능을 사용하기 전에 제품별 정보를 검토할 수 있는 기회가 제공됩니다. 이 정보는 언제든지 해당 기능의 설정에서 또는 온라인으로는 apple.com/kr/legal/privacy/data에서 확인할 수 있습니다. </p>
                    </TermsText>

                </FormShowTerms>

                <FormInputSmall>
                    <InputCheckbox value={isAgreement} onChange={onCheck} type='checkbox' id='isAgreement' /> 당 홈페이지의 개인정보 처리방침에 따라 개인 정보를 수집, 사용 및 처리하는 데 동의합니다.
                </FormInputSmall>

                <FormScript>
                    <Script>* 약관 동의</Script>
                </FormScript>

                <SubmitButton onClick={onSubmit}>다음으로</SubmitButton>

            </InnerContents>

        </FormBorder>
    );
};
