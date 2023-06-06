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
    optionCount: 'option' + 1,
    optionArray: [{ number: 1 }],
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
            if (optionCount <= 1) {
                alert('하나 이상의 옵션이 존재해야합니다.');
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

    const [productInfo, setProductInfo] = useState({
        number: '',
        name: '',
        price: '',
        deliveryFee: '',
        PurchaseQuantityLimit: '',
        mainCategory: '',
        subCategory: '',
        productOption: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            option5: '',
            option6: '',
            option7: '',
            option8: '',
            option9: '',
            option10: '',
        },
        discountRate: '',
        rewardAmount: '',
        productInformationFile: {},
        registrationDate: ''
    });

    // const [productInfoFile, setProductInfoFile] = useState();

    const onChange = (event) => {
        setProductInfo({ ...productInfo, [event.target.id]: event.target.value });
    };

    const onUpload = () => {
        console.log(productInfo);
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

                <input type='text' id='name' value={productInfo.name || ''} onChange={onChange} placeholder='제품명 입력' />

                <input type='text' id='price' value={productInfo.price || ''} onChange={onChange} placeholder='제품가격 입력' />

                <input type='text' id='deliveryFee' value={productInfo.deliveryFee || ''} onChange={onChange} placeholder='배송료 입력' />
                <p>* 미입력시 무료배송.</p>

                <input type='text' id='PurchaseQuantityLimit' value={productInfo.PurchaseQuantityLimit || ''} onChange={onChange} placeholder='인당 구매제한 수량 입력' />

            </UploadInfo>

            <br />

            <p>제품 분류 입력</p>
            <CategoryInfo>

                <p>대분류</p>
                <select id='mainCategory' value={productInfo.mainCategory || ''} onChange={onChange} required>
                    {/* <option value=''>대분류 선택</option>
                    <option value='케이스류'>케이스</option>
                    <option value='패드류'>패드</option>
                    <option value='문구류'>문구</option>
                    <option value='서적류'>서적</option>
                    <option value='침구류'>침구</option>
                    <option value='피규어'>피규어</option>
                    <option value='인형'>인형</option> */}
                </select>

                <p>소분류</p>
                <select id='subCategory' value={productInfo.subCategory || ''} onChange={onChange} required>
                    {/* {productInfo.mainCategory === '케이스류' && <>
                        <option value=''>소분류 선택</option>
                        <option value='123'>핸드폰 케이스</option>
                        <option value=''>노트북 케이스</option>
                    </>}

                    {productInfo.mainCategory === '패드류' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>장패드</option>
                        <option value=''>단패드</option>
                    </>}

                    {productInfo.mainCategory === '문구류' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>아동</option>
                        <option value=''>14세 이상</option>
                    </>}
                    {productInfo.mainCategory === '서적류' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>만화</option>
                        <option value=''>소설</option>
                        <option value=''>아트북</option>
                    </>}
                    {productInfo.mainCategory === '침구류' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>이불</option>
                        <option value=''>배개</option>
                    </>}
                    {productInfo.mainCategory === '피규어' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>PVC</option>
                    </>}
                    {productInfo.mainCategory === '인형' && <>
                        <option value=''>소분류 선택</option>
                        <option value=''>봉제 인형</option>
                    </>} */}

                </select>

            </CategoryInfo>

            <br />

            <p>제품 옵션 입력</p>
            <UploadProductOptionInfo>

                {optionArray.map((item) => (
                    <Option key={item.number}>
                        <p>{item.number}번 옵션 입력</p>
                        <input type='text' id='productOption' value={productInfo.productOption[`${item.number}`] || ''} onChange={onChange} placeholder='옵션을 입력해주세요.' />
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

                <input type='text' value={productInfo.number || ''} readOnly placeholder='제품번호' />

                <input type='text' value={productInfo.name || ''} readOnly placeholder='제품명' />

                <input type='text' value={productInfo.price || ''} readOnly placeholder='제품가격' />

                <input type='text' value={productInfo.price || ''} readOnly placeholder='배송료' />

                <input type='text' value={productInfo.price || ''} readOnly placeholder='인당 구매제한 수량 입력' />

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
