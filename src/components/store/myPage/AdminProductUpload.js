import React, { useEffect, useReducer, useState } from 'react'
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

const CategoryInfo = styled.div`
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

    & > select {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: white;
        border-radius: 5px;
        border: none;
    };

    & > select:nth-child(2) {
        margin-bottom: 10px;
    };
    & > select:nth-child(4) {
        margin-bottom: 10px;
    };

    & > p {
        font-size: 14px;
        margin-bottom: 3px;
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

    & > button {
        width: 100%;
        height: 30px;

        margin-top: 10px;
        margin-bottom: 10px;

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
    };
    
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;

const Option = styled.div`
    width: 100%;
    height: 100%;


    & > input {
        width: 100%;
        height: 30px;

        margin-top: 10px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
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

    & > select {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: white;
        border-radius: 5px;
        border: none;
    };

    & > input:nth-child(2){
        margin-top: 10px;
    };
    & > select:nth-child(3){
        margin-top: 10px;
    };
    & > input:nth-child(4){
        margin-top: 10px;
    };
`;

const UploadProductInfo = styled.div`
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

    & > button {
        width: 100%;
        height: 30px;

        margin-top: 10px;
        margin-bottom: 10px;

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
    };
    
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
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

const initStateOption = {
    optionCount: 0,
    optionArray: [],
};
const initStateInfomationFile = {
    infomationFileCount: 0,
    infomationFileArray: [],
};

const optionReducer = (state, action) => {
    switch (action.type) {
        case 'INCREASE':
            return {
                optionCount: state.optionCount + 1,
                optionArray: [...state.optionArray, { number: state.optionCount + 1 }],
            }
        case 'DECREASE':
            return {
                optionCount: state.optionCount - 1,
                optionArray: state.optionArray.filter(item => item.number !== state.optionCount),
            }
        default:
            return state;
    };
};
const infomationFileReducer = (state, action) => {
    switch (action.type) {
        case 'ADDFILE':
            return {
                infomationFileCount: state.infomationFileCount + 1,
                infomationFileArray: [...state.infomationFileArray, { number: state.infomationFileCount + 1 }],
            }
        case 'REMOVEFILE':
            return {
                infomationFileCount: state.infomationFileCount - 1,
                infomationFileArray: state.infomationFileArray.filter(item => item.number !== state.infomationFileCount),
            }
        default:
            return state;
    };
};

export const AdminProductUpload = () => {

    const [responseOption, dispatchOption] = useReducer(optionReducer, initStateOption);
    const [responseInfomation, dispatchInfomation] = useReducer(infomationFileReducer, initStateInfomationFile);

    const { optionCount, optionArray } = responseOption;
    const { infomationFileCount, infomationFileArray } = responseInfomation;

    const optionCountControl = (setType) => {
        if (setType === '+') {
            if (optionCount >= 10) {
                alert('제품 옵션은 10개까지 등록할 수 있습니다.');
                return;
            };

            dispatchOption({ type: 'INCREASE' });
        };

        if (setType === '-') {
            if (optionCount <= 0) {
                alert('더 이상 옵션을 제거할 수 없습니다.');
                return;
            };

            dispatchOption({ type: 'DECREASE' });
        };
    };

    const fileCountControl = (setType) => {
        if (setType === '+') {
            if (infomationFileCount >= 5) {
                alert('제품 설명 사진파일은 5개까지 등록할 수 있습니다.');
                return;
            };

            dispatchInfomation({ type: 'ADDFILE' });
        };

        if (setType === '-') {
            if (infomationFileCount <= 0) {
                alert('삭제할 첨부파일이 존재하지 않습니다.');
                return;
            };

            dispatchInfomation({ type: 'REMOVEFILE' });
        };
    };

    useEffect(() => {
        console.log(responseOption);
        console.log(responseInfomation);
    }, [responseOption, responseInfomation])





    const [first, setfirst] = useState();



    const onUpload = () => {
        setfirst(first);
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

            <p>제품 분류 입력</p>
            <CategoryInfo>

                <p>대분류</p>
                <select required>
                    <option value=''>대분류 선택</option>
                    <option>케이스</option>
                    <option>패드</option>
                    <option>문구</option>
                    <option>서적</option>
                    <option>침구</option>
                    <option>피규어</option>
                    <option>인형</option>
                </select>

                <p>소분류</p>
                <select required>
                    <option value=''>소분류 선택</option>
                    <option>만화</option>
                    <option>소설</option>
                    <option>아트북</option>
                </select>

            </CategoryInfo>

            <br />

            <p>제품 옵션 입력</p>
            <UploadProductOptionInfo>

                {optionArray.map((item) => (
                    <Option key={item.number}>
                        <p>{item.number}번 옵션 입력</p>
                        <input type='text' placeholder='옵션을 입력해주세요.' />
                    </Option>
                ))}

                <button onClick={() => optionCountControl('+')}>옵션 추가</button>
                <button onClick={() => optionCountControl('-')}>옵션 제거</button>

            </UploadProductOptionInfo>

            <br />

            <p>할인 정보 입력</p>
            <UploadSaleInfo>

                <input type='text' placeholder='제품 할인률 입력' />

                <input type='text' placeholder='포인트 적립률 입력' />

                <select required>
                    <option value=''>이벤트 종류 선택</option>
                    <option>리뷰 이벤트</option>
                    <option>추가 포인트 적립</option>
                </select>

                <input type='text' placeholder='이벤트 포인트 수치 입력' />

            </UploadSaleInfo>

            <br />

            <p>제품 설명 입력</p>
            <UploadProductInfo>

                {infomationFileArray.map((item) => (
                    <Option key={item.number}>
                        <p>{item.number}번 파일 첨부</p>
                        <input type='file' />
                    </Option>
                ))}

                <button onClick={() => fileCountControl('+')}>파일 추가</button>
                <button onClick={() => fileCountControl('-')}>파일 제거</button>

            </UploadProductInfo>

            <br />

            <p>입력 정보 확인</p>
            <InputCheck>

                <img src='' alt='None' />

                <input type='text' placeholder='제품번호' />

                <input type='text' placeholder='제품명' />

                <input type='text' placeholder='제품가격' />

                <input type='text' placeholder='배송료' />

                <input type='text' placeholder='인당 구매제한 수량 입력' />

                <input type='text' placeholder='대분류' />

                <input type='text' placeholder='소분류' />

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
