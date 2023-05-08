import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isLoginCheck, logIn } from '../../redux/actions/userAction';

const BackGround = styled.div`
    width: 800px;
    height: 100%;

    margin-top: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 880px) {
        width: 90%;
    }
`;

const centerOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    width: 700px;
    height: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;

    @media screen and (max-width: 880px) {
        width: 90%;
    }
`;
const TitleArea = styled(centerOption)`
    width: 71%;
    height: 80px;

    font-size: 24px;
    align-items: flex-start;
`;
const InputArea = styled(centerOption)`
    width: 100%;
    height: 200px;
`;
const ButtonArea = styled(centerOption)`
    width: 100%;
    height: 100px;

    & > button {
        width: 220px;
        height: 60px;

        border: none;
        border-radius: 10px;

        font-family: 'GIFont';
        font-size: 20px;
    };
    & > button:hover {
        background-color: gray;
    };
    & > p {
        color: red;
    };
`;

const Input = styled(centerOption)`
    width: 500px;
    height: 40%;

    align-items: flex-start;

    & > input {
        width: 100%;
        height: 40px;

        border: none;
        border-bottom: 2px solid;
        border-color: ${(props) => props.isEmpty ? 'red' : 'gray'};

        font-size: 18px;
        font-family: 'GIFont';
    };
    & > input::placeholder {
        color: ${(props) => props.isEmpty ? 'red' : 'gray'};
    };

    /* & > input:focus {
        border-bottom: 1px solid gray;
    }; */
    & > p {
        color: red;
    };

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 880px) {
        width: 400px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }

    @media screen and (max-width: 500px) {
        width: 300px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }

    @media screen and (max-width: 400px) {
        width: 250px;

        transform: translate3d(0, 0, 0);
        transition: all 1s ease;
    }
`;

const WarningMessage = styled.div`
    width: 90%;

    font-size: 14px;
    color: red;
`;

const SignupArea = styled(centerOption)`
    width: 700px;
    height: 200px;

    margin-top: 20px;

    border: 1px solid gray;

    & > p {
        font-weight: 500;
        font-size: 18px;

        margin-bottom: 20px;
    };
    & > a {
        text-decoration: none;
        color: black;
    };
    & > a > button {
        width: 220px;
        height: 80px;

        border: none;
        border-radius: 10px;

        font-family: 'GIFont';
        font-size: 20px;
    };
    & > a > button:hover {
        background-color: gray;
    };

    @media screen and (max-width: 880px) {
        width: 90%;
    };
`;

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserData = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const onChange = (event) => {
        if (event.target.type === 'email') {
            setEmail(event.target.value);
            setIsEmailEmpty(false);
        }
        else if (event.target.type === 'password') {
            setPassword(event.target.value);
            setIsPasswordEmpty(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setIsEmailEmpty(true);
            return;
        }

        if (!password) {
            setIsPasswordEmpty(true);
            return;
        };

        // dispatch(logIn(email, password, navigate));
        // eslint-disable-next-line
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'User Login';

        dispatch(isLoginCheck());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setIsLoading(getUserData.isLoading);
        // eslint-disable-next-line
    }, [getUserData]);

    const devLogin = () => {
        dispatch(logIn('admin@admin.com', '123123', navigate));
    };

    return (
        <BackGround>

            <Form onSubmit={onSubmit}>

                <TitleArea>
                    회원 로그인
                </TitleArea>

                <InputArea>

                    <Input isEmpty={isEmailEmpty}>
                        <input type='email' id='inputEmail' onChange={onChange} value={email || ''} placeholder='이메일 주소를 입력해주세요' />
                        {/* {!email ?
                            <>
                                <WarningMessage>이메일 주소를 입력해주세요.</WarningMessage>
                            </>
                            :
                            <>

                            </>
                        } */}
                    </Input>

                    <Input isEmpty={isPasswordEmpty}>
                        <input type='password' id='inputPassword' onChange={onChange} value={password || ''} placeholder='비밀번호를 입력해주세요' />
                        {/* {!password ?
                            <>
                                <WarningMessage>비밀번호를 입력해주세요.</WarningMessage>
                            </>
                            :
                            <>

                            </>
                        } */}
                    </Input>

                </InputArea>

                <ButtonArea>
                    {!isLoading ?
                        <>
                            <button type='submit'>로그인</button>
                        </>
                        :
                        <>
                            <button>로그인</button>
                            <WarningMessage>로딩 중입니다..</WarningMessage>
                        </>
                    }
                </ButtonArea>

            </Form>

            <SignupArea>
                <p>아직 회원이 아니신가요?</p>
                <Link to='/user/signup'>
                    <button>
                        회원가입
                    </button>
                </Link>
            </SignupArea>


            <br /><br /><br /><br />
            <button onClick={devLogin}>개발로그인</button>


        </BackGround>
    );
};
