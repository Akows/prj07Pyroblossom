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
    height: 800px;

    margin-top: 30px;

    border: 2px solid black;
`;


export const ProductList = () => {
    return (
        <BackGround>

            <ProductListButtonArea>
                검색조건 버튼
            </ProductListButtonArea>
            <ProductListArea>
                물건 리스트들이 주루룩 나오는 공간
            </ProductListArea>

        </BackGround>
    );
};