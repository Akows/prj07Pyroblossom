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

            </QnAList>
        </BackGround>
    );
};
