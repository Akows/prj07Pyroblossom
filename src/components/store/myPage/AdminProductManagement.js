import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

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
        opacity: 0.6;
    };

    & > p:nth-child(1) {
        font-size: 14px;
        margin-bottom: 3px;
    };
    & > p:nth-child(2) {
        opacity: 1;
    };
    & > p:nth-child(3) {
        font-size: 16px;
        margin-top: 3px;
        margin-bottom: 3px;
        opacity: 0.8;
    };
    & > p:nth-child(4) {
        font-size: 16px;
        margin-top: 10px;
    };
    & > p:nth-child(5) {
        font-size: 16px;
        margin-top: 5px;
    };
    & > p:nth-child(6) {
        font-size: 18px;
        margin-top: 3px;
    };

    & > p:nth-child(7) {
        font-size: 14px;
        margin-top: 15px;
    };
    & > p:nth-child(8) {
        font-size: 14px;
        margin-top: 5px;
    };
    & > p:nth-child(9) {
        font-size: 14px;
        margin-top: 5px;
    };
    & > p:nth-child(10) {
        font-size: 14px;
        margin-top: 5px;
    };
    & > p:nth-child(11) {
        font-size: 14px;
        margin-top: 5px;
    };

    & > p:nth-child(12) {
        font-size: 14px;
        margin-top: 15px;
    };
    & > p:nth-child(13) {
        font-size: 14px;
        margin-top: 3px;
    };
    & > p:nth-child(14) {
        font-size: 14px;
        margin-top: 3px;
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

    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState([]);

    const [isDataFirst, setIsDataFirst] = useState(true);
    const [isDataLast, setIsDataLast] = useState(false);

    useEffect(() => {
        dispatch(GetProductList(''));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setListData(getStoreState.processInfo.processData2.productData);

        // if (getStoreState.processInfo.processData1.firstVisible?.data().number === getStoreState.processInfo.processData1.firstOfIndex?.data().number) {
        //     setIsDataFirst(true);
        // };

        // if (getStoreState.processInfo.processData1.lastVisible?.data().number === getStoreState.processInfo.processData1.lastOfIndex?.data().number) {
        //     setIsDataLast(true);
        // };

        // console.log(getStoreState.processInfo.processData1.firstVisible?.data().number); // 1 2
        // console.log(getStoreState.processInfo.processData1.lastVisible?.data().number);  // 2 3

        // console.log(getStoreState.processInfo.processData3.firstOfIndex?.data()); // 1 1
        // console.log(getStoreState.processInfo.processData3.lastOfIndex?.data());  // 1 1

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

                {/* {isDataFirst ?
                    <button>/</button>
                    :
                    <button onClick={() => dispatch(GetProductList('prev'))}>{'<'}-</button>
                }

                {isDataLast ?
                    <button>/</button>
                    :
                    <button onClick={() => dispatch(GetProductList('next'))}>-{'>'}</button>
                } */}

                <button onClick={() => dispatch(GetProductList('prev'))}>{'<'}-</button>

                <button onClick={() => dispatch(GetProductList('next'))}>-{'>'}</button>

            </UtilButton>



            <ProductList>

                {listData?.map((item) => (
                    <Product key={item.number}>
                        <input type='checkbox' />

                        <ProductInfo>
                            <ProductImg>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${item.name}%2F${item.productInformationFile.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                            </ProductImg>
                            <Infomation>
                                <p>제품번호 : {item.number}</p>
                                <p>제품명 : {item.name}</p>
                                <p>제품 가격 : {item.price}원</p>
                                <p>남은 수량 : {item.inventory}개</p>
                                <p>할인률 : {item.discountRate}%</p>
                                <p>제품분류 : {item.mainCategory} {'>'} {item.subCategory}</p>

                                {item.productOption.option1 ? <p>{item.productOption.option1}, {item.productOptionSurchargePrice.option1}원</p> : <p></p>}
                                {item.productOption.option2 ? <p>{item.productOption.option2}, {item.productOptionSurchargePrice.option2}원</p> : <p></p>}
                                {item.productOption.option3 ? <p>{item.productOption.option3}, {item.productOptionSurchargePrice.option3}원</p> : <p></p>}
                                {item.productOption.option4 ? <p>{item.productOption.option4}, {item.productOptionSurchargePrice.option4}원</p> : <p></p>}
                                {item.productOption.option5 ? <p>{item.productOption.option5}, {item.productOptionSurchargePrice.option5}원</p> : <p></p>}

                                <p>보너스포인트 : {item.rewardAmountRate}P</p>
                                <p>진행중인 이벤트 : {item.eventType}.</p>
                                <p>이벤트포인트 : {item.eventPoint}P</p>



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
