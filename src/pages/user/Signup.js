import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { RequestTermsAgreement } from '../../components/user/signup/RequestTermsAgreement';
import { RequestEmailAndPasswordVerify } from '../../components/user/signup/RequestEmailAndPasswordVerify';
import { RequestOtherVerify } from '../../components/user/signup/RequestOtherVerify';

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
        phonenumber: '',
        displayname: '',
        address: '',
        address2: '',
    });

    const [isTermsAgreement, setIsTermsAgreement] = useState(false);
    const [isEmailAndPasswordEntered, setIsEmailAndPasswordEntered] = useState(true);
    const [isOtherEntered, setIsOtherEntered] = useState(true);
    // const [isSignupComplete, setIsSignupComplete] = useState(true);

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerText = 'User Signup';
    });

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
                <RequestOtherVerify userData={userData} setUserData={setUserData} navigate={navigate} dispatch={dispatch} getUserState={getUserState} setIsOtherEntered={setIsOtherEntered} />
            }

            {/* {isSignupComplete ?
                <></>
                :
                <SignupComplete userData={userData} getUserState={getUserState} />
            } */}


        </BackGround>
    );
};
