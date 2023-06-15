import React from 'react'
import { useNavigate } from 'react-router-dom';
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

    & > div > p:nth-child(1) {
        opacity: 0.4;
    };
`;

const CompleteText = styled.div`
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
`;
const DeliveryAddress = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    font-size: 28px;

    & > p:nth-child(2) {
        margin-top: 10px;

        font-size: 20px;
    };
    & > p:nth-child(3) {
        font-size: 20px;
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

export const PurchaseComplete = () => {

    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/store/mypage');
    };

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

            <CompleteText>

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
                    <DeliveryAddress>
                        <p>배송주소</p>

                        <p>서울특별시 서울구 서울동 서울서울</p>
                        <p>서울아파트 서울동 서울호</p>
                    </DeliveryAddress>

                </ShippingAddress>

                <BuyerBenefit>
                    <p>할인 및 최종결제 내역</p>

                    <PriceInfo>
                        <p>주문금액 : 30,000원</p>
                        <p>배송비 : 0원</p>
                        <p>할인 : 5,000원</p>
                        <p>결제금액 : 25,000원</p>
                    </PriceInfo>

                </BuyerBenefit>


                <PaymentSubmit>
                    <p>주문이 완료되었습니다. 구매해주셔서 감사합니다^^</p>

                    <button onClick={onSubmit}>확인</button>
                </PaymentSubmit>





            </CompleteText>
        </>
    );
};
