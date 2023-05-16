import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddressInputModal } from '../../components/AddressInput';
import { isLoginCheck, UpdateUserData } from '../../redux/actions/userAction';
import { checkDuplication, GetUserData } from '../../functions/userFunction';

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
    width: 900px;
    height: 100%;

    margin-top: 100px;

    border: 1px solid gray;

    @media screen and (max-width: 700px) {
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

const FormTitle = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
        height: 100px;
    }

    & > p {
        width: 200px;
        height: 100%;

        font-size: 24px;
        padding: 3px;
    }
    & > div {
        width: 280px;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
`;

const UpdateButton = styled.button`
    width: 120px;
    height: 100%;

    margin-left: 10px;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 18px;

    &:hover {
        background-color: gray;
    };

    @media screen and (max-width: 350px) {
        font-size: 14px;
    }
`;


const FormInfo = styled.div`
    width: 95%;
    height: 80px;

    margin-top: 5px;

    color: black;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > p {
        font-size: 20px;
        padding: 3px;
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



const Input = styled.input`
    width: 100%;
    height: 20%;

    border: none;
    border-bottom: 1px solid black;

    font-size: 15px;
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

export const MyPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);

    const [userData, setUserData] = useState({
        userNumber: '',
        userType: '',
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
        address2: '',
        signupDate: '',
    });
    const [address, setAddress] = useState('');

    const [isUpdate, setIsUpdate] = useState(false);
    const [isAddressInput, setIsAddressInput] = useState(false);

    const [isDisplayNameDuplication, setIsDisplayNameDuplication] = useState(true);
    const [isFirstRenderingDisplayName, setIsFirstRenderingDisplayName] = useState(true);

    const onChange = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value });

        if (event.target.id === 'displayName') {
            setIsDisplayNameDuplication(true);
            setIsFirstRenderingDisplayName(false);
        };
    };

    const onUpdateForm = () => {
        setIsUpdate(!isUpdate);
    };
    const onAddressInput = () => {
        setIsAddressInput(true);
    }

    const onUpdateSubmit = () => {

        if (isDisplayNameDuplication) {
            alert('닉네임 중복 검사가 이루어지지 않았습니다.');
            return;
        }

        const choice = window.confirm('수정 하시겠어요?');

        if (!choice) {
            setIsUpdate(!isUpdate);
            return;
        }
        else {
            setIsUpdate(!isUpdate);
            dispatch(UpdateUserData(userData, navigate));
        };
    };

    const onCheckDuplication = (event) => {
        event.preventDefault();

        if (!userData.displayName) {
            alert('닉네임을 입력해주세요.');
            return;
        };

        checkDuplication(userData.displayName, 'displayname', dispatch)
            .then((result) => {
                setIsDisplayNameDuplication(result);

                if (result) {
                    alert('사용할 수 없는 닉네임 입니다.');
                }
                else {
                    alert('사용가능한 닉네임 입니다.');
                }
            });
    };

    const ok = () => {
        const choice = window.confirm('탈퇴하시겠어요?');

        if (!choice) {
            return;
        }
        else {
            alert('탈퇴 완료되었습니다.');
        };
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'My Page';
    });

    useEffect(() => {
        dispatch({ type: 'STATE_INIT' });
        dispatch(isLoginCheck());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (!getUserState.userdata.email) {
            return;
        };

        GetUserData(getUserState.userdata.email, dispatch)
            .then((result) => {
                setUserData(result)
            })
        // eslint-disable-next-line
    }, [getUserState]);

    useEffect(() => {
        setUserData({ ...userData, address: address });
        // eslint-disable-next-line
    }, [address]);

    return (
        <BackGround>

            <FormBorder>

                <InnerContents>

                    <FormTitle>
                        <p>마이페이지</p>
                        {isUpdate ?
                            <div>
                                <UpdateButton onClick={onUpdateSubmit}>수정하기</UpdateButton>
                                <UpdateButton onClick={onUpdateForm}>취소</UpdateButton>
                            </div>
                            :
                            <div>
                                <UpdateButton onClick={onUpdateForm}>정보수정</UpdateButton>
                            </div>
                        }
                    </FormTitle>

                    <FormInfo>
                        <p>회원번호 :</p>
                        {userData.userNumber}
                    </FormInfo>

                    <FormInfo>
                        <p>회원등급 :</p>
                        {userData.userType}
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 이메일 :</p>
                        {userData.email}
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 닉네임 :</p>
                        {isUpdate ?
                            <>
                                <Input type='text' id='displayName' placeholder='변경할 닉네임을 입력해주세요' spellcheck='false' onChange={onChange} value={userData.displayName} />
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
                            </>

                            :
                            <>{userData.displayName}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 성명 :</p>
                        {isUpdate ?
                            <Input type='text' id='name' placeholder='변경할 이름을 입력해주세요' spellcheck='false' onChange={onChange} value={userData.name} />
                            :
                            <>{userData.name}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 주소 :</p>
                        {isUpdate ?
                            <>
                                <Input type='text' id='address' placeholder='변경할 주소를 입력해주세요' spellcheck='false' value={userData.address} />
                                <InputButton>
                                    <Button onClick={onAddressInput}>주소입력</Button>
                                </InputButton>
                            </>
                            :
                            <>{userData.address}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 상세주소 :</p>
                        {isUpdate ?
                            <Input type='text' id='address2' placeholder='변경할 상세주소를 입력해주세요' spellcheck='false' onChange={onChange} value={userData.address2} />
                            :
                            <>{userData.address2}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>가입날짜 :</p>
                        {userData.signupDate}
                    </FormInfo>

                    <FormScript>
                        <Script>* 1</Script>
                        <Script>* 2</Script>
                    </FormScript>

                    {isUpdate ? <></> :
                        <SubmitButton onClick={ok}>회원탈퇴</SubmitButton>
                    }

                </InnerContents>


            </FormBorder >

            <AddressInputModal setAddress={setAddress} isAddressInput={isAddressInput} setIsAddressInput={setIsAddressInput} />

        </BackGround>
    );
};
