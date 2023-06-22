import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { GetPointRecord } from '../../../redux/actions/storeAction';

// const HistoryUtilButton = styled.div`
//     width: 100%;
//     height: 100%;

//     margin-top: 10px;
//     padding: 10px;

//     border: 1px solid gray;
//     border-radius: 15px;
// `;

// const SearchBar = styled.div`
//     width: 100%;
//     height: 100%;

//     display: flex;
//     flex-direction: row;
//     align-items: center;
// `;
// const SearchInput = styled.input`
//     width: 80%;
//     height: 30px;

//     font-family: 'GIFont';
//     font-size: 18px;
//     color: black;

//     background-color: #aaaaaa;
//     border-radius: 5px;
//     border: none;

//     @media screen and (max-width: 600px) {
//         font-size: 14px;
//     };
// `;

// const SearchDateInput = styled.div`
//     width: 80%;
//     height: 100%;
// `;
// const InputDate = styled.input`
//     width: 95%;
//     height: 30px;

//     font-family: 'GIFont';
//     font-size: 18px;
//     color: black;

//     margin-top: 5px;

//     background-color: #aaaaaa;
//     border-radius: 5px;
//     border: none;
// `;
// const SearchButton = styled.button`
//     width: 20%;
//     height: 100%;

//     margin: 5px;

//     border: 2px solid #535B6C;
//     border-radius: 25px;
//     background-color: #50596B;

//     font-family: 'GIFont';
//     font-size: 16px;
//     color: #D3BC8E;
// `;

const HistoryComponent = styled.div`
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

const PointInfo = styled.div`
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
    & > p:nth-child(3) {
        font-size: 22px;
        margin-top: 3px;
    };
`;
const Point = styled.div`
    font-size: 18px;
    margin-top: 3px;

    ${(props) => props.type === 'income' && css`
        color: #F77154;
    `};

    ${(props) => props.type === 'outcome' &&
        css`
        color: #1F70B4;
    `};
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

export const PointHistory = ({ userdata }) => {

    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState([]);
    const [productPerPage, setProductPerPage] = useState(5);

    const [isDataFirst, setIsDataFirst] = useState(false);
    const [isDataLast, setIsDataLast] = useState(false);

    useEffect(() => {
        dispatch(GetPointRecord('firstRender', productPerPage, userdata.email));
        setProductPerPage(5);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (Object.keys(getStoreState.processInfo.processData1).length !== 0) {
            setListData(getStoreState.processInfo.processData2);

            const firstItem = getStoreState.processInfo.processData1.firstOfPage;
            const lastItem = getStoreState.processInfo.processData1.lastOfPage;
            const firstIndex = getStoreState.processInfo.processData1.firstOfAllList;
            const lastIndex = getStoreState.processInfo.processData1.lastOfAllList;

            if (firstItem?.data().purchaseNumber === firstIndex?.data().purchaseNumber) {
                setIsDataFirst(true);
            }
            else {
                setIsDataFirst(false);
            };

            if (lastItem?.data().purchaseNumber === lastIndex?.data().purchaseNumber) {
                setIsDataLast(true);
            }
            else {
                setIsDataLast(false);
            };
        };

        // eslint-disable-next-line
    }, [getStoreState.processInfo.processData1]);

    return (
        <>
            {/* <HistoryUtilButton>
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
            </HistoryUtilButton> */}

            <HistoryComponent>

                {listData?.length === 0 && '결제내역이 존재하지 않습니다.'}

                {listData?.map((item, index) => (
                    <History key={index}>
                        <HistoryState>
                            <p>{item.recordDate}</p>
                            <p>X</p>
                        </HistoryState>
                        <HistoryInfo>

                            <PointInfo>
                                <p>{item.recordDesc}</p>
                                <Point type={item.recordType === '+' ? 'income' : 'outcome'}> + {item.recordNumber}p</Point>
                                <p>잔액 {item.leftoverPoint}p</p>
                            </PointInfo>

                        </HistoryInfo>
                    </History>
                ))}

            </HistoryComponent>

            <UtilButton>
                {isDataFirst ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetPointRecord('prev', productPerPage, ''))}>{'<'}-</button>
                }

                {isDataLast ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => dispatch(GetPointRecord('next', productPerPage, ''))}>-{'>'}</button>
                }
            </UtilButton>
        </>
    );
};
