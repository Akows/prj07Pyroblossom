import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { checkDuplication, checkValidate } from '../../../functions/userFunction';
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
    height: 40px;

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
    justify-content: space-between;
`;
const DuplicationCheckButton = styled.button`
    width: 20%;
    height: 50px;

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

export const RequestEmailAndPasswordVerify = ({ userData, setUserData, getUserState, dispatch, setIsEmailAndPasswordEntered, setIsOtherEntered }) => {

    const [passwordRewrite, setPasswordRewrite] = useState('');

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 각 Input 태그의 빈 값을 체크하는 State.
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isPasswordRewriteEmpty, setIsPasswordRewriteEmpty] = useState(false);

    // 각 Input 태그의 결과 메시지 출력여부를 제어하는 State.
    const [isFirstRenderingEmail, setIsFirstRenderingEmail] = useState(true);
    const [isFirstRenderingPassword, setIsFirstRenderingPassword] = useState(true);
    const [isFirstRenderingPasswordRewrite, setIsFirstRenderingPasswordRewrite] = useState(true);

    // 이메일 유효성 여부를 제어하는 State.
    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [isPasswordValidate, setIsPasswordValidate] = useState(false);

    // 이메일 중복성 여부를 제어하는 State
    const [isEmailDuplication, setIsEmailDuplication] = useState(true);

    // 이메일 인증 확인 여부를 제어하는 State
    // 이메일 인증 방식 변경으로 사용하지 않음.
    // const [isEmailVerified, setIsEmailVerified] = useState(false);

    // 이메일 인증창의 렌더링 여부를 제어하는 State.
    // 이메일 인증 방식 변경으로 사용하지 않음.
    // const [isEmailVerifiedFormRender, setIsEmailVerifiedFormRender] = useState(false);

    // 비밀번호를 2번 입력시키고, 입력한 값들이 일치하는지 여부를 제어하는 State.
    const [isPasswordSame, setIsPasswordSame] = useState(false);

    // 이메일 주소, 비밀번호 Input 태그의 입력값을 감지하는 onChange 함수.
    const onChange = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value });

        if (event.target.id === 'email') {
            setIsEmailDuplication(true);
            setIsFirstRenderingEmail(false);
            setIsEmailEmpty(false);

            setIsEmailValidate(checkValidate(event.target.value, 'email'));
        };

        if (event.target.id === 'password') {
            setIsFirstRenderingPassword(false);
            setIsPasswordEmpty(false);

            setIsPasswordValidate(checkValidate(event.target.value, 'password'));
        };
    };

    // 비밀번호 2차 입력 Input 태그의 입력값을 감지하는 onChange 함수.
    const onChangeRewrite = (event) => {
        setPasswordRewrite(event.target.value);

        setIsFirstRenderingPasswordRewrite(false);
        setIsPasswordRewriteEmpty(false);
    };

    // 중복검사 함수.
    const onCheckDuplication = () => {
        setIsLoading(true);

        if (!userData.email) {
            alert('이메일 주소를 입력해주세요.');
            return;
        };

        if (!isEmailValidate) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        };

        checkDuplication(userData.email, 'email', dispatch)
            .then((result) => {
                setIsEmailDuplication(result);

                if (result) {
                    alert('사용할 수 없는 이메일 주소 입니다.');
                    setIsLoading(false);
                }
                else {
                    alert('사용가능한 이메일 주소 입니다.');
                    setIsLoading(false);
                }
            });
    };

    // 이메일 주소, 비밀번호 입력을 정상적으로 마치고 이메일 인증 모달창으로 넘어가는 버튼 함수.
    const onSubmit = () => {
        if (!userData.email) {
            setIsEmailEmpty(true);
            return;
        };

        if (!userData.password) {
            setIsPasswordEmpty(true);
            return;
        };

        if (!passwordRewrite) {
            setIsPasswordRewriteEmpty(true);
            return;
        };

        if (isEmailDuplication) {
            alert('이메일 중복 검사가 이루어지지 않았습니다.');
            return;
        }

        if (!isEmailValidate) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        };

        if (!isPasswordValidate) {
            alert('유효한 비밀번호를 입력해주세요.');
            return;
        };

        if (!isPasswordSame) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsEmailAndPasswordEntered(true);
        setIsOtherEntered(false);
    };

    const onClickError = () => {
        setIsError(false);
    };

    // 이메일 인증 메시지를 발송하는 함수.
    // 이메일 인증 방식 변경으로 사용하지 않음.
    // let setTimer = '';

    // const onSendVerifyedMail = () => {
    //     dispatch(SignUp(userData.email, userData.password, navigate));

    //     setTimer = setInterval(() => {
    //         onAuthStateChanged(appAuth, (user) => {
    //             console.log(user);

    //             if (user.emailVerified) {
    //                 console.log('이메일 인증이 완료될 경우..');

    //                 setIsEmailVerified(true);
    //                 clearInterval(setTimer);
    //             }
    //             else {
    //                 console.log('이메일 인증 대기 중..');
    //                 setIsEmailVerified(true);
    //                 clearInterval(setTimer);
    //             }

    //             // if (user) {
    //             //     setIsEmailVerified(true);
    //             //     clearInterval(setTimer);
    //             // }
    //         })
    //     }, 3000);
    // };

    // 모든 과정을 마치고 다음 과정으로 넘어가는 onSubmit 함수.
    // 이메일 인증 방식 변경으로 사용하지 않음.
    // const onEmailVerifiedForm = (event) => {
    //     event.preventDefault();

    //     setIsEmailVerifiedFormRender(false);
    //     // setIsEmailAndPasswordEntered(true);
    //     // setIsOtherEntered(false);
    // };

    // 비밀번호 일치 여부를 매 입력마다 감지하는 useEffect.
    useEffect(() => {
        if (passwordRewrite === '' || userData.password === '') {
            setIsPasswordSame(false);
            return;
        }

        setIsPasswordSame(passwordRewrite === userData.password);
    }, [userData.password, passwordRewrite]);

    // Redux Store에서 flagvalue State의 변화를 감지하여 프론트 플래그 변수를 제어.
    useEffect(() => {
        setIsError(getUserState.flagvalue.isError);
        setIsLoading(getUserState.flagvalue.isLoading);
        // eslint-disable-next-line
    }, [getUserState]);

    return (
        <>
            <FormBorder>
                <InnerContents>

                    <FormTitle>
                        <p>회원가입 - 이메일, 비밀번호 입력</p>
                    </FormTitle>

                    <FormInput>
                        <Input type='text' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' value={userData.email} onChange={onChange} isEmpty={isEmailEmpty} />

                        <CheckAndResult>
                            <DuplicationCheckButton onClick={onCheckDuplication}>중복검사</DuplicationCheckButton>
                            <ResultMassage>
                                {isFirstRenderingEmail ? <></> :
                                    <>
                                        {!isEmailDuplication ?
                                            <>
                                                <OkMassage>사용 가능한 이메일 주소입니다.</OkMassage>
                                            </>
                                            :
                                            <>
                                                <WarningMassage>사용 불가능한 이메일 주소입니다.</WarningMassage>
                                            </>
                                        }
                                    </>
                                }
                                {isFirstRenderingEmail ? <></> :
                                    <>
                                        {isEmailValidate ?
                                            <>
                                                <OkMassageNoButton>유효한 이메일 주소입니다.</OkMassageNoButton>
                                            </>
                                            :
                                            <>
                                                <WarningMassageNoButton>유효하지 않은 이메일 주소입니다.</WarningMassageNoButton>
                                            </>
                                        }
                                    </>
                                }
                            </ResultMassage>
                        </CheckAndResult>

                    </FormInput>

                    <FormInputNoButton>
                        <Input type='password' id='password' placeholder='비밀번호를 입력해주세요' spellcheck='false' value={userData.password} onChange={onChange} isEmpty={isPasswordEmpty} />
                        {isFirstRenderingPassword ? <></> :
                            <>
                                {isPasswordValidate ?
                                    <>
                                        <OkMassageNoButton>유효한 비밀번호입니다.</OkMassageNoButton>
                                    </>
                                    :
                                    <>
                                        <WarningMassageNoButton>유효하지 않은 비밀번호입니다.</WarningMassageNoButton>
                                    </>
                                }
                            </>
                        }
                    </FormInputNoButton>

                    <FormInputNoButton>
                        <Input type='password' id='passwordrewrite' placeholder='비밀번호를 다시 입력해주세요' spellcheck='false' value={passwordRewrite} onChange={onChangeRewrite} isEmpty={isPasswordRewriteEmpty} />
                        {isFirstRenderingPasswordRewrite ? <></> :
                            <>
                                {isPasswordSame ?
                                    <OkMassageNoButton>비밀번호가 일치합니다.</OkMassageNoButton>
                                    :
                                    <WarningMassageNoButton>비밀번호가 일치하지 않습니다.</WarningMassageNoButton>
                                }
                            </>
                        }
                    </FormInputNoButton>

                    <FormScript>
                        <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>
                        <Script>* 비밀번호는 8에서 25 사이의, 숫자/영어/특수문자가 조합되어야 합니다.</Script>
                    </FormScript>

                    {isLoading ?
                        <SubmitButton disabled={true}>대기 중..</SubmitButton>
                        :
                        <SubmitButton onClick={onSubmit}>다음으로</SubmitButton>
                    }

                </InnerContents>
            </FormBorder>

            <ErrorModal isError={isError} getUserState={getUserState} onClickError={onClickError} />

            {/* <EmailVerifiedModalBorder isRender={isEmailVerifiedFormRender}>
                <EmailVerifiedImageBox>
                    <EmailVerifiedImage />
                </EmailVerifiedImageBox>

                <EmailVerifiedInnerContents>

                    <EmailVerifiedTitle>
                        이메일 인증
                    </EmailVerifiedTitle>

                    <EmailVerifiedInfo>

                        <EmailVerifiedInfoAddress>
                            인증 이메일이 전달될 주소 :
                            <p>{userData.email}</p>
                        </EmailVerifiedInfoAddress>

                        <EmailVerifiedInfoSendMail>
                            <button onClick={onSendVerifyedMail}>인증메일 발송하기</button>
                        </EmailVerifiedInfoSendMail>

                        <EmailVerifiedInfoResult>
                            {isEmailVerified ?
                                <>
                                    인증이 완료되었습니다.
                                </>
                                :
                                <>
                                    인증결과 대기 중..
                                </>
                            }
                        </EmailVerifiedInfoResult>

                    </EmailVerifiedInfo>

                    <EmailVerifiedButton>
                        {isEmailVerified ?
                            <>
                                <button onClick={onSubmit}>확인</button>
                            </>
                            :
                            <>
                                <button>인증필요</button>
                            </>
                        }
                    </EmailVerifiedButton>

                </EmailVerifiedInnerContents>
            </EmailVerifiedModalBorder> */}

        </>
    );
};
