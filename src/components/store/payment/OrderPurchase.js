import React from 'react'
import styled from 'styled-components';

import productimg from '../../../assets/images/testImg/testproductimg.jpg';

const ProductListButtonArea = styled.div`
    width: 90%;
    height: 50px;

    margin-top: 120px;

    font-size: 28px;
    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid gray;

    & > p:nth-child(2) {
        font-size: 18px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    };

    & > p > p {
        margin: 10px;
    };

    & > p > p:nth-child(2) {
        opacity: 0.4;
    };
`;

const ProductListArea = styled.div`
    width: 90%;
    height: 100%;

    font-size: 24px;
    color: #D3BC8E;

    margin-top: 30px;

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
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-top: 3px solid #D3BC8E;

    border-radius: 0px 0px 15px 15px;
`;
const ProductImg = styled.div`
    width: 20%;
    height: 100%;

    margin-top: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > img {
        width: 75%;
        height: 75%;

        border-radius: 20px;
    };
`;
const PurchaseInfo = styled.div`
    width: 80%;
    height: 100%;

    margin-top: 10px;
`;

const PurchaseName = styled.div`
    width: 100%;
    height: 50px;
`;
const DeliveryInfo = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    & > p {
        font-size: 18px;
        margin: 5px;
    };
`;
const PurchasePrice = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    & > p {
        font-size: 18px;
        margin: 5px;
    };

    & > p:nth-child(1) {
        font-size: 14px;
        text-decoration: line-through;
        opacity: 0.6;
    };
`;

const ShippingAddress = styled.div`
    width: 100%;
    height: 100%;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;

    & > fieldset {
        margin-top: 20px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    };

    & > fieldset > legend {
        margin-top: 20px;
        margin-bottom: 20px;
    };

    & > fieldset > div {
        font-size: 18px;
    };
`;
const DeliveryAddress = styled.div`
    width: 100%;
    height: 100%;

    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > input {
        width: 700px;
        height: 40px;

        margin-left: 10px;
        margin-bottom: 5px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;

        border-radius: 5px;

        border: none;
    };
    & > input:nth-child(1) {
        width: 200px;
    };
`;

const BuyerBenefit = styled.div`
    width: 100%;
    height: 100%;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;
`;






const A4 = styled.div`
    width: 100%;
    height: 100px;
`;

const A5 = styled.div`
    width: 100%;
    height: 100px;
`;



export const OrderPurchase = ({ setWhatComponentIsShow }) => {

    const onSubmit = () => {
        setWhatComponentIsShow('purchasecomplete');
    };

    return (
        <>
            <ProductListButtonArea>
                <p>주문/결제</p>

                <p>
                    <p>주문/결제</p>
                    {'>'}
                    <p>완료</p>
                </p>
            </ProductListButtonArea>

            <ProductListArea>
                <ProductInfo>

                    <ProductImg>
                        <img src={productimg} alt='' />
                    </ProductImg>
                    <PurchaseInfo>

                        <PurchaseName>
                            <p>통통폭탄인형</p>
                        </PurchaseName>
                        <DeliveryInfo>
                            <p>무료배송</p>
                            <p>1개</p>
                        </DeliveryInfo>
                        <PurchasePrice>
                            <p>(-) 5,000원</p>
                            <p>40,000원</p>
                        </PurchasePrice>

                    </PurchaseInfo>

                </ProductInfo>



                <ShippingAddress>
                    <fieldset>
                        <legend>배송지 정보</legend>

                        <div>
                            <input type="checkbox" id='formerdeliveryaddress' name='기존배송지' />
                            <label for='formerdeliveryaddress'>기존 배송지</label>
                        </div>
                        <div>
                            <input type="checkbox" id='newdeliveryaddress' name='신규배송지' />
                            <label for='newdeliveryaddress'>신규 배송지</label>
                        </div>
                    </fieldset>

                    <DeliveryAddress>
                        <input />
                        <input />
                        <input />
                    </DeliveryAddress>

                </ShippingAddress>


                <BuyerBenefit>
                    할인 및 최종결제 내용
                </BuyerBenefit>




                <A4>
                    결제수단 정보
                </A4>
                <A5 onClick={onSubmit}>
                    결제버튼
                </A5>

            </ProductListArea>
        </>
    );
};
