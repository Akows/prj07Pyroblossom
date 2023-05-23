import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { SignUp } from '../../../redux/actions/userAction';
import { checkDuplication } from '../../../functions/userFunction';
import { AddressInputModal } from '../../user/AddressInput';
import { ErrorModal } from '../../ErrorModal';

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

const ResultMassage = styled.div`
    width: 80%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
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
const WarningMassage = styled(resultMassage)`
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

export const RequestOtherVerify = ({ userData, setUserData, navigate, dispatch, getUserState, setIsOtherEntered }) => {

    const [address, setAddress] = useState('');

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isAddressInput, setIsAddressInput] = useState(false);

    const [isdisplayNameEmpty, setIsdisplayNameEmpty] = useState(false);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
    const [isAddressEmpty, setIsAddressEmpty] = useState(false);

    const [isFirstRenderingDisplayName, setIsFirstRenderingDisplayName] = useState(true);

    const [isDisplayNameDuplication, setIsDisplayNameDuplication] = useState(true);

    const onChange = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value });

        if (event.target.id === 'displayname') {
            setIsDisplayNameDuplication(true);
            setIsFirstRenderingDisplayName(false);
            setIsdisplayNameEmpty(false);
        };

        if (event.target.id === 'name') {
            setIsNameEmpty(false);
        };

        if (event.target.id === 'phonenumber') {
            setIsPhoneNumberEmpty(false);
        };

        if (event.target.id === 'address2') {
            setIsAddressEmpty(false);
        };
    };

    const onCheckDuplication = () => {
        setIsLoading(true);

        if (!userData.displayname) {
            alert('닉네임을 입력해주세요.');
            return;
        };

        checkDuplication(userData.displayname, 'displayname', dispatch)
            .then((result) => {
                setIsDisplayNameDuplication(result);

                if (result) {
                    alert('사용할 수 없는 닉네임 입니다.');
                    setIsLoading(false);
                }
                else {
                    alert('사용가능한 닉네임 입니다.');
                    setIsLoading(false);
                }
            });
    };

    // 주소입력 모달을 출력하는 버튼.
    const onAddressInput = () => {
        setIsAddressInput(true);
    }
    const onSubmit = (event) => {
        event.preventDefault();

        if (!userData.displayname) {
            setIsdisplayNameEmpty(true);
            return;
        };

        if (!userData.name) {
            setIsNameEmpty(true);
            return;
        };

        if (!userData.phonenumber) {
            setIsPhoneNumberEmpty(true);
            return;
        };

        if (!userData.address || !userData.address2) {
            setIsAddressEmpty(true);
            return;
        };

        if (isDisplayNameDuplication) {
            alert('닉네임 중복 검사가 이루어지지 않았습니다.');
            return;
        }

        dispatch(SignUp(userData, navigate));

        setIsOtherEntered(true);
        // setIsSignupComplete(false);
    };

    const onClickError = () => {
        setIsError(false);
    };

    useEffect(() => {
        setIsError(getUserState.flagvalue.isError);
        setIsLoading(getUserState.flagvalue.isLoading);
        // eslint-disable-next-line
    }, [getUserState]);

    useEffect(() => {
        setUserData({ ...userData, address: address });
        // eslint-disable-next-line
    }, [address]);

    return (
        <>

            <FormBorder>
                <InnerContents>

                    <FormTitle>
                        <p>회원가입 - 기타정보 입력</p>
                    </FormTitle>

                    <FormInput>
                        <Input type='text' id='displayname' placeholder='닉네임을 입력해주세요' spellcheck='false' value={userData.displayname} onChange={onChange} isEmpty={isdisplayNameEmpty} />

                        <CheckAndResult>
                            <DuplicationCheckButton onClick={onCheckDuplication}>중복검사</DuplicationCheckButton>
                            <ResultMassage>
                                {isFirstRenderingDisplayName ? <></> :
                                    <>
                                        {!isDisplayNameDuplication ?
                                            <>
                                                <OkMassage>사용 가능한 닉네임입니다.</OkMassage>
                                            </>
                                            :
                                            <>
                                                <WarningMassage>사용 불가능한 닉네임입니다.</WarningMassage>
                                            </>
                                        }
                                    </>
                                }

                            </ResultMassage>
                        </CheckAndResult>
                    </FormInput>

                    <FormInputNoButton>
                        <Input type='text' id='name' placeholder='성명을 입력해주세요' spellcheck='false' value={userData.name} onChange={onChange} isEmpty={isNameEmpty} />
                    </FormInputNoButton>

                    <FormInputNoButton>
                        <Input type='text' id='phonenumber' placeholder='전화번호를 입력해주세요' spellcheck='false' value={userData.phonenumber} onChange={onChange} isEmpty={isPhoneNumberEmpty} />
                    </FormInputNoButton>

                    <FormInput>
                        <Input type='text' id='address' placeholder='자택 주소를 입력해주세요' spellcheck='false' value={userData.address} isEmpty={isAddressEmpty} />
                        <Input type='text' id='address2' placeholder='상세 주소를 입력해주세요' spellcheck='false' value={userData.address2} onChange={onChange} isEmpty={isAddressEmpty} />

                        <InputButton>
                            <Button onClick={onAddressInput}>주소입력</Button>
                        </InputButton>
                    </FormInput>

                    <FormScript>
                        <Script>* 성명과 자택 주소는 팝업 스토어 물건 구매시 이용됩니다.</Script>
                        <Script>* 입력한 개인정보는 가입 이후 마이 페이지에서 조회/수정 가능합니다.</Script>
                    </FormScript>

                    {isLoading ?
                        <SubmitButton disabled={true}>대기 중..</SubmitButton>
                        :
                        <SubmitButton onClick={onSubmit}>다음</SubmitButton>
                    }

                </InnerContents>

            </FormBorder>

            <ErrorModal isError={isError} getUserState={getUserState} onClickError={onClickError} />

            <AddressInputModal setAddress={setAddress} isAddressInput={isAddressInput} setIsAddressInput={setIsAddressInput} />

        </>
    );
};
