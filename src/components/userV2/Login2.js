import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isLoginCheck, logIn } from '../../redux/actions/userAction';

import errordecoimage1 from '../../assets/images/emoji/Icon_Emoji_010_Amber_Save_me.webp';

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

const MoveToSignUp = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > p {
        font-weight: 500;
        font-size: 15px;
    };
    & > a {
        text-decoration: none;
        color: gray;
        font-size: 15px;
    };
    & > a:hover {
        color: black;
    };
`;



const ErrorModalBorder = styled.div`
    width: 100%;
    height: 100%;

    display: ${(props) => props.isError ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: absolute;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorDecoImageBox = styled.div`
    width: 500px;
    height: 280px;

    margin-top: 70px;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
`;

const ErrorDecoImage = styled.div`
    width: 100%;
    height: 100%;

    background-image: url(${errordecoimage1});
    background-size: 300px 300px;
    background-position: left;
    background-repeat: no-repeat;

    @media screen and (max-width: 300px) {
        background-size: 200px 200px;
    }
`;

const ErrorInnerContents = styled.div`
    width: 500px;
    height: 500px;

    margin-top: -20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
    border-radius: 20px;

    background-color: #d2d2d2;

    opacity: 0.9;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
    @media screen and (max-width: 300px) {
        margin-top: -70px;
    }
`;

const ErrorTitle = styled.div`
    width: 80%;
    height: 20%;

    color: black;
    font-size: 42px;
`;
const ErrorForm = styled.div`
    width: 80%;
    height: 60%;

    color: black;
    font-size: 28px;
`;
const ErrorButton = styled.button`
    width: 40%;
    height: 50px;

    border: none;
    border-radius: 10px;

    color: black;
    font-family: 'GIFont';
    font-size: 20px;

    &:hover {
        color: white;
        background-color: black;
    };
`;

export const Login2 = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserData = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    // const onChange = (event) => {
    //     if (event.target.type === 'email') {
    //         setEmail(event.target.value);
    //         setIsEmailEmpty(false);
    //     }
    //     else if (event.target.type === 'password') {
    //         setPassword(event.target.value);
    //         setIsPasswordEmpty(false);
    //     }
    // };

    // const onSubmit = (event) => {
    //     event.preventDefault();

    //     if (!email && !password) {
    //         setIsEmailEmpty(true);
    //         setIsPasswordEmpty(true);
    //         return;
    //     }
    //     else {
    //         if (!email) {
    //             setIsEmailEmpty(true);
    //             return;
    //         }

    //         if (!password) {
    //             setIsPasswordEmpty(true);
    //             return;
    //         };
    //     };

    //     dispatch(logIn(email, password, navigate));
    //     // eslint-disable-next-line
    // };

    // const onClickError = () => {
    //     setIsError(!isError);
    //     setEmail('');
    //     setPassword('');
    // };

    // useEffect(() => {
    //     const titleElement = document.getElementsByTagName('title')[0];
    //     titleElement.innerHTML = 'User Login';

    //     dispatch(isLoginCheck());
    //     // eslint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     setIsLoading(getUserData.processvalue.isLoading);
    //     setIsError(getUserData.processvalue.isError);
    //     // eslint-disable-next-line
    // }, [getUserData]);

    // const devLogin = () => {
    //     dispatch(logIn('admin@admin.com', '123123', navigate));
    // };

    return (
        <>
            <BackGround>

                <FormBorder>

                    <InnerContents>

                        <FormTitle>
                            <p>회원 로그인</p>
                        </FormTitle>

                        <FormInputNoButton>
                            <Input type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />
                            <OkMassageNoButton>사용 가능한 이메일 주소입니다.</OkMassageNoButton>
                        </FormInputNoButton>

                        <FormInputNoButton>
                            <Input type='password' id='password' placeholder='비밀번호를 입력해주세요' spellcheck='false' />
                            <OkMassageNoButton>사용 가능한 비밀번호입니다.</OkMassageNoButton>
                        </FormInputNoButton>

                        <FormScript>
                            <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                            <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>
                        </FormScript>

                        <SubmitButton disabled={true}>다음</SubmitButton>

                        <MoveToSignUp>
                            <p>아직 회원이 아니신가요?</p>
                            <Link to='/user/signup'>
                                회원가입
                            </Link>
                        </MoveToSignUp>

                    </InnerContents>

                </FormBorder >

            </BackGround>



            <ErrorModalBorder isError={isError}>

                <ErrorDecoImageBox>
                    <ErrorDecoImage />
                </ErrorDecoImageBox>

                <ErrorInnerContents>

                    <ErrorTitle>
                        에러가 발생하였습니다...
                    </ErrorTitle>

                    <ErrorForm>
                        {getUserData.errorinfo.errorCode} <br /><br />
                        {getUserData.errorinfo.errorMessage}
                    </ErrorForm>

                    <ErrorButton onClick={''}>
                        닫기
                    </ErrorButton>

                </ErrorInnerContents>
            </ErrorModalBorder>

        </>
    );
};
