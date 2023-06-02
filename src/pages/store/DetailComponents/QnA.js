import React from 'react'
import styled from 'styled-components';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const QnATitle = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 30px;

    & > p {
        font-size: 32px;
        color: #D3BC8E;
    };

    & > p:nth-child(2) {
        font-size: 18px;
        color: #D3BC8E;

        margin-top: 10px;
    };
`;
const QnAList = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const QnATitleButtons = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 20px;
`;

const ButtonLeft = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > select {
        width: 120px;
        height: 30px;
    };
`;
const ButtonRight = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & > button {
        width: 140px;
        height: 30px;

        font-family: 'GIFont';
        font-size: 15px;
    };
`;

const QnAItem = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    font-size: 22px;

    border-top: 1px solid gray;
    border-bottom: 1px solid gray;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: flex-start;
    };
`;

const QnAInfo = styled.div`
    width: 40%;
    height: 50%;

    margin-top: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    @media screen and (max-width: 1000px) {
        width: 100%;
    };
`;
const QnAText = styled.div`
    width: 60%;
    height: 50%;

    margin-top: 10px;
    margin-bottom: 10px;

    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        width: 100%;
        justify-content: flex-start;
    };
`;

const QnAState = styled.div`
    width: 33.3%;
    height: 100%;

    font-size: 18px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        width: 120px;
    };
`;
const QnAWriter = styled.div`
    width: 33.3%;
    height: 100%;

    font-size: 18px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        width: 120px;
    };
`;
const QnADate = styled.div`
    width: 33.3%;
    height: 100%;

    font-size: 18px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        width: 120px;
    };
`;


export const QnA = () => {
    return (
        <BackGround>
            <QnATitle>
                <p>QnA</p>
                <p>구매하려는 상품에 대해 궁금한 점을 남겨주세요.</p>
                <QnATitleButtons>

                    <ButtonLeft>
                        <select>
                            <option>모두</option>
                            <option>답변하지 않음</option>
                            <option>답변함</option>
                        </select>
                    </ButtonLeft>
                    <ButtonRight>
                        <button>QnA 작성하기</button>
                        <button>나의 QnA 보기</button>
                    </ButtonRight>



                </QnATitleButtons>
            </QnATitle>

            <QnAList>

                <QnAItem>

                    <QnAInfo>
                        <QnAState>
                            답변하지 않음
                        </QnAState>
                        <QnAWriter>
                            박영희
                        </QnAWriter>
                        <QnADate>
                            2023.03.12
                        </QnADate>

                    </QnAInfo>

                    <QnAText>
                        제품 크기가 어떻게 되나요?
                    </QnAText>
                </QnAItem>

                <QnAItem>
                    <QnAInfo>
                        <QnAState>
                            답변함
                        </QnAState>
                        <QnAWriter>
                            홍길수
                        </QnAWriter>
                        <QnADate>
                            2023.03.22
                        </QnADate>
                    </QnAInfo>

                    <QnAText>
                        배송이 며칠이나 걸릴까요?
                    </QnAText>
                </QnAItem>


                <QnAItem>

                    <QnAInfo>
                        <QnAState>
                            답변하지 않음
                        </QnAState>
                        <QnAWriter>
                            박동기
                        </QnAWriter>
                        <QnADate>
                            2023.04.22
                        </QnADate>
                    </QnAInfo>


                    <QnAText>
                        언제 배송되요?
                    </QnAText>
                </QnAItem>


            </QnAList>
        </BackGround>
    );
};
