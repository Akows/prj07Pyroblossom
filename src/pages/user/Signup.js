import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RequestEmailVerify } from '../../components/user/RequestEmailVerify';
import { RequestOtherVerify } from '../../components/user/RequestOtherVerify';
import { RequestPasswordVerify } from '../../components/user/RequestPasswordVerify';
import { SignUp } from '../../redux/actions/userAction';

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



export const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
    });

    const [isEmailEntered, setIsEmailEntered] = useState(false);
    const [isPasswordEntered, setIsPasswordEntered] = useState(true);
    const [isOtherEntered, setIsOtherEntered] = useState(true);

    const onChange = (event) => {
        setUserData({ ...userData, [event.target.id]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setIsOtherEntered(true);
        dispatch(SignUp(userData, navigate));
    };

    return (
        <BackGround>

            <Form>

                <TitleArea>
                    Genshin Pyro Blossom
                </TitleArea>

                <InputArea>

                    {isEmailEntered ?
                        <>

                        </>
                        :
                        <RequestEmailVerify onChange={onChange} userData={userData} setIsEmailEntered={setIsEmailEntered} setIsPasswordEntered={setIsPasswordEntered} />
                    }

                    {isPasswordEntered ?
                        <>

                        </>
                        :
                        <RequestPasswordVerify onChange={onChange} userData={userData} setIsPasswordEntered={setIsPasswordEntered} setIsOtherEntered={setIsOtherEntered} />
                    }

                    {isOtherEntered ?
                        <>

                        </>
                        :
                        <RequestOtherVerify onChange={onChange} userData={userData} onSubmit={onSubmit} />
                    }

                </InputArea>

                <ButtonArea>

                </ButtonArea>

            </Form>
        </BackGround>
    );
};
