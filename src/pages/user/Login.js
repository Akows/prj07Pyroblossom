import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logIn } from '../../redux/actions/userAction';

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
        border-bottom: 1px solid black;

        font-size: 18px;
        font-family: 'GIFont';
    };
    & > input:focus {
        border-bottom: 1px solid gray;
    };
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

const WarningMassage = styled.div`
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
    & > button {
        width: 220px;
        height: 80px;

        border: none;
        border-radius: 10px;

        font-family: 'GIFont';
        font-size: 20px;
    };
    & > button:hover {
        background-color: gray;
    };
    & > button > a {
        text-decoration: none;
        color: black;
    };

    @media screen and (max-width: 880px) {
        width: 90%;
    };
`;

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const getIsError = useSelector((state) => state.isError);
    // const getIsLoading = useSelector((state) => state.isLoading);
    const [isError, setIsError] = useState(useSelector((state) => state.isError));
    const [isLoading, setIsLoading] = useState(useSelector((state) => state.isLoading));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (event) => {
        if (event.target.type === 'email') {
            setEmail(event.target.value);
        }
        else if (event.target.type === 'password') {
            setPassword(event.target.value);
        }
    };

    const onSubmit = useCallback((event) => {
        event.preventDefault();

        if (!email || !password) {
            console.log('아이디 혹은 비밀번호를 모두 입력해야합니다.');
            return;
        };

        dispatch(logIn(email, password));

        if (!isError) {
            alert('환영합니다.');
            navigate('/', { replace: true });
        }
        else {
            alert('에러가 발생하였습니다.');
            navigate('/', { replace: true });
        }

        // eslint-disable-next-line
    }, [email, password]);

    useEffect(() => {
        setIsError(isError);
        setIsLoading(isLoading);
    }, [isError, isLoading]);

    return (
        <BackGround>

            <Form onSubmit={onSubmit}>

                <TitleArea>
                    회원 로그인
                </TitleArea>

                <InputArea>

                    <Input>
                        <input type='email' id='inputEmail' onChange={onChange} value={email || ''} placeholder='이메일 주소를 입력해주세요' />
                        {!email ?
                            <>
                                <WarningMassage>이메일 주소를 입력해주세요.</WarningMassage>
                            </>
                            :
                            <>

                            </>
                        }
                    </Input>

                    <Input>
                        <input type='password' id='inputPassword' onChange={onChange} value={password || ''} placeholder='비밀번호를 입력해주세요' />
                        {!password ?
                            <>
                                <WarningMassage>비밀번호를 입력해주세요.</WarningMassage>
                            </>
                            :
                            <>

                            </>
                        }
                    </Input>

                </InputArea>

                <ButtonArea>
                    <button type='submit'>로그인</button>
                    {!isError ?
                        <>

                        </>
                        :
                        <>
                            <WarningMassage>에러가 발생하였습니다.</WarningMassage>
                        </>
                    }

                    {!isLoading ?
                        <>

                        </>
                        :
                        <>
                            <WarningMassage>로딩 중입니다..</WarningMassage>
                        </>
                    }
                </ButtonArea>

            </Form>

            <SignupArea>
                <p>아직 회원이 아니신가요?</p>
                <button>
                    <Link to='/signup'>
                        회원가입
                    </Link>
                </button>
            </SignupArea>


        </BackGround>
    );
};
