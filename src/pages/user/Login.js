import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

    background-color: antiquewhite;

    border-radius: 20px;

    @media screen and (max-width: 880px) {
        width: 90%;
    }
`;
const TitleArea = styled(centerOption)`
    width: 100%;
    height: 80px;

    font-size: 24px;
`;
const InputArea = styled(centerOption)`
    width: 100%;
    height: 220px;
`;
const ButtonArea = styled(centerOption)`
    width: 100%;
    height: 100px;

    & > button {
        width: 120px;
        height: 40px;

        border: none;
        border-radius: 10px;

        background-color: aquamarine;

        font-family: 'GIFont';
    };
    & > button:hover {
        background-color: red;
    };
    & > button:active {
        background-color: blue;
    };
    & > p {
        color: red;
    };
`;

const Input = styled(centerOption)`
    width: 500px;
    height: 50%;

    align-items: flex-start;

    & > label {
        font-size: 18px;
    };
    & > input {
        width: 100%;
        height: 40px;

        border-radius: 10px;

        font-size: 18px;
        font-family: 'GIFont';

        background-color: gray;
    };
    & > input:focus {
        background-color: white;
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

const SignupArea = styled(centerOption)`
    width: 700px;
    height: 200px;

    margin-top: 20px;

    background-color: antiquewhite;

    border-radius: 20px;

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

        background-color: aquamarine;

        font-size: 25px;
        font-family: 'GIFont';
    };
    & > button:hover {
        background-color: red;
    };
    & > button:active {
        background-color: blue;
    };

    @media screen and (max-width: 880px) {
        width: 90%;
    }
`;

export const Login = () => {

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

        console.log(email, password);
    }, [email, password]);



    return (
        <BackGround>

            <Form onSubmit={onSubmit}>

                <TitleArea>
                    회원 로그인
                </TitleArea>

                <InputArea>

                    <Input>
                        <label htmlFor='inputEmail'>ID :</label>
                        <input type='email' id='inputEmail' onChange={onChange} value={email || ''} />
                        <p>에러문구</p>
                    </Input>

                    <Input>
                        <label htmlFor='inputPassword'>PWD :</label>
                        <input type='password' id='inputPassword' onChange={onChange} value={password || ''} />
                        <p>에러문구</p>
                    </Input>

                </InputArea>

                <ButtonArea>
                    <button type='submit'>로그인</button>
                    <p>에러문구</p>
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
