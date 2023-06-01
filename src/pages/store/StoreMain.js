import React from 'react'
import styled from 'styled-components';
import '../../assets/animation.css';

// import React, { useEffect, useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { Test1, Test2 } from '../../redux/actions/storeAction';

import BackgroundImagesrc from '../../assets/images/background/upLiyueport2.jpg';

import MainImagesrc from '../../assets/images/System_Shop.webp';
// import Sub1Imagesrc from '../../assets/images/character_eula_portrait.png';
import Sub2Imagesrc from '../../assets/images/Character_Klee_Full_Wish.webp';
import Sildeshow from '../../components/SlideShow';
import { useNavigate } from 'react-router-dom';

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
    width: 100%;
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

    margin-top: 80px;

    z-index: 3;
`;
const StoreListArea = styled.div`
    width: 80%;
    height: 100%;

    margin-top: 30px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    z-index: 3;

    border: 2px solid black;
`;

const TitleMainImage = styled.div`
    width: 30%;
    height: 100%;

    z-index: 2;

    background-image: url(${MainImagesrc});
    background-size: 300px 300px;
    background-position: center;
    background-repeat: no-repeat;

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;
const TitleSub1Image = styled.div`
    width: 35%;
    height: 100%;

    @media screen and (max-width: 1000px) {
        width: 0%;
    }
`;
const TitleSub2Image = styled.div`
    width: 35%;
    height: 100%;

    margin-top: 360px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 1;

    & > img {
        width: 630px;
        height: 850px;

        opacity: 0.7;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;

        animation: storeSubImageAni 1s ease-in;
    }

    @media screen and (max-width: 1000px) {
        width: 0%;
        display: none;
    }
`;

const Product = styled.div`
    width: 300px;
    height: 330px;

    margin: 3px;

    border: 1px solid wheat;
`;
const ProductImg = styled.div`
    width: 100%;
    height: 80%;
`;
const ProductTitle = styled.div`
    width: 100%;
    height: 20%;

    font-size: 24px;
    color: #D3BC8E;
`;

export const StoreMain = () => {

    const navigate = useNavigate();

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

    const testDatas = [
        {
            id: '01',
            name: '1번 제품',
        },
        {
            id: '02',
            name: '2번 제품',
        },
        {
            id: '03',
            name: '3번 제품',
        },
        {
            id: '04',
            name: '4번 제품',
        },
        {
            id: '05',
            name: '5번 제품',
        },
        {
            id: '06',
            name: '6번 제품',
        },
    ];

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
                    <TitleSub2Image>
                        <img src={Sub2Imagesrc} alt=''></img>
                    </TitleSub2Image>

                </StoreTitleArea>
                <StoreSlideShowArea>
                    <Sildeshow />
                </StoreSlideShowArea>
                <StoreListArea>

                    {testDatas.map(item => (
                        <Product key={item.id} onClick={() => navigate(`/store/productdetail/${item.id}`)}>
                            <ProductImg>

                            </ProductImg>

                            <ProductTitle>
                                {item.name}
                            </ProductTitle>
                        </Product>
                    ))}

                </StoreListArea>


            </InnerContents>
        </BackGround>
    );
};
