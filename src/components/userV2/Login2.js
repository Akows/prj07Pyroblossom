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

    const [inputUserData, setInputUserData] = useState({
        email: '',
        password: '',
    });

    // 각종 프론트 상황 동작에 필요한 플래그 State들.
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    // input 태그에서 입력값을 감지하여 동작하는 함수.
    const onChange = (event) => {
        // 입력값은 받아서 set.
        // id와 value값을 기준으로 inputUserData 객체에 적절한 값을 찾아서 갱신.
        // 기존 객체 내부의 값은 ... 연산자를 이용하여 불변성을 유지.
        setInputUserData({ ...inputUserData, [event.target.id]: event.target.value });

        // 또한 입력값의 id를 기준으로 값이 입력되었을 경우 Empty 변수를 false로 변환.
        if (event.target.id === 'email') {
            setIsEmailEmpty(false);
        };

        if (event.target.id === 'password') {
            setIsPasswordEmpty(false);
        };
    };

    // 로그인 기능을 동작하는 함수.
    const onSubmit = (event) => {
        // 버튼의 기본 이벤트 제거.
        event.preventDefault();

        // 어느 한 쪽의 입력값이 존재하지 않으면 Empty 변수를 true로 변환하고 함수를 종료.
        if (!inputUserData.email) {
            setIsEmailEmpty(true);
            return;
        };

        if (!inputUserData.password) {
            setIsPasswordEmpty(true);
            return;
        };

        // 이상이 없으면 입력값과 페이지 이동을 위한 navigate 객체를 인자로 담아 dispatch.
        dispatch(logIn(inputUserData, navigate));
        // eslint-disable-next-line
    };

    // 에러 화면이 출력되었을 때, 화면을 종료하는 버튼.
    const onClickError = () => {
        // Error 변수를 false로 변환하고 입력 데이터의 값을 초기화.
        setIsError(false);
        setInputUserData({});
    };

    // 페이지가 처음 렌더링되면 브라우저 탭의 제목을 변경하고 로그인 여부를 체크.
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'User Login';

        dispatch(isLoginCheck());
        // eslint-disable-next-line
    }, []);

    // Redux Store에서 State가 갱신될 때마다, 당 컴포넌트의 플래그 변수도 갱신되도록.
    useEffect(() => {
        setIsError(getUserData.processvalue.isError);
        setIsLoading(getUserData.processvalue.isLoading);
        // eslint-disable-next-line
    }, [getUserData]);





    // 개발용 임시 로그인 버튼
    const devLogin = () => {
        dispatch(logIn('admin@admin.com', '123123', navigate));
    };

    return (
        <>
            {/* 기본 UI. */}
            {/* 기본 UI. */}

            <BackGround>
                <FormBorder>
                    <InnerContents>

                        <FormTitle>
                            <p>회원 로그인</p>
                        </FormTitle>

                        <FormInputNoButton>
                            <Input isEmpty={isEmailEmpty} onChange={onChange} value={inputUserData.email} type='email' id='email' placeholder='이메일 주소를 입력해주세요' spellcheck='false' />
                            <OkMassageNoButton>사용 가능한 이메일 주소입니다.</OkMassageNoButton>
                        </FormInputNoButton>

                        <FormInputNoButton>
                            <Input isEmpty={isPasswordEmpty} onChange={onChange} value={inputUserData.password} type='password' id='password' placeholder='비밀번호를 입력해주세요' spellcheck='false' />
                            <OkMassageNoButton>사용 가능한 비밀번호입니다.</OkMassageNoButton>
                        </FormInputNoButton>

                        <FormScript>
                            <Script>* 이메일 인증을 통과하지 않으면 가입할 수 없습니다.</Script>
                            <Script>* 이메일 주소는 계정 아이디로 사용됩니다.</Script>
                        </FormScript>

                        {isLoading ?
                            <>
                                <SubmitButton disabled={true}>다음</SubmitButton>
                            </>
                            :
                            <>
                                <SubmitButton onClick={onSubmit}>다음</SubmitButton>
                            </>
                        }

                        <MoveToSignUp>
                            <p>아직 회원이 아니신가요?</p>&nbsp;
                            <Link to='/user/signup'>
                                회원가입
                            </Link>
                        </MoveToSignUp>

                    </InnerContents>
                </FormBorder >
            </BackGround>

            {/* 에러 상황 시에만 렌더링되는 에러 모달 창. */}
            {/* 에러 상황 시에만 렌더링되는 에러 모달 창. */}

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

                    <ErrorButton onClick={onClickError}>
                        닫기
                    </ErrorButton>

                </ErrorInnerContents>
            </ErrorModalBorder>

        </>
    );
};
