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
const ProductTypeShowArea = styled.div`
    width: 90%;
    height: 80px;

    border: 2px solid black;
`;
const ProductInfoArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
`;
const OtherInfoArea = styled.div`
    width: 90%;
    height: 800px;

    margin-top: 30px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
`;

const A = styled.div`
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
`;

const A1 = styled.div`
    width: 50%;
    height: 100%;

    border: 2px solid black;
`;

const A2 = styled.div`
    width: 50%;
    height: 100%;

    border: 2px solid black;
`;

const A21 = styled.div`
    width: 100%;
    height: 120px;

    border: 2px solid black;
`;
const A22 = styled.div`
    width: 100%;
    height: 80px;

    border: 2px solid black;
`;
const A23 = styled.div`
    width: 100%;
    height: 180px;

    border: 2px solid black;
`;
const A24 = styled.div`
    width: 100%;
    height: 240px;

    border: 2px solid black;
`;

const A25 = styled.div`
    width: 100%;
    height: 120px;

    border: 2px solid black;
`;

const B = styled.div`
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
`;
const B1 = styled.div`
    width: 100%;
    height: 60px;

    border: 2px solid black;
`;

const B2 = styled.div`
    width: 100%;
    height: 100%;

    border: 2px solid black;
`;

export const ProductDetail = () => {
    return (
        <BackGround>

            <ProductTypeShowArea>
                물건종류 보여주는 곳, 적당한 그림과 '인형 = 통통 폭탄 인형'와 같이 경로 표시
            </ProductTypeShowArea>

            <ProductInfoArea>
                <A>
                    <A1>
                        제품사진
                    </A1>
                    <A2>
                        <A21>
                            제품명
                        </A21>
                        <A22>
                            제품가격
                        </A22>
                        <A23>
                            배송정보
                        </A23>
                        <A24>
                            제품수량입력과 총금액
                        </A24>
                        <A25>
                            구매버튼
                        </A25>
                    </A2>
                </A>


            </ProductInfoArea>




            <OtherInfoArea>
                <B>
                    <B1>버튼들</B1>
                    <B2>컴포넌트 구역</B2>
                </B>


            </OtherInfoArea>

        </BackGround>
    );
};