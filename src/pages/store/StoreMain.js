import React from 'react'
import styled from 'styled-components';

// import React, { useEffect, useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { Test1, Test2 } from '../../redux/actions/storeAction';

import BackgroundImagesrc from '../../assets/images/background/upLiyueport2.jpg';

import MainImagesrc from '../../assets/images/System_Shop.webp';
import Sub1Imagesrc from '../../assets/images/character_eula_portrait.png';
import Sub2Imagesrc from '../../assets/images/Character_Klee_Full_Wish.webp';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
    z-index: 0;

    background-color: rgba( 65, 71, 89, 1 );
    background-attachment: fixed;
`;

const BackGroundImage = styled.div`
    width: 100%;
    height: 500px;

    position: absolute;
    z-index: -100;

    background-image: url(${BackgroundImagesrc});
    background-size: 100% 100%;
    background-position: 0px 0px;
    background-repeat: no-repeat;
`

const InnerContents = styled.div`
    width: 100%;
    height: 100%;

    z-index: 100;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StoreTitleArea = styled.div`
    width: 90%;
    height: 300px;

    margin-top: 120px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

const TitleSub1Image = styled.div`
    width: 35%;
    height: 100%;

    overflow: visible;

    & > img {
        width: 600px;
        height: 900px;

        margin-top: -120px;
        margin-left: -90px;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
`;
const TitleMainImage = styled.div`
    width: 25%;
    height: 100%;

    background-image: url(${MainImagesrc});
    background-size: 300px 300px;
    background-position: center;
    background-repeat: no-repeat;
`;
const TitleSub2mage = styled.div`
    width: 35%;
    height: 100%;

    & > img {
        width: 700px;
        height: 900px;

        margin-top: -120px;
        margin-left: -50px;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
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
            <BackGroundImage />

            <InnerContents>

                <StoreTitleArea>
                    <TitleSub1Image>
                        {/* <img src={Sub1Imagesrc} alt=''></img> */}
                    </TitleSub1Image>
                    <TitleMainImage>

                    </TitleMainImage>
                    <TitleSub2mage>
                        {/* <img src={Sub2Imagesrc} alt=''></img> */}
                    </TitleSub2mage>

                </StoreTitleArea>
                <StoreSlideShowArea>
                    스토어 이미지 슬라이스 쇼
                </StoreSlideShowArea>
                <StoreListArea>
                    물건 리스트들
                </StoreListArea>


            </InnerContents>
        </BackGround>
    );
};
