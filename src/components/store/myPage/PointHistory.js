import React from 'react'
import styled, { css } from 'styled-components';

const HistoryUtilButton = styled.div`
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

const PointTypeColor = css`
    ${(props) => props.type === 'income' && css`
        color: #F77154;
    `}

    ${(props) => props.type === 'outcome' &&
        css`
        color: #1F70B4;
    `}
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

export const PointHistory = () => {
    return (
        <>
            <HistoryUtilButton>
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
            </HistoryUtilButton>

            <HistoryComponent>

                <History>
                    <HistoryState>
                        <p>2023-04-05</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>

                        <PointInfo>
                            <p>가입 기념 포인트 지급.</p>
                            <Point type={'income'}> + 100,000p</Point>
                            <p>잔액 100,000p</p>
                        </PointInfo>

                    </HistoryInfo>
                </History>

                <History>
                    <HistoryState>
                        <p>2023-04-05</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>

                        <PointInfo>
                            <p>물건구매 - 통통폭탄인형 구매.</p>
                            <Point type={'outcome'}> - 40,000p</Point>
                            <p>잔액 60,000p</p>
                        </PointInfo>

                    </HistoryInfo>
                </History>

                <History>
                    <HistoryState>
                        <p>2023-04-07</p>
                        <p>X</p>
                    </HistoryState>
                    <HistoryInfo>

                        <PointInfo>
                            <p>포인트 충전, 사용자 결제.</p>
                            <Point type={'income'}> + 10,000p</Point>
                            <p>잔액 70,000p</p>
                        </PointInfo>

                    </HistoryInfo>
                </History>


            </HistoryComponent>
        </>
    );
};
