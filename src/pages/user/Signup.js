import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RequestTermsAgreement } from '../../components/signup/RequestTermsAgreement';
import { RequestEmailAndPasswordVerify } from '../../components/signup/RequestEmailAndPasswordVerify';
import { RequestOtherVerify } from '../../components/signup/RequestOtherVerify';
import { SignupComplete } from '../../components/signup/SignupComplete';

import { isLoginCheck } from '../../redux/actions/userAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Signup = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        displayname: '',
        address: '',
        address2: '',
    });

    const [isTermsAgreement, setIsTermsAgreement] = useState(false);
    const [isEmailAndPasswordEntered, setIsEmailAndPasswordEntered] = useState(true);
    const [isOtherEntered, setIsOtherEntered] = useState(true);
    const [isSignupComplete, setIsSignupComplete] = useState(true);

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'User Signup';

        dispatch(isLoginCheck());
        dispatch({ type: 'STATE_INIT' });
        // eslint-disable-next-line
    }, []);

    return (
        <BackGround>

            {isTermsAgreement ?
                <></>
                :
                <RequestTermsAgreement setIsTermsAgreement={setIsTermsAgreement} setIsEmailAndPasswordEntered={setIsEmailAndPasswordEntered} />
            }

            {isEmailAndPasswordEntered ?
                <></>
                :
                <RequestEmailAndPasswordVerify userData={userData} setUserData={setUserData} getUserState={getUserState} dispatch={dispatch} setIsEmailAndPasswordEntered={setIsEmailAndPasswordEntered} setIsOtherEntered={setIsOtherEntered} />
            }

            {isOtherEntered ?
                <></>
                :
                <RequestOtherVerify userData={userData} setUserData={setUserData} navigate={navigate} dispatch={dispatch} getUserState={getUserState} setIsOtherEntered={setIsOtherEntered} setIsSignupComplete={setIsSignupComplete} />
            }

            {isSignupComplete ?
                <></>
                :
                <SignupComplete userData={userData} getUserState={getUserState} />
            }


        </BackGround>
    );
};
