import React from 'react'
import styled from 'styled-components';

import productimg from '../../../assets/images/testImg/testproductimg.jpg';

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

export const PurchaseHistory = () => {
    return (
        <>
            <UserUtilButton>
                <SearchBar>
                    <SearchInput type='text' />
                    <SearchButton>
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

                <History>
                    <HistoryState>
                        <p>구매상태</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <ProductInfo>
                            <p>04.13 구매</p>
                            <p>통통폭탄인형</p>
                            <p>30,000원</p>

                        </ProductInfo>

                    </HistoryInfo>
                    <HistoryButton>
                        <button>주문상세</button>
                    </HistoryButton>
                </History>
                <History>
                    <HistoryState>
                        <p>구매상태</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <ProductInfo>
                            <p>04.13 구매</p>
                            <p>통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형통통폭탄인형</p>
                            <p>30,000원</p>

                        </ProductInfo>

                    </HistoryInfo>
                    <HistoryButton>
                        <button>주문상세</button>
                    </HistoryButton>
                </History>
                <History>
                    <HistoryState>
                        <p>구매상태</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>
                        <ProductImg>
                            <img src={productimg} alt='' />
                        </ProductImg>
                        <ProductInfo>
                            <p>04.13 구매</p>
                            <p>통통폭탄인형</p>
                            <p>30,000원</p>

                        </ProductInfo>

                    </HistoryInfo>
                    <HistoryButton>
                        <button>주문상세</button>
                    </HistoryButton>
                </History>

            </UserComponent>
        </>
    );
};
