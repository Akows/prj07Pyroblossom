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
        margin-left: 5px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    };

    & > fieldset > legend {
        margin-left: 10px;
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

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;

    & > p {
        margin-top: 10px;
        margin-left: 15px;
    };
`;

const PointInfo = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 10px;
    margin-left: 15px;

    border-bottom: 1px solid gray;

    & > p:nth-child(1) {
        font-size: 16px;
    };
`;

const PointUse = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > p {
        font-size: 16px;
    };
    & > input {
        width: 120px;
        height: 25px;

        margin-left: 10px;
        margin-right: 10px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;

        border-radius: 5px;

        border: none;
    };
    & > button {
        border: 2px solid #535B6C;
        border-radius: 25px;
        background-color: #50596B;

        font-family: 'GIFont';
        font-size: 16px;
        color: #D3BC8E;
    };
`;
const PriceInfo = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 10px;
    margin-left: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    font-size: 18px;
    opacity: 1;

    & > p {
        margin-top: 5px;
    };

    & > p:nth-child(1) {
        opacity: 0.6;
    };
    & > p:nth-child(2) {
        opacity: 0.6;
    };
    & > p:nth-child(3) {
        opacity: 0.6;
    };
    & > p:nth-child(4) {
        margin-top: 10px;
        margin-bottom: 15px;
        padding-top: 5px;

        border-top: 1px solid gray;
        font-size: 24px;
    };
`;

const PaymentMethod = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;

    & > p {
        margin-top: 10px;
        margin-left: 15px;
    };
`;
const PaymentWay = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    margin-left: 15px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    font-size: 18px;

    & > input {
        width: 20px;
        height: 20px;
    };
`;

const PaymentSubmit = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;

    & > p {
        margin-top: 10px;
        margin-left: 15px;
    };
    & > button {
        width: 200px;
        height: 45px;

        margin-top: 20px;
        margin-bottom: 20px;

        border: 2px solid #535B6C;
        border-radius: 25px;
        background-color: #50596B;

        font-family: 'GIFont';
        font-size: 32px;
        color: #D3BC8E;
    };
`;



export const OrderPurchase = ({ setWhatComponentIsShow }) => {

    const onSubmit = () => {
        const submitCheck = window.confirm('결제하시겠습니까?');

        if (!submitCheck) {
            return;
        }
        else {
            setWhatComponentIsShow('purchasecomplete');
        };
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
                    <p>할인 및 최종결제 내용</p>

                    <PointInfo>
                        <p>보유 포인트 : 3000p</p>

                        <PointUse>
                            <p>사용 :</p> <input /> <button>전액사용</button>
                        </PointUse>

                    </PointInfo>

                    <p>결제상세</p>

                    <PriceInfo>
                        <p>주문금액 : 30,000원</p>
                        <p>배송비 : 0원</p>
                        <p>할인 : 5,000원</p>
                        <p>결제금액 : 25,000원</p>
                    </PriceInfo>

                </BuyerBenefit>

                <PaymentMethod>
                    <p>결제수단</p>

                    <PaymentWay>
                        <input type='checkbox' checked /> <p>포인트 결제</p>
                    </PaymentWay>
                </PaymentMethod>


                <PaymentSubmit>
                    <p>주문 내용을 확인하였으며, 구매에 필요한 개인정보 제공에 동의합니다.</p>

                    <button onClick={onSubmit}>결제하기</button>
                </PaymentSubmit>

            </ProductListArea>
        </>
    );
};
