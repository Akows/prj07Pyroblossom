import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChangeProductDisclosure, GetProductList } from '../../../redux/actions/storeAction';

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

    @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
    };
`;
const ProductInfo = styled.div`
    width: 60%;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    @media screen and (max-width: 700px) {
        width: 100%;

        flex-direction: column;
        align-items: flex-start;
    };
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

    @media screen and (max-width: 700px) {
        width: 100%;

        margin-left: 0px;
        margin-top: 20px;
        margin-bottom: 20px;
    };
`;

const ProductUtil = styled.div`
    width: 40%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 700px) {
        width: 100%;
    };
`;

const ProductOpen = styled.div`
    width: 50%;
    height: 80px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    font-size: 22px;

    & > button {
        width: 50px;
        height: 50px;

        margin-top: 15px;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;
        font-size: 18px;

        font-family: 'GIFont';
    };
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };

    & > p:nth-child(1) {

    };
    & > p:nth-child(2) {
        margin-top: 30px;
        opacity: 0.8;
    };
    & > p:nth-child(2):hover {
        opacity: 1;
    };

    @media screen and (max-width: 700px) {
        width: 50%;

    };
`;

export const AdminProductManagement = ({ setWhatCompoIsShow, setUpdateData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productPerPage, setProductPerPage] = useState(5);

    // const [checkedItem, setCheckedItem] = useState(false);

    const [isDataFirst, setIsDataFirst] = useState(false);
    const [isDataLast, setIsDataLast] = useState(false);

    const keywordSearch = () => {
        dispatch(GetProductList('keywordSearch', productPerPage, searchKeyword));
    };
    const onChargeSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };


    const onChangeProductDisclosure = (productName, productDisclosure) => {
        const confirmChoice = window.confirm('제품상태를 변경하시겠습니까?');

        if (!confirmChoice) {
            return;
        }
        else {
            dispatch(ChangeProductDisclosure(productName, productDisclosure, navigate));
            setProductPerPage(productPerPage);
        };
    };

    const productUpdate = (item) => {
        setWhatCompoIsShow('productupload');
        setUpdateData(item);
    };

    useEffect(() => {
        dispatch(GetProductList('firstRender', productPerPage, searchKeyword));
        // eslint-disable-next-line
    }, [getStoreState.flagValue.isRendering]);

    useEffect(() => {
        if (getStoreState.processInfo.processData1 !== '' || getStoreState.processInfo.processData2 !== '') {
            setListData(getStoreState.processInfo.processData2);

            const firstItem = getStoreState.processInfo.processData1.firstOfPage;
            const lastItem = getStoreState.processInfo.processData1.lastOfPage;
            const firstIndex = getStoreState.processInfo.processData1.firstOfAllList;
            const lastIndex = getStoreState.processInfo.processData1.lastOfAllList;

            if (firstItem?.data().number === firstIndex?.data().number) {
                setIsDataFirst(true);
            }
            else {
                setIsDataFirst(false);
            };

            if (lastItem?.data().number === lastIndex?.data().number) {
                setIsDataLast(true);
            }
            else {
                setIsDataLast(false);
            };
        };

        // return () => {
        //     console.log('store out');
        // };

    }, [getStoreState.processInfo]);

    return (
        <>
            <br />

            <UtilButton>

                <input type='text' value={searchKeyword} onChange={onChargeSearchKeyword} placeholder='검색할 제품명을 입력해주세요.' />

                <button onClick={keywordSearch}>검색</button>

            </UtilButton>

            {/* <UtilButton>

                <div>
                    <input type='checkbox' />
                    <p>전체 선택</p>
                </div>

                <button onClick={onChangeProductDisclosure}>상태전환</button>

            </UtilButton> */}

            <ProductList>

                {listData?.length === 0 ?
                    '상품이 존재하지 않습니다.'
                    :
                    <>
                        {listData?.map((item) => (
                            <Product key={item.number}>
                                {/* <input type='checkbox' checked={checkedItem} onChange={setCheckedItem} /> */}

                                <ProductInfo>
                                    <ProductImg>
                                        <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${item.name}%2F${item.productInformationFile.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                                    </ProductImg>
                                    <Infomation>
                                        <p>제품번호 : {item.number}</p>
                                        <p>제품명 : {item.name}</p>
                                        <p>제품 가격 : {item.price}원</p>
                                        <p></p>
                                        <p>할인률 : {item.discountRate}%</p>
                                        <p>제품분류 : {item.mainCategory} {'>'} {item.subCategory}</p>

                                        {item.productOption.option1 !== '옵션없음' ?
                                            <p>{item.productOption.option1}, {item.productOptionSurchargePrice.option1}원, {item.productOptionInventory.option1}개 남음. 구매제한 {item.productOptionPurchaseQuantityLimit.option1}개. 판매량 {item.productOptionSalesRate.option1}개.</p>
                                            :
                                            <p></p>
                                        }
                                        {item.productOption.option2 !== '옵션없음' ?
                                            <p>{item.productOption.option2}, {item.productOptionSurchargePrice.option2}원, {item.productOptionInventory.option2}개 남음. 구매제한 {item.productOptionPurchaseQuantityLimit.option2}개. 판매량 {item.productOptionSalesRate.option2}개.</p>
                                            :
                                            <p></p>
                                        }
                                        {item.productOption.option3 !== '옵션없음' ?
                                            <p>{item.productOption.option3}, {item.productOptionSurchargePrice.option3}원, {item.productOptionInventory.option3}개 남음. 구매제한 {item.productOptionPurchaseQuantityLimit.option3}개. 판매량 {item.productOptionSalesRate.option3}개.</p>
                                            :
                                            <p></p>
                                        }
                                        {item.productOption.option4 !== '옵션없음' ?
                                            <p>{item.productOption.option4}, {item.productOptionSurchargePrice.option4}원, {item.productOptionInventory.option4}개 남음. 구매제한 {item.productOptionPurchaseQuantityLimit.option4}개. 판매량 {item.productOptionSalesRate.option4}개.</p>
                                            :
                                            <p></p>
                                        }
                                        {item.productOption.option5 !== '옵션없음' ?
                                            <p>{item.productOption.option5}, {item.productOptionSurchargePrice.option5}원, {item.productOptionInventory.option5}개 남음. 구매제한 {item.productOptionPurchaseQuantityLimit.option5}개. 판매량 {item.productOptionSalesRate.option5}개.</p>
                                            :
                                            <p></p>
                                        }

                                        <p>배송비 : {item.deliveryFee}원</p>
                                        <p>진행중인 이벤트 : {item.eventType}.</p>
                                        <p>이벤트포인트 : {item.eventPoint}P</p>

                                    </Infomation>
                                </ProductInfo>

                                <ProductUtil>
                                    <ProductOpen>
                                        <p>판매 상태</p>
                                        <p onClick={() => onChangeProductDisclosure(item.name, item.productDisclosure)}>{item.productDisclosure ? '공개' : '비공개'}</p>
                                    </ProductOpen>

                                    <ProductOpen>
                                        <p>정보 수정</p>
                                        <button onClick={() => productUpdate(item)}>수정</button>
                                    </ProductOpen>

                                </ProductUtil>
                            </Product>
                        ))}
                    </>
                }

            </ProductList>

            <UtilButton>
                {isDataFirst ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetProductList('prev', productPerPage, ''))}>{'<'}-</button>
                }

                {isDataLast ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetProductList('next', productPerPage, ''))}>-{'>'}</button>
                }
            </UtilButton>
        </>
    );
};
