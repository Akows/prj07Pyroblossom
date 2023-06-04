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
`;









const PurchaseInfo = styled.div`
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
`;

const PurchaseInfoButton = styled.div`
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

            </UploadInfo>

            <br />

            <p>할인 정보 입력</p>
            <UploadSaleInfo>

                <input type='text' placeholder='기본 할인률 입력' />

                <input type='text' placeholder='포인트 적입률 입력' />

            </UploadSaleInfo>

            <br />

            <p>입력 정보 확인</p>
            <UploadSaleInfo>

                <img src='' alt='None' />

                <input type='text' placeholder='제품명 입력' />

                <input type='text' placeholder='제품가격 입력' />

                <input type='text' placeholder='기본 할인률 입력' />

                <input type='text' placeholder='포인트 적입률 입력' />

            </UploadSaleInfo>






            <PurchaseInfo>

                <PurchaseInfoButton onClick={onUpload}>
                    제품 등록하기
                </PurchaseInfoButton>

            </PurchaseInfo>


        </>
    );
};
