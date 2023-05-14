import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GetUserData, isLoginCheck } from '../../redux/actions/userAction';

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

export const MyPage = () => {

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

    const [isUpdate, setIsUpdate] = useState(false);

    const onUpdateForm = () => {
        setIsUpdate(!isUpdate);
    };

    const onUpdateSubmit = () => {
        const choice = window.confirm('수정 하시겠어요?');

        if (!choice) {
            setIsUpdate(!isUpdate);
            return;
        }
        else {
            setIsUpdate(!isUpdate);
            alert('수정되었습니다.');
        };
    };

    const ok = () => {
        console.log(getUserState);
        console.log(userData);

    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'My Page';

        dispatch({ type: 'STATE_INIT' });
        dispatch(isLoginCheck());
        dispatch(GetUserData());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setUserData(getUserState.userdata);
        // eslint-disable-next-line
    }, [getUserState]);

    return (

        <BackGround>

            <FormBorder>

                <InnerContents>

                    <FormTitle>
                        <p>마이페이지</p>
                        {isUpdate ?
                            <div>
                                <UpdateButton onClick={onUpdateSubmit}>수정완료</UpdateButton>
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

                        {isUpdate ?
                            <>
                                <Input type='text' id='email' placeholder='변경할 이메일 주소를 입력해주세요' spellcheck='false' />
                                <CheckAndResult>
                                    <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                                    <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                                    <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage>
                                </CheckAndResult>
                            </>
                            :
                            <>{userData.email}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 닉네임 :</p>
                        {isUpdate ?
                            <>
                                <Input type='text' id='displayname' placeholder='변경할 닉네임을 입력해주세요' spellcheck='false' />
                                <CheckAndResult>
                                    <DuplicationCheckButton>중복검사</DuplicationCheckButton>
                                    <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                                    <WarningMassage>사용할 수 없는 이메일 주소입니다.</WarningMassage>
                                </CheckAndResult>
                            </>

                            :
                            <>{userData.displayName}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 성명 :</p>
                        {isUpdate ?
                            <Input type='text' id='name' placeholder='변경할 이름을 입력해주세요' spellcheck='false' />
                            :
                            <>{userData.name}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 주소 :</p>
                        {isUpdate ?
                            <Input type='text' id='address' placeholder='변경할 주소를 입력해주세요' spellcheck='false' />
                            :
                            <>{userData.address}</>
                        }
                    </FormInfo>

                    <FormInfo>
                        <p>사용자 상세주소 :</p>
                        {isUpdate ?
                            <Input type='text' id='address2' placeholder='변경할 상세주소를 입력해주세요' spellcheck='false' />
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

                    <SubmitButton onClick={ok}>다음</SubmitButton>

                </InnerContents>


            </FormBorder >

        </BackGround>


    );
};
