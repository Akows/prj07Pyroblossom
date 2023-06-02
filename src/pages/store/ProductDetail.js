import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Reviews } from './DetailComponents/Reviews';

import productimg from '../../assets/images/testImg/testproductimg.jpg';

import { QnA } from './DetailComponents/QnA';
import { ProductInfomation } from './DetailComponents/ProductInfomation';

const SpecialCharacter = styled.p`
    margin-left: 2px;
    margin-right: 2px;
`;

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: rgba( 65, 71, 89, 1 );
`;
const ProductTypeShowArea = styled.div`
    width: 90%;
    height: 20px;

    margin-top: 120px;

    font-size: 18px;
    color: #D3BC8E;
`;
const ProductInfoArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OtherInfoArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 30px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductInfo = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProductImg = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > img {
        width: 100%;
        height: 100%;
    };

    @media screen and (max-width: 1000px) {
        width: 90%;
    }
`;

const ProductPayInfo = styled.div`
    width: 50%;
    height: 100%;

    margin-left: 10px;

    @media screen and (max-width: 1000px) {
        width: 90%;
    }
`;

const ProductName = styled.div`
    width: 100%;
    height: 100%;

    font-size: 32px;
    color: #D3BC8E;

    margin-top: 10px;
    margin-bottom: 20px;
`;
const ProductPrice = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    margin-top: 10px;
    margin-bottom: 10px;
`;
const SalePer = styled.div`
    width: 10%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: #D3BC8E;
`;

const Price = styled.div`
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;
const ListPrice = styled.div`
    width: 80px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    font-size: 18px;
    color: #D3BC8E;

    text-decoration: line-through;
    opacity: 0.3;
`;
const LastPrice = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    font-size: 26px;
    color: #D3BC8E;

    margin-right: 5px;
    margin-left: 10px;
`;

const EventInfo = styled.div`
    width: 95%;
    height: 100%;

    font-size: 18px;
    color: #D3BC8E;

    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;

    border: 1px solid black;

    & > p {
        margin: 5px;
    };
`;

const PurchaseInfo = styled.div`
    width: 100%;
    height: 100%;

    font-size: 16px;
    color: #D3BC8E;

    & > p {
        margin: 3px;
    };
`;

const PurchaseSelect = styled.select`
    width: 100%;
    height: 40px;

    font-family: 'GIFont';
    font-size: 16px;

    border-radius: 10px;

    margin-top: 10px;
    margin-bottom: 15px;
`;

const PurchasePrice = styled.div`
    width: 100%;
    height: 100%;

    font-size: 16px;
    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    margin-top: 10px;
    margin-bottom: 10px;
`;
const PurchasePrice1 = styled.div`
    width: 20%;
    height: 100%;

    font-size: 18px;
`;
const PurchasePrice2 = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & > p:nth-child(1) {
        font-size: 18px;
        opacity: 0.8;
    };
    & > p:nth-child(3) {
        font-size: 24px;
    };
`;

const PurchaseOption = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    font-size: 22px;
    color: #D3BC8E;

    margin-top: 20px;
    margin-bottom: 20px;

    & > p {
        width: 100%;
    }
`;

const PurchaseOption1 = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > button {
        width: 30px;
        height: 30px;

        border: none;
        background-color: rgba( 65, 71, 89, 1 );
        color: #D3BC8E;

        font-family: 'GIFont';
        font-size: 22px;
    };
`;

const PurchaseOption2 = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin-top: 10px;
    margin-bottom: 10px;

    & > div {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    };
    & > div:nth-child(1) {
        width: 90px;

        justify-content: flex-start;
    };
    & > div:nth-child(1) > button {
        width: 30px;
        height: 30px;

        text-align: center;

        font-family: 'GIFont';
        font-size: 22px;
    };
    & > div:nth-child(1) > p {
        width: 30px;
        height: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
    };

    & > div:nth-child(2) {
        justify-content: flex-end;
    };
`;


const PurchaseUtil = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    margin-top: 10px;
    margin-bottom: 15px;

    & > button {
        width: 45%;
        height: 100%;

        border: none;
        border-radius: 5px;

        font-family: 'GIFont';
        font-size: 16px;
    };
    & > button:hover {
        background-color: gray;
    };
`;


const PurchaseButton = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;

    & > button {
        width: 95%;
        height: 100%;

        border: none;
        border-radius: 5px;

        font-family: 'GIFont';
        font-size: 16px;
    };
    & > button:hover {
        background-color: gray;
    };
`;






const OtherInfo = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const OtherInfoButtons = styled.div`
    width: 100%;
    height: 55px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > button {
        width: 30%;
        height: 100%;

        margin: 3px;

        border: none;
        border-radius: 2px;

        font-family: 'GIFont';
        font-size: 16px;

        @media screen and (max-width: 1000px) {
            width: 100%;
            height: 33.3%;
        };
    };
    & > button:hover {
        border: 3px solid gray;
    };

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        height: 150px;
    };
`;

const OtherInfoComponentArea = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 20px;

`;

export const ProductDetail = () => {

    const { id } = useParams();

    const [whatCompoIsShow, setWhatCompoIsShow] = useState('review');

    const OtherInfoScrollMovePoint = useRef();

    useEffect(() => {
        OtherInfoScrollMovePoint.current?.scrollIntoView({ behavior: 'smooth' });
    }, [whatCompoIsShow])


    return (
        <BackGround>

            <ProductTypeShowArea>
                1차 카테고리 {'>'} 2차 카테고리 {'>'} {id}
            </ProductTypeShowArea>

            <ProductInfoArea>
                <ProductInfo>
                    <ProductImg>
                        <img src={productimg} alt=''></img>
                    </ProductImg>
                    <ProductPayInfo>
                        <ProductName>
                            통통폭탄인형
                        </ProductName>
                        <ProductPrice>
                            <SalePer>
                                10%
                            </SalePer>

                            <Price>
                                <ListPrice>
                                    5000원
                                </ListPrice>
                                <LastPrice>
                                    4500원
                                </LastPrice>
                            </Price>
                        </ProductPrice>



                        <EventInfo>
                            <p>회원님을 위한 해택</p>
                            <hr />

                            <p>적립포인트 : 0.1%, 45p</p>
                            <p>이벤트 : 텍스트 리뷰 100p</p>
                            <p>사은품 : </p>
                        </EventInfo>





                        <PurchaseInfo>
                            <p>택배배송 : 무료, 우체국택배</p>
                            <p>도서산간지역 3,000원</p>
                            <hr />

                            <PurchaseSelect>
                                <option>통통폭탄인형</option>
                            </PurchaseSelect>

                        </PurchaseInfo>

                        <PurchaseOption>
                            <PurchaseOption1>
                                <p>통통폭탄인형</p>

                                <button>X</button>
                            </PurchaseOption1>

                            <PurchaseOption2>

                                <div>
                                    <button>-</button>
                                    <p>0</p>
                                    <button>+</button>
                                </div>

                                <div>
                                    <p>0원</p>
                                </div>

                            </PurchaseOption2>
                        </PurchaseOption>

                        <PurchasePrice>
                            <PurchasePrice1>
                                전체 금액
                            </PurchasePrice1>
                            <PurchasePrice2>
                                <p>전체 수량 : 0개</p>

                                <SpecialCharacter>&#124;</SpecialCharacter>

                                <p>0원</p>
                            </PurchasePrice2>
                        </PurchasePrice>

                        <PurchaseUtil>
                            <button>찜하기</button>
                            <button>장바구니</button>
                        </PurchaseUtil>

                        <PurchaseButton ref={OtherInfoScrollMovePoint}>
                            <button>구매하기</button>
                        </PurchaseButton>
                    </ProductPayInfo>
                </ProductInfo>
            </ProductInfoArea>

            <OtherInfoArea>
                <OtherInfo>
                    <OtherInfoButtons>
                        <button onClick={() => setWhatCompoIsShow('review')}>
                            리뷰
                        </button>
                        <button onClick={() => setWhatCompoIsShow('info')}>
                            제품정보
                        </button>
                        <button onClick={() => setWhatCompoIsShow('qna')}>
                            QnA
                        </button>
                    </OtherInfoButtons>

                    <OtherInfoComponentArea>

                        {whatCompoIsShow === 'review' && <Reviews />}
                        {whatCompoIsShow === 'info' && <ProductInfomation />}
                        {whatCompoIsShow === 'qna' && <QnA />}

                    </OtherInfoComponentArea>
                </OtherInfo>


            </OtherInfoArea>

        </BackGround>
    );
};