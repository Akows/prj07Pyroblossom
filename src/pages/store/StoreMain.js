import React from 'react'
import styled from 'styled-components';

// import React, { useEffect, useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { Test1, Test2 } from '../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 120px;
`;
const StoreTitleArea = styled.div`
    width: 90%;
    height: 300px;

    border: 2px solid black;
`;
const StoreSlideShowArea = styled.div`
    width: 90%;
    height: 400px;

    margin-top: 30px;

    border: 2px solid black;
`;
const StoreListArea = styled.div`
    width: 90%;
    height: 800px;

    margin-top: 30px;
    margin-bottom: 30px;

    border: 2px solid black;
`;

export const StoreMain = () => {

    // const navigate = useNavigate();

    // const dispatch = useDispatch();
    // const getUserState = useSelector((state) => state.user);
    // const getStoreState = useSelector((state) => state.store);

    // const [isUserError, setIsUserError] = useState(false);
    // const [isUserLoading, setIsUserLoading] = useState(false);
    // const [isStoreError, setIsStoreError] = useState(false);
    // const [isStoreLoading, setIsStoreLoading] = useState(false);

    // useEffect(() => {
    //     setIsUserError(getUserState.flagvalue.isError);
    //     setIsUserLoading(getUserState.flagvalue.isLoading);
    // }, [getUserState.flagvalue]);

    // useEffect(() => {
    //     setIsStoreError(getStoreState.flagValue.isError);
    //     setIsStoreLoading(getStoreState.flagValue.isLoading);
    // }, [getStoreState.flagValue]);

    return (
        <BackGround>

            <StoreTitleArea>
                굿즈스토어 제목
            </StoreTitleArea>
            <StoreSlideShowArea>
                스토어 이미지 슬라이스 쇼
            </StoreSlideShowArea>
            <StoreListArea>
                물건 리스트들
            </StoreListArea>

        </BackGround>
    );
};
