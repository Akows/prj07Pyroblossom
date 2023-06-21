import React, { useEffect, useState } from 'react'
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

    & > div:nth-child(2) {
        font-size: 18px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    };

    & > div > p {
        margin: 10px;
    };

    & > div > p:nth-child(2) {
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
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    margin-bottom: 20px;

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
        width: 95%;
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

    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 0px 0px;

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



export const OrderPurchase = ({ setWhatComponentIsShow, purchaseData, productData }) => {

    const [purchaseDatas, setPurchaseDatas] = useState([]);

    const onSubmit = () => {
        console.log(purchaseData);
        console.log(productData);

        // const submitCheck = window.confirm('결제하시겠습니까?');

        // if (!submitCheck) {
        //     return;
        // }
        // else {
        //     setWhatComponentIsShow('purchasecomplete');
        // };
    };

    useEffect(() => {
        setPurchaseDatas(purchaseData.purchaseList);
    }, [purchaseData]);

    return (
        <>
            <ProductListButtonArea>
                <p>주문/결제</p>

                <div>
                    <p>주문/결제</p>
                    {'>'}
                    <p>완료</p>
                </div>
            </ProductListButtonArea>

            <ProductListArea>

                {purchaseDatas?.map((item) => (
                    <ProductInfo key={item.optionNumber}>

                        <ProductImg>
                            <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${productData[0].name}%2F${productData[0]?.productInformationFile.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                        </ProductImg>
                        <PurchaseInfo>

                            <PurchaseName>
                                <p>{item.optionName}</p>
                            </PurchaseName>
                            <DeliveryInfo>
                                <p>구매수량 : {item.purchaseQuantity}개</p>
                                {productData[0]?.deliveryFee === 0 ? <p>무료배송</p> : <p>배송료 : {productData[0]?.deliveryFee}원</p>}
                            </DeliveryInfo>
                            <PurchasePrice>
                                {productData[0]?.price > item.optionPrice ? <p>(-) {productData[0]?.discountRate}%</p> : <p></p>}
                                <p>{item.totalAmount}원</p>
                            </PurchasePrice>

                        </PurchaseInfo>

                    </ProductInfo>
                ))}







                <ShippingAddress>
                    <fieldset>
                        <legend>배송지 정보</legend>

                        <div>
                            <input type="checkbox" id='formerdeliveryaddress' name='기존배송지' />
                            <label htmlFor='formerdeliveryaddress'>기존 배송지</label>
                        </div>
                        <div>
                            <input type="checkbox" id='newdeliveryaddress' name='신규배송지' />
                            <label htmlFor='newdeliveryaddress'>신규 배송지</label>
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
                        <p>주문금액 : {purchaseData.totalAmount}원</p>
                        <p>배송비 : {productData[0]?.deliveryFee}원</p>
                        <p></p>
                        <p>결제금액 : {purchaseData.totalAmount + parseInt(productData[0]?.deliveryFee)}원</p>
                    </PriceInfo>

                </BuyerBenefit>

                <PaymentMethod>
                    <p>결제수단</p>

                    <PaymentWay>
                        <input type='checkbox' value='' checked /> <p>포인트 결제</p>
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
