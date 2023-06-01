import React from 'react'
import { useParams } from 'react-router-dom';
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

    const { keyword } = useParams();

    return (
        <BackGround>

            <ProductListButtonArea>
                검색조건 버튼
            </ProductListButtonArea>
            <ProductListArea>
                {keyword}에 대한 검색 결과입니다.
            </ProductListArea>

        </BackGround>
    );
};