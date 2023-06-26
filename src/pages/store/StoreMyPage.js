import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Loading } from '../../components/Loading';
import { PointChargeModal } from '../../components/store/PointChargeModal';

import { AdminProductManagement } from '../../components/store/myPage/AdminProductManagement';
import { AdminProductUpload } from '../../components/store/myPage/AdminProductUpload';
import { MyPageNavigation } from '../../components/store/myPage/MyPageNavigation';
import { PointHistory } from '../../components/store/myPage/PointHistory';

import { PurchaseHistory } from '../../components/store/myPage/PurchaseHistory';
import { GetUserData } from '../../redux/actions/userAction';
import { Link } from 'react-router-dom';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba( 65, 71, 89, 1 );

    color: #D3BC8E;
`;

const InnerContents = styled.div`
    width: 1200px;
    height: 100%;

    margin-top: 20px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    };
`;

const ComponentArea = styled.div`
    width: 68%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;



const UserMyPage = styled.div`
    width: 100%;
    height: 100%;

    margin: 10px;

    @media screen and (max-width: 1200px) {
        margin: 0px;
        margin-top: 10px;
    };
`;

const UserCompoButton = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px;
`;
const CompoButton = styled.div`
    width: 150px;
    height: 50px;

    margin: 5px;

    font-size: 22px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px;

    &:hover {
        border: 3px solid gray;
    };
`;

const UserInfoArea = styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;

const UserProfile = styled.div`
    width: 100%;
    height: 100%;

    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const UserInfo = styled.div`
    width: 100%;
    height: 50px;

    margin-top: 10px;

    font-size: 18px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > p:nth-child(2) {
        margin-top: 3px;
        font-size: 22px;

        @media screen and (max-width: 370px) {
            font-size: 18px;
        };
    };

    @media screen and (max-width: 600px) {
        align-items: center;
        justify-content: center;
    };
`;
const UserPoint = styled.div`
    width: 100%;
    height: 50px;

    margin-top: 10px;

    border: none;
    border-radius: 5px;
    background-color: #D3BC8E;
    color: #414147;

    font-size: 18px;

    & > p:nth-child(1) {
        margin-top: 3px;
    };
    & > p:nth-child(2) {
        margin-top: 3px;
        font-size: 22px;
    };
`;

const UserPointRecharge = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > button {
        width: 200px;
        height: 50px;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;

        font-family: 'GIFont';
        font-size: 16px;
    };
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;

const BasketButton = styled.div`
    width: 200px;
    height: 50px;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 5px;
    background-color: #D3BC8E;

    font-family: 'GIFont';
    font-size: 16px;

    &:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
    & > a {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        color: #414147;
    };
`;


const AdminInnerContents = styled.div`
    width: 1200px;
    height: 100%;

    margin-top: 20px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;

const AdminCompoButton = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px;
`;

export const StoreMyPage = () => {

    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);
    const getStoreState = useSelector((state) => state.store);

    const [userDatas, setUserDatas] = useState();

    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const [whatCompoIsShow, setWhatCompoIsShow] = useState('history');

    const [isShowModal, setIsShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [updateData, setUpdateData] = useState({});

    const setWhatComponentsRender = (name) => {
        setWhatCompoIsShow(name);
    };

    useEffect(() => {
        if (getUserState.userdata) {
            dispatch(GetUserData(getUserState.userdata.email));
        };

        if (getUserState.userdata.displayName === 'Admin') {
            setIsAdminLogin(true);
            setWhatCompoIsShow('productmanage');
        }
        else {
            setIsAdminLogin(false);
            setWhatCompoIsShow('history');

            // if (getStoreState.flagValue.isRendering) {
            //     setWhatCompoIsShow('history');
            // };
        };

        // eslint-disable-next-line
    }, [getStoreState.flagValue.isRendering]);

    useEffect(() => {
        setUserDatas(getUserState.userdata);

        // 새로고침이 일어났을 때 point 정보가 없다면?
        // 유저 정보를 호출하여 Redux Store에 넣는다.
        if (!getUserState.userdata.point) {
            dispatch(GetUserData(getUserState.userdata.email));
        };
        // eslint-disable-next-line
    }, [getUserState.userdata])

    useEffect(() => {
        setIsLoading(getStoreState.flagValue.isLoading);
    }, [getStoreState.flagValue]);

    useEffect(() => {
        if (getStoreState.processInfo.processCode === '작업 완료.') {
            setWhatCompoIsShow('productmanage');
        };
    }, [getStoreState.processInfo]);

    return (
        <BackGround>

            {isLoading && <Loading />}

            <MyPageNavigation isAdminLogin={isAdminLogin} />

            {!isAdminLogin &&
                <InnerContents>
                    <UserInfoArea>
                        <UserProfile>

                            <UserInfo>
                                <p>{userDatas?.name}님!</p>
                                <p>{userDatas?.email}</p>
                            </UserInfo>
                            <UserPoint>
                                <p>귀하의 포인트는</p>
                                <p>{userDatas?.point}P입니다.</p>
                            </UserPoint>
                            <UserPointRecharge>
                                <button onClick={() => setIsShowModal(true)}>포인트 충전하기</button>
                            </UserPointRecharge>

                            <BasketButton>
                                <Link to='/store/mypage/shoppingbasket'>
                                    장바구니 보기
                                </Link>
                            </BasketButton>

                        </UserProfile>

                    </UserInfoArea>

                    <ComponentArea>

                        <UserMyPage>

                            <UserCompoButton>
                                <CompoButton onClick={() => setWhatComponentsRender('history')}>
                                    결제내역
                                </CompoButton>

                                <CompoButton onClick={() => setWhatComponentsRender('consumption')}>
                                    포인트 내역
                                </CompoButton>
                            </UserCompoButton>

                            {whatCompoIsShow === 'history' && <PurchaseHistory userdata={getUserState.userdata} />}

                            {whatCompoIsShow === 'consumption' && <PointHistory userdata={getUserState.userdata} />}

                        </UserMyPage>


                    </ComponentArea>
                </InnerContents>
            }

            {isAdminLogin &&
                <AdminInnerContents>

                    <AdminCompoButton>
                        <CompoButton onClick={() => {
                            if (Object.keys(updateData).length !== 0) {
                                const choiceResult = window.confirm('제품 수정을 취소하시겠어요?');

                                if (!choiceResult) {
                                    return;
                                }
                                else {
                                    setUpdateData({});
                                    setWhatComponentsRender('productmanage');
                                    return;
                                };
                            };

                            const choiceResult = window.confirm('제품 등록을 취소하시겠어요?');

                            if (!choiceResult) {
                                return;
                            }
                            else {
                                setUpdateData({});
                                setWhatComponentsRender('productmanage')
                                return;
                            };
                        }}>
                            제품 조회/삭제
                        </CompoButton>
                        <CompoButton onClick={() => setWhatComponentsRender('productupload')}>
                            제품 등록/수정
                        </CompoButton>
                    </AdminCompoButton>

                    <ComponentArea>

                        {whatCompoIsShow === 'productupload' && <AdminProductUpload isLoading={isLoading} updateData={updateData} />}

                        {whatCompoIsShow === 'productmanage' && <AdminProductManagement setWhatCompoIsShow={setWhatCompoIsShow} setUpdateData={setUpdateData} />}

                    </ComponentArea>
                </AdminInnerContents>
            }

            <PointChargeModal userData={userDatas} isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

        </BackGround >
    );
};
