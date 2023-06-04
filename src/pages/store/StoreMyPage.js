import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Imagesrc1 from '../../assets/images/Genshin-Impact-Logo.webp';
import Imagesrc2 from '../../assets/images/System_Shop.webp';

import productimg from '../../assets/images/testImg/testproductimg.jpg';

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

const MyPageNavigation = styled.div`
    width: 1200px;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: #D3BC8E;
    border-radius: 5px;

    color: #414147;
`;

const LogoAndCompoButton = styled.div`
    width: 70%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > a > img {
        width: 80px;
        height: 95%;

        margin-left: 10px;
    };
`;
const NavUtilButton = styled.div`
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & > a > img {
        width: 80px;
        height: 95%;

        margin-left: 10px;
    };
`;

const NavCompoButton = styled.div`
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











const InnerContents = styled.div`
    width: 1200px;
    height: 100%;

    margin-top: 20px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const ComponentArea = styled.div`
    width: 68%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;



const UserMyPage = styled.div`
    width: 100%;
    height: 100%;

    margin: 10px;
`;

const UserCompoButton = styled.div`
    width: 97%;
    height: 100px;

    border: 1px solid gray;
    border-radius: 15px;
`;

const UserUtilButton = styled.div`
    width: 97%;
    height: 100px;

    margin-top: 10px;

    border: 1px solid gray;
    border-radius: 15px;
`;

const UserComponent = styled.div`
    width: 97%;
    height: 100%;

    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const PurchaseHistory = styled.div`
    width: 95%;
    height: 240px;

    margin-top: 5px;
    margin-bottom: 10px;

    padding: 15px;

    border: 1px solid gray;
    border-radius: 15px;
`;

const History1 = styled.div`
    width: 100%;

    font-size: 20px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > p:nth-child(2):hover {
        color: #414147;
    }
`;
const History2 = styled.div`
    width: 95%;
    
    margin-top: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;
const ProductImg = styled.div`
    width: 120px;
    height: 120px;

    & > img {
        width: 100%;
        height: 100%;

        border-radius: 15px;
    };
`;
const ProductInfo = styled.div`
    width: 80%;
    height: 95%;

    margin-left: 10px;

    & > p {
        font-size: 20px;
    };
    & > p:nth-child(1) {
        font-size: 15px;
        opacity: 0.7;
    };
    & > p:nth-child(2) {
        font-size: 18px;

        margin-top: 3px;
    };
    & > p:nth-child(3) {
        margin-top: 8px;
    };
    & > p:nth-child(4) {
        margin-top: 12px;
    };
`;

const History3 = styled.div`
    width: 95%;

    margin-top: 10px;

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




















const UserInfoArea = styled.div`
    width: 29%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;




const B1 = styled.div`
    width: 100%;
    height: 250px;

    border: 2px solid black;
`;
const B2 = styled.div`
    width: 100%;
    height: 750px;

    border: 2px solid black;
`;

export const StoreMyPage = () => {
    return (
        <BackGround>

            <MyPageNavigation>

                <LogoAndCompoButton>
                    <Link to='/'>
                        <img src={Imagesrc1} alt='' />
                    </Link>

                    <NavCompoButton>
                        결제내역
                    </NavCompoButton>
                </LogoAndCompoButton>

                <NavUtilButton>

                    <Link to='/store'>
                        <img src={Imagesrc2} alt='' />
                    </Link>

                    <NavCompoButton>
                        장바구니
                    </NavCompoButton>
                </NavUtilButton>

            </MyPageNavigation>

            <InnerContents>
                <ComponentArea>

                    <UserMyPage>

                        <UserCompoButton>

                        </UserCompoButton>
                        <UserUtilButton>

                        </UserUtilButton>

                        <UserComponent>

                            <PurchaseHistory>
                                <History1>
                                    <p>구매상태</p>
                                    <p>X</p>
                                </History1>
                                <History2>
                                    <ProductImg>
                                        <img src={productimg} alt='' />
                                    </ProductImg>
                                    <ProductInfo>
                                        <p>04.13 구매</p>
                                        <p>통통폭탄인형</p>
                                        <p>30,000원</p>

                                    </ProductInfo>

                                </History2>
                                <History3>
                                    <button>주문상세</button>
                                </History3>
                            </PurchaseHistory>


                            <PurchaseHistory>
                                <History1>
                                    <p>구매상태</p>
                                    <p>X</p>
                                </History1>
                                <History2>
                                    <ProductImg>
                                        <img src={productimg} alt='' />
                                    </ProductImg>
                                    <ProductInfo>
                                        <p>04.13 구매</p>
                                        <p>통통폭탄인형</p>
                                        <p>30,000원</p>

                                    </ProductInfo>

                                </History2>
                                <History3>
                                    <button>주문상세</button>
                                </History3>
                            </PurchaseHistory>


                            <PurchaseHistory>
                                <History1>
                                    <p>구매상태</p>
                                    <p>X</p>
                                </History1>
                                <History2>
                                    <ProductImg>
                                        <img src={productimg} alt='' />
                                    </ProductImg>
                                    <ProductInfo>
                                        <p>04.13 구매</p>
                                        <p>통통폭탄인형</p>
                                        <p>30,000원</p>

                                    </ProductInfo>

                                </History2>
                                <History3>
                                    <button>주문상세</button>
                                </History3>
                            </PurchaseHistory>

                        </UserComponent>


                    </UserMyPage>


                </ComponentArea>
                <UserInfoArea>
                    <B1>
                        유저 프로필
                    </B1>
                    <B2>
                        사이드 메뉴
                    </B2>
                </UserInfoArea>
            </InnerContents>





        </BackGround>
    );
};
