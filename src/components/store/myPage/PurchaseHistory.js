import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import productimg from '../../../assets/images/testImg/testproductimg.jpg';
import { GetpurchaseRecord } from '../../../redux/actions/storeAction';

const UserUtilButton = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;
`;

const SearchBar = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
`;
const SearchInput = styled.input`
    width: 80%;
    height: 30px;

    font-family: 'GIFont';
    font-size: 18px;
    color: black;

    background-color: #aaaaaa;
    border-radius: 5px;
    border: none;

    @media screen and (max-width: 600px) {
        font-size: 14px;
    };
`;

const SearchDateInput = styled.div`
    width: 80%;
    height: 100%;
`;
const InputDate = styled.input`
    width: 95%;
    height: 30px;

    font-family: 'GIFont';
    font-size: 18px;
    color: black;

    margin-top: 5px;

    background-color: #aaaaaa;
    border-radius: 5px;
    border: none;
`;
const SearchButton = styled.button`
    width: 20%;
    height: 100%;

    margin: 5px;

    border: 2px solid #535B6C;
    border-radius: 25px;
    background-color: #50596B;

    font-family: 'GIFont';
    font-size: 16px;
    color: #D3BC8E;
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

const History = styled.div`
    width: 95%;
    height: 100%;

    margin-top: 5px;
    margin-bottom: 10px;

    padding: 15px;

    border: 1px solid gray;
    border-radius: 15px;
`;

const HistoryState = styled.div`
    width: 100%;

    font-size: 20px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > p:nth-child(2):hover {
        color: #414147;
    }
`;
const HistoryInfo = styled.div`
    width: 95%;
    
    margin-top: 10px;

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

const HistoryButton = styled.div`
    width: 95%;

    margin-top: 10px;

    & > button {
        width: 200px;
        height: 50px;

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

export const PurchaseHistory = () => {

    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productPerPage, setProductPerPage] = useState(5);

    const [isDataFirst, setIsDataFirst] = useState(false);
    const [isDataLast, setIsDataLast] = useState(false);

    const keywordSearch = () => {
        dispatch(GetpurchaseRecord('keywordsearch', productPerPage, searchKeyword));
    };
    const onChargeSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };

    useEffect(() => {
        dispatch(GetpurchaseRecord('firstRender', productPerPage, searchKeyword));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (getStoreState.processInfo.processData1 !== '' || getStoreState.processInfo.processData2 !== '') {
            setListData(getStoreState.processInfo.processData2);

            const firstItem = getStoreState.processInfo.processData1.firstOfPage;
            const lastItem = getStoreState.processInfo.processData1.lastOfPage;
            const firstIndex = getStoreState.processInfo.processData1.firstOfAllList;
            const lastIndex = getStoreState.processInfo.processData1.lastOfAllList;

            console.log(firstItem?.data());
            console.log(firstIndex?.data());

            console.log(lastItem?.data());
            console.log(lastIndex?.data());


            if (firstItem?.data().date === firstIndex?.data().date) {
                setIsDataFirst(true);
            }
            else {
                setIsDataFirst(false);
            };

            if (lastItem?.data().date === lastIndex?.data().date) {
                setIsDataLast(true);
            }
            else {
                setIsDataLast(false);
            };

            console.log(isDataFirst);
            console.log(isDataLast);
        };

        // return () => {
        //     console.log('store out');
        // };

    }, [getStoreState.processInfo]);

    return (
        <>
            <UserUtilButton>
                <SearchBar>
                    <SearchInput type='text' value={searchKeyword} onChange={onChargeSearchKeyword} placeholder='검색할 제품명을 입력해주세요.' />
                    <SearchButton onClick={keywordSearch}>
                        검색
                    </SearchButton>
                </SearchBar>

                <hr />

                <SearchBar>
                    <SearchDateInput>
                        <InputDate type='date' />
                        <InputDate type='date' />
                    </SearchDateInput>

                    <SearchButton>
                        조회
                    </SearchButton>
                </SearchBar>



            </UserUtilButton>

            <UserComponent>

                {listData?.length === 0 && '상품이 존재하지 않습니다.'}

                {listData?.map((item, index) => (
                    <History key={index}>
                        <HistoryState>
                            <p>구매상태</p>
                            <p>X</p>
                        </HistoryState>

                        {item.purchaseData?.map((item) => (
                            <HistoryInfo key={item.optionNumber}>
                                <ProductImg>
                                    <img src={productimg} alt='' />
                                </ProductImg>
                                <ProductInfo>
                                    <p>04.13 구매</p>
                                    <p>{item.optionName}</p>
                                    <p>{item.purchaseQuantity}개</p>
                                    <p>{item.totalAmount}원</p>

                                </ProductInfo>

                            </HistoryInfo>
                        ))}

                        <HistoryButton>
                            <button>주문상세</button>
                        </HistoryButton>
                    </History>
                ))}

            </UserComponent>

            <UtilButton>
                {isDataFirst ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetpurchaseRecord('prev', productPerPage, ''))}>{'<'}-</button>
                }

                {isDataLast ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetpurchaseRecord('next', productPerPage, ''))}>-{'>'}</button>
                }
            </UtilButton>
        </>
    );
};
