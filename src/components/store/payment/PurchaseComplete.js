import React from 'react'
import styled from 'styled-components';

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

    border: 2px solid black;

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

    & > p > p:nth-child(1) {
        opacity: 0.4;
    };
`;












const ProductListArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid black;
`;

const A1 = styled.div`
    width: 100%;
    height: 100px;
`;

const A2 = styled.div`
    width: 100%;
    height: 100px;
`;

const A3 = styled.div`
    width: 100%;
    height: 100px;
`;

const A4 = styled.div`
    width: 100%;
    height: 100px;
`;

const A5 = styled.div`
    width: 100%;
    height: 100px;
`;

export const PurchaseComplete = () => {
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
                <A1>
                    주문 정보 및 제품 내용
                </A1>
                <A2>
                    주문자, 배송지 정보
                </A2>
                <A3>
                    할인 및 최종결제 내용
                </A3>
                <A4>
                    결제수단 정보
                </A4>
                <A5>
                    결제버튼
                </A5>

            </ProductListArea>
        </>
    );
};
