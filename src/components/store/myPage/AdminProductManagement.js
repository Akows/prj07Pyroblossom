import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState('');

    useEffect(() => {
        dispatch(GetProductList(''));
    }, []);

    useEffect(() => {
        setListData(getStoreState.processInfo.processData2.Data);
    }, [getStoreState.processInfo]);

    return (
        <>
            <br />

            <UtilButton>

                <input type='text' />

                <button>검색</button>

            </UtilButton>

            <UtilButton>

                <div>
                    <input type='checkbox' />
                    <p>전체 선택</p>
                </div>

                <button>제품 삭제</button>

            </UtilButton>

            <UtilButton>

                <button onClick={() => dispatch(GetProductList('prev'))}>{'<'}-</button>

                <button onClick={() => dispatch(GetProductList('next'))}>-{'>'}</button>

            </UtilButton>



            <ProductList>

                {listData.map((item) => (
                    <Product>
                        <input type='checkbox' />

                        <ProductInfo>
                            <ProductImg>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${item.name}%2F${item.productInformationFile.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                            </ProductImg>
                            <Infomation>
                                <p>제품번호 {item.number}</p>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>남은 수량 : 341개</p>
                                <p>할인률 : {item.discountRate}%</p>

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
                ))}

            </ProductList>
        </>
    );
};
