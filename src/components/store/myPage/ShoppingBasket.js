import React from 'react'
import styled from 'styled-components';

import productimg from '../../../assets/images/testImg/testproductimg.jpg';

const UserUtilButton = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    };

    & > button {
        width: 100px;
        height: 30px;

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

const PurchaseInfo = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const Info1 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info2 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info3 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info4 = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
    & > p:nth-child(2) {
        font-size: 18px;
    };
`;
const PurchaseInfoButton = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 5px;
    background-color: #D3BC8E;
    color: #414147;

    font-family: 'GIFont';
    font-size: 16px;

    &:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;


const UserComponent = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Basket = styled.div`
    width: 95%;
    height: 100%;

    margin-top: 5px;
    margin-bottom: 10px;

    padding: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    border: 1px solid gray;
    border-radius: 15px;

    & > input {
        width: 25px;
        height: 25px;
    };
`;


const BasketInfo = styled.div`
    width: 95%;
    
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


export const ShoppingBasket = () => {

    const onPurchase = () => {

    };

    return (
        <>
            <UserUtilButton>

                <div>
                    <input type='checkbox' />
                    <p>전체 선택</p>
                </div>

                <button>전체 삭제</button>

            </UserUtilButton>

            <UserComponent>

                <Basket>
                    <input type='checkbox' />

                    <BasketInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <ProductInfo>
                            <p>04.13 구매</p>
                            <p>통통폭탄인형</p>
                            <p>1개</p>
                            <p>30,000원, 무료배송</p>

                        </ProductInfo>
                    </BasketInfo>
                </Basket>







            </UserComponent>

            <PurchaseInfo>

                <Info1>
                    <p>선택상품금액</p>
                    <p>30,000원</p>
                </Info1>

                <p> + </p>

                <Info2>
                    <p>총배송비</p>
                    <p>0원</p>
                </Info2>

                <p> + </p>

                <Info3>
                    <p>총할인금액</p>
                    <p>5,000원</p>
                </Info3>



            </PurchaseInfo>

            <PurchaseInfo>
                <Info4>
                    <p>총주문금액</p>
                    <p>25,000원</p>
                </Info4>

            </PurchaseInfo>

            <PurchaseInfo>

                <PurchaseInfoButton onClick={onPurchase}>
                    구매하기
                </PurchaseInfoButton>

            </PurchaseInfo>


        </>
    );
};

