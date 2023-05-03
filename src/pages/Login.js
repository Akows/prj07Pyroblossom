import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 800px;
    height: 100%;

    background-color: antiquewhite;

    margin-top: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 20px;

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
    height: 500px;
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
    height: 200px;

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
    & > b {
        font-weight: 500;
        font-size: 18px;

        margin-bottom: 10px;
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

export const Login = () => {

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('Submit!');
    };

    return (
        <BackGround>

            <Form onSubmit={onSubmit}>

                <TitleArea>
                    회원 로그인
                </TitleArea>

                <InputArea>

                    <Input>
                        <label>ID :</label>
                        <input></input>
                        <p>에러문구</p>
                    </Input>

                    <Input>
                        <label>PWD :</label>
                        <input></input>
                        <p>에러문구</p>
                    </Input>

                </InputArea>

                <ButtonArea>
                    <button type='submit'>Login</button>
                    <p>에러문구</p>

                    <br />

                    <b>아직 회원이 아니신가요?</b>
                    <button>회원가입</button>
                </ButtonArea>


            </Form>


        </BackGround>
    );
};
