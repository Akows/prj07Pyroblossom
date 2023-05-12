import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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

    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        displayName: '',
        address: '',
    });

    const [isTermsAgreement, setIsTermsAgreement] = useState(false);
    const [isEmailAndPasswordEntered, setIsEmailAndPasswordEntered] = useState(true);
    const [isOtherEntered, setIsOtherEntered] = useState(true);
    const [isSignupComplete, setIsSignupComplete] = useState(true);

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'User Signup';

        dispatch(isLoginCheck());
        dispatch({ type: 'PROCESSINIT' });
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
                <RequestEmailAndPasswordVerify userData={userData} setUserData={setUserData} dispatch={dispatch} getUserState={getUserState} setIsEmailAndPasswordEntered={setIsEmailAndPasswordEntered} setIsOtherEntered={setIsOtherEntered} />
            }

            {isOtherEntered ?
                <></>
                :
                <RequestOtherVerify setIsOtherEntered={setIsOtherEntered} setIsSignupComplete={setIsSignupComplete} />
            }

            {isSignupComplete ?
                <></>
                :
                <SignupComplete setIsSignupComplete={setIsSignupComplete} />
            }


        </BackGround>
    );
};
