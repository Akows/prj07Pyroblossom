import React from 'react'
import styled from 'styled-components';

const UploadIMG = styled.div`
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

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };
`;

const UploadInfo = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > input:nth-child(2) {
        margin-top: 10px;
    };
    & > input:nth-child(3) {
        margin-top: 10px;
    };
    & > input:nth-child(5) {
        margin-top: 10px;
    };

    & > p {
        font-size: 14px;
        margin-top: 3px;
    };
`;

const UploadProductOptionInfo = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > input {
        margin-top: 10px;
    };
    & > p {
        font-size: 15px;
        margin-top: 5px;
    };
`;

const UploadSaleInfo = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > input:nth-child(2){
        margin-top: 10px;
    };
`;

const InputCheck = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > input{
        margin-top: 10px;
    };
`;

const UploadButtonArea = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const UploadButton = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 5px;
    background-color: #D3BC8E;
    color: #414147;

    font-family: 'GIFont';
    font-size: 16px;

    &:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;



export const AdminProductUpload = () => {

    const onUpload = () => {

    };

    return (
        <>
            <br />

            <p>제품 이미지 등록</p>
            <UploadIMG>

                <input type='file' />

            </UploadIMG>

            <br />

            <p>제품 정보 입력</p>
            <UploadInfo>

                <input type='text' placeholder='제품명 입력' />

                <input type='text' placeholder='제품가격 입력' />

                <input type='text' placeholder='배송료 입력' />
                <p>* 미입력시 무료배송.</p>

                <input type='text' placeholder='인당 구매제한 수량 입력' />

            </UploadInfo>

            <br />

            <p>제품 옵션 입력</p>
            <UploadProductOptionInfo>

                <p>1번 옵션 입력</p>
                <input type='text' placeholder='1번 옵션 입력' />

                <p>2번 옵션 입력</p>
                <input type='text' placeholder='2번 옵션 입력' />

                <p>3번 옵션 입력</p>
                <input type='text' placeholder='3번 옵션 입력' />

                <p>4번 옵션 입력</p>
                <input type='text' placeholder='4번 옵션 입력' />

                <p>5번 옵션 입력</p>
                <input type='text' placeholder='5번 옵션 입력' />

            </UploadProductOptionInfo>

            <br />

            <p>할인 정보 입력</p>
            <UploadSaleInfo>

                <input type='text' placeholder='기본 할인률 입력' />

                <input type='text' placeholder='포인트 적입률 입력' />

            </UploadSaleInfo>

            <br />

            <p>입력 정보 확인</p>
            <InputCheck>

                <img src='' alt='None' />

                <input type='text' placeholder='제품번호' />

                <input type='text' placeholder='제품명' />

                <input type='text' placeholder='제품가격' />

                <input type='text' placeholder='배송료' />

                <input type='text' placeholder='인당 구매제한 수량 입력' />

                <input type='text' placeholder='기본 할인률' />

                <input type='text' placeholder='포인트 적입률' />

                <input type='text' placeholder='1번 옵션' />

                <input type='text' placeholder='2번 옵션' />

                <input type='text' placeholder='3번 옵션' />

                <input type='text' placeholder='4번 옵션' />

                <input type='text' placeholder='5번 옵션' />

            </InputCheck>


            <UploadButtonArea >
                <UploadButton onClick={onUpload}>
                    제품 등록하기
                </UploadButton>
            </UploadButtonArea>

        </>
    );
};
