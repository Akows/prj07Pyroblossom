import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 120px;
`;

const ProductListButtonArea = styled.div`
    width: 90%;
    height: 50px;

    border: 2px solid black;
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

export const PaymentPage = () => {
    return (
        <BackGround>

            <ProductListButtonArea>
                주문/결제
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



        </BackGround>
    );
};
