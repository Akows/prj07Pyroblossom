import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CheckDuplication, SignUp } from '../../redux/actions/userAction';

const VerifyForm = styled.div`
    width: 500px;
    height: 500px;

    border: 1px solid gray;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 500px) {
        width: 95%;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }
`;

const Input = styled.div`
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

const InputTitle = styled.label`
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
    height: 180px;

    margin-top: 20px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    
    @media screen and (max-width: 500px) {
        height: 180px;

        margin-top: 10px;
        margin-bottom: 10px;
    }
`;


const InputOther = styled.input`
    width: 100%;
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

const DuplicationCheckButton = styled.button`
    width: 100px;
    height: 40px;

    border: none;
    border-radius: 10px;

    margin-top: 5px;

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
    width: 100%;
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
`;


export const RequestOtherVerify = ({ onChange, dispatch, userData, getUserState, setIsOtherEntered }) => {

    const navigate = useNavigate();

    const [isDuplicationChecked, setIsDuplicationChecked] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isMassageRender1, setIsMassageRender1] = useState(false);
    // const [isMassageRender2, setIsMassageRender2] = useState(false);
    // const [isMassageRender3, setIsMassageRender3] = useState(false);

    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isDisplayName, setIsDisplayName] = useState(false);
    const [isAddressEmpty, setIsAddressEmpty] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        if (!userData.displayName) {
            setIsDisplayName(true);
            return;
        }
        if (!userData.name) {
            setIsNameEmpty(true);
            return;
        }
        if (!userData.address) {
            setIsAddressEmpty(true);
            return;
        }

        setIsOtherEntered(true);
        dispatch(SignUp(userData, navigate));
    };

    const checkProcess = (event) => {
        event.preventDefault();
        setIsMassageRender1(true);
        dispatch(CheckDuplication(userData.displayName, 'displayName'));
    };

    const needDuplicationCheck = (event) => {
        event.preventDefault();
        alert('닉네임 중복검사를 해야합니다.');
    };

    useEffect(() => {
        if (!userData.displayName) {
            setIsMassageRender1(false);
        }

        // eslint-disable-next-line
    }, [userData.displayName]);

    useEffect(() => {
        setIsDuplicationChecked(getUserState.processvalue.isCheck);
        setIsLoading(getUserState.processvalue.isLoading);
        // eslint-disable-next-line
    }, [getUserState]);

    return (
        <VerifyForm>
            <Input>

                <InputTitle htmlFor='name'>
                    <p>더 다양한 기능을 사용하기 위해서</p>
                    <p>회원님의 나머지 정보를 입력해주세요.</p>
                </InputTitle>

                <InputForm>

                    <InputOther type='text' id='displayName' isEmpty={isDisplayName} onChange={onChange} value={userData.displayName} placeholder='사용자 닉네임을 입력해주세요' spellcheck='false' />
                    <DuplicationCheckButton onClick={checkProcess}>중복검사</DuplicationCheckButton>

                    {!isMassageRender1 ?
                        <></>
                        :
                        <>
                            {isDuplicationChecked ?
                                <OkMassage>사용 가능한 닉네임입니다.</OkMassage>
                                :
                                <>
                                    {isLoading ?
                                        <></>
                                        :
                                        <>
                                            <WarningMassage>사용할 수 없는 닉네임입니다.</WarningMassage>
                                        </>
                                    }
                                </>

                            }
                        </>
                    }

                    <InputOther type='text' id='name' isEmpty={isNameEmpty} onChange={onChange} value={userData.name} placeholder='사용자 이름을 입력해주세요' spellcheck='false' />
                    <InputOther type='text' id='address' isEmpty={isAddressEmpty} onChange={onChange} value={userData.address} placeholder='사용자 주소를 입력해주세요' spellcheck='false' />

                </InputForm>

                <Script>* 사용자 이름과 주소는 팝업 스토어 제품 구매에 필요한 정보입니다.</Script>
                <Script>* 회원 가입 이후 마이 페이지에서 언제든 수정가능합니다.</Script>

                {isDuplicationChecked ?
                    <SubmitButton onClick={onSubmit}>다음</SubmitButton>
                    :
                    <SubmitButton onClick={needDuplicationCheck}>다음</SubmitButton>
                }

            </Input>
        </VerifyForm>
    );
};
