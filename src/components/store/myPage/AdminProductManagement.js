import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import productimg from '../../../assets/images/testImg/testproductimg.jpg';
import { GetProductList } from '../../../redux/actions/storeAction';

const UtilButton = styled.div`
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
    & > div > input {
        width: 20px;
        height: 20px;
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

    & > input {
        width: 400px;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;

        @media screen and (max-width: 600px) {
            width: 70%;
        };
    };
`;

const ProductList = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Product = styled.div`
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
const ProductInfo = styled.div`
    width: 75%;
    
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
const Infomation = styled.div`
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
        font-size: 18px;
        margin-top: 8px;
    };
    & > p:nth-child(4) {
        font-size: 15px;
        margin-top: 10px;
        opacity: 0.7;
    };
    & > p:nth-child(5) {
        font-size: 15px;
        margin-top: 2px;
        opacity: 0.7;
    };
`;


const ProductOpen = styled.div`
    width: 20%;
    height: 120px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    & > input {
        width: 50px;
        height: 50px;

        margin-top: 15px;
    };

    & > button {
        width: 50px;
        height: 50px;

        margin-top: 15px;

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

export const AdminProductManagement = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <br />

            <UtilButton>

                <div>
                    <input type='checkbox' />
                    <p>전체 선택</p>
                </div>

                <button>제품 삭제</button>

            </UtilButton>

            <UtilButton>

                <input type='text' />

                <button onClick={() => dispatch(GetProductList())}>검색</button>

            </UtilButton>

            <ProductList>

                <Product>
                    <input type='checkbox' />

                    <ProductInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <Infomation>
                            <p>상품번호 0000001</p>
                            <p>통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형</p>
                            <p>30,000원</p>
                            <p>남은 수량 : 341개</p>
                            <p>할인률 : 15%</p>

                        </Infomation>
                    </ProductInfo>

                    <ProductOpen>
                        <p>제품 공개</p>
                        <input type='checkbox' />
                    </ProductOpen>

                    <ProductOpen>
                        <p>정보 수정</p>
                        <button>수정</button >
                    </ProductOpen>
                </Product>

                <Product>
                    <input type='checkbox' />

                    <ProductInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <Infomation>
                            <p>상품번호 0000002</p>
                            <p>통통폭탄</p>
                            <p>60,000원</p>
                            <p>남은 수량 : 3341개</p>
                            <p>할인률 : 7.5%</p>

                        </Infomation>
                    </ProductInfo>

                    <ProductOpen>
                        <p>제품 공개</p>
                        <input type='checkbox' />
                    </ProductOpen>

                    <ProductOpen>
                        <p>정보 수정</p>
                        <button>수정</button >
                    </ProductOpen>
                </Product>







            </ProductList>

        </>
    );
};
