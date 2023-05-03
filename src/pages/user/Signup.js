import React, { useCallback, useEffect, useState } from 'react'
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
    height: 700px;

    border-radius: 20px;

    @media screen and (max-width: 880px) {
        width: 90%;
    }
`;
const TitleArea = styled(centerOption)`
    width: 100%;
    height: 100px;

    font-size: 24px;
`;
const InputArea = styled(centerOption)`
    width: 100%;
    height: 500px;
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

export const Signup = () => {

    const [pictrue, setPictrue] = useState('');

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
    });

    const [errorMassage, setErrorMassage] = useState({
        picErrorMassage: '',
        emailErrorMassage: '',
        pwdErrorMassage: '',
        nameErrorMassage: '',
        displayNameErrorMassage: '',
        addressErrorMassage: '',
        isError: true
    });

    const onChange = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value });
    };

    const onSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(userData);
    }, []);




    return (
        <BackGround>

            <Form onSubmit={onSubmit}>

                <TitleArea>
                    회원가입
                </TitleArea>

                <InputArea>

                    <Input>
                        <label htmlFor='inputPictrue'>프로필 사진 :</label>
                        <input type='file' id='inputPictrue' onChange={onChange} value={pictrue || ''} />
                        <p>{errorMassage.picErrorMassage}</p>
                    </Input>

                    <Input>
                        <label htmlFor='email'>ID :</label>
                        <input type='email' id='email' onChange={onChange} value={userData.email} />
                        <p>{!userData.email ? <>이메일 주소를 입력해주세요</> : <></>}</p>
                    </Input>

                    <Input>
                        <label htmlFor='password'>PWD :</label>
                        <input type='password' id='password' onChange={onChange} value={userData.password} />
                        <p>{errorMassage.pwdErrorMassage}</p>
                    </Input>

                    <Input>
                        <label htmlFor='name'>Name :</label>
                        <input type='text' id='name' onChange={onChange} value={userData.name} />
                        <p>{errorMassage.nameErrorMassage}</p>
                    </Input>

                    <Input>
                        <label htmlFor='displayName'>NickName :</label>
                        <input type='text' id='displayName' onChange={onChange} value={userData.displayName} />
                        <p>{errorMassage.displayNameErrorMassage}</p>
                    </Input>

                    <Input>
                        <label htmlFor='address'>Address :</label>
                        <input type='text' id='address' onChange={onChange} value={userData.address} />
                        <p>{errorMassage.addressErrorMassage}</p>
                    </Input>

                </InputArea>

                <ButtonArea>
                    <button type='submit'>회원가입</button>
                    <p>에러문구</p>
                </ButtonArea>

            </Form>
        </BackGround>
    );
};
