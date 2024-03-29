import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AddProduct, UpdateProduct } from '../../../redux/actions/storeAction';

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
    & > input:nth-child(6) {
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
        width: 50%;
        height: 30px;

        margin-top: 5px;

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

    & > div {
        width: 100%;
        height: 50px;

        margin-top: 5px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    };

    & > div > p {
        height: 25px;

        font-size: 14px;
        margin-top: 5px;
    };

    & > div > select {
        width: 110px;
        height: 20px;

        margin-bottom: 5px;
        margin-left: 10px;

        font-family: 'GIFont';
        font-size: 15px;
        color: black;

        background-color: white;
        border-radius: 5px;
        border: none;
    };

    & > div > input {
        width: 50%;
        height: 20px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > div:nth-child(6) {
        width: 100%;
        height: 100%;

        flex-direction: column;
        align-items: flex-start;
    };
    & > div:nth-child(7) {
        width: 100%;
        height: 100%;

        flex-direction: column;
        align-items: flex-start;

        margin-bottom: 5px;
    };
    & > div:nth-child(8) {
        width: 100%;
        height: 100%;

        flex-direction: column;
        align-items: flex-start;

        margin-bottom: 5px;
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

    & > input:nth-child(1){
        margin-top: 10px;
    };
    & > select:nth-child(2){
        margin-top: 10px;
    };
    & > input:nth-child(3){
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
    optionCount: 1,
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

export const AdminProductUpload = ({ isLoading, updateData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [responseOption, dispatchOption] = useReducer(optionReducer, initStateOption);
    const [responseInfomation, dispatchInfomation] = useReducer(infomationFileReducer, initStateInfomationFile);

    const { optionCount, optionArray } = responseOption;
    const { infomationFileCount, infomationFileArray } = responseInfomation;

    const [isUpdate, setIsUpdate] = useState(false);

    const optionCountControl = (setType) => {
        if (setType === '+') {
            if (optionCount >= 5) {
                alert('제품 옵션은 5개까지 등록할 수 있습니다.');
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
            if (infomationFileCount >= 3) {
                alert('제품 설명 사진파일은 3개까지 등록할 수 있습니다.');
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
        name: '',
        price: '',
        deliveryFee: '',
        // purchaseQuantityLimit: '',
        // inventory: '',
        mainCategory: '',
        subCategory: '',
        discountRate: '',
        // rewardAmountRate: '',
        eventType: '',
        eventPoint: '',
    });

    const [productOptionInfo, setProductOption] = useState({
        option1: '',
        option1SurchargeType: '변동없음',
        option1SurchargePrice: '',
        option1PurchaseQuantityLimit: '',
        option1Inventory: '',
        option2: '',
        option2SurchargeType: '변동없음',
        option2SurchargePrice: '',
        option2PurchaseQuantityLimit: '',
        option2Inventory: '',
        option3: '',
        option3SurchargeType: '변동없음',
        option3SurchargePrice: '',
        option3PurchaseQuantityLimit: '',
        option3Inventory: '',
        option4: '',
        option4SurchargeType: '변동없음',
        option4SurchargePrice: '',
        option4PurchaseQuantityLimit: '',
        option4Inventory: '',
        option5: '',
        option5SurchargeType: '변동없음',
        option5SurchargePrice: '',
        option5PurchaseQuantityLimit: '',
        option5Inventory: '',
    });

    const [productImgFile, setProductImgFile] = useState({
        titleImage: '',
        infoImage0: '',
        infoImage1: '',
        infoImage2: '',
    });

    const [updateNeedData, setUpdateNeedData] = useState({
        number: '',
        formerName: '',
    });

    const onChange = (event) => {
        setProductInfo({ ...productInfo, [event.target.id]: event.target.value });
    };
    const onChangeOption = (event) => {
        setProductOption({ ...productOptionInfo, [event.target.id]: event.target.value });
    };
    const onFileUpload = (event) => {
        setProductImgFile({ ...productImgFile, [event.target.id]: event.target.files });
    };

    const onUpload = () => {
        if (productImgFile.titleImage === '') {
            alert('제품 이미지는 반드시 등록해야합니다.');
            return;
        };

        if (productImgFile.price === '') {
            alert('제품 가격은 반드시 입력해야합니다.');
            return;
        };

        if (productImgFile.mainCategory === '' || productImgFile.subCategory === '') {
            alert('제품 분류는 반드시 입력해야합니다.');
            return;
        };

        dispatch(AddProduct(productInfo, productOptionInfo, productImgFile, navigate));
    };

    useEffect(() => {
        // updateData의 존재 유무를 판별.
        // updateData 객체의 keys의 length가 0이 아닐 경우에만 코드가 동작.
        if (Object.keys(updateData).length !== 0) {
            setIsUpdate(true);

            setUpdateNeedData({
                number: updateData.number,
                formerName: updateData.name,
            });

            setProductInfo({
                name: updateData.name,
                price: updateData.price,
                deliveryFee: updateData.deliveryFee,
                purchaseQuantityLimit: updateData.purchaseQuantityLimit,
                inventory: updateData.inventory,
                mainCategory: updateData.mainCategory,
                subCategory: updateData.subCategory,
                discountRate: updateData.discountRate,
                rewardAmountRate: updateData.rewardAmountRate,
                eventType: updateData.eventType,
                eventPoint: updateData.eventPoint,
                registrationDate: updateData.registrationDate,
            });

            setProductOption({
                option1: updateData.productOption.option1,
                option1SurchargeType: updateData.productOptionSurchargeType.option1,
                option1SurchargePrice: updateData.productOptionSurchargePrice.option1,
                option1PurchaseQuantityLimit: updateData.productOptionPurchaseQuantityLimit.option1,
                option1Inventory: updateData.productOptionInventory.option1,
                option2: updateData.productOption.option2,
                option2SurchargeType: updateData.productOptionSurchargeType.option2,
                option2SurchargePrice: updateData.productOptionSurchargePrice.option2,
                option2PurchaseQuantityLimit: updateData.productOptionPurchaseQuantityLimit.option2,
                option2Inventory: updateData.productOptionInventory.option2,
                option3: updateData.productOption.option3,
                option3SurchargeType: updateData.productOptionSurchargeType.option3,
                option3SurchargePrice: updateData.productOptionSurchargePrice.option3,
                option3PurchaseQuantityLimit: updateData.productOptionPurchaseQuantityLimit.option3,
                option3Inventory: updateData.productOptionInventory.option3,
                option4: updateData.productOption.option4,
                option4SurchargeType: updateData.productOptionSurchargeType.option4,
                option4SurchargePrice: updateData.productOptionSurchargePrice.option4,
                option4PurchaseQuantityLimit: updateData.productOptionPurchaseQuantityLimit.option4,
                option4Inventory: updateData.productOptionInventory.option4,
                option5: updateData.productOption.option5,
                option5SurchargeType: updateData.productOptionSurchargeType.option5,
                option5SurchargePrice: updateData.productOptionSurchargePrice.option5,
                option5PurchaseQuantityLimit: updateData.productOptionPurchaseQuantityLimit.option5,
                option5Inventory: updateData.productOptionInventory.option5,
            });

            let optionCount = 0;
            // eslint-disable-next-line
            for (let [key, value] of Object.entries(updateData.productOption)) {
                if (value !== '옵션없음') {
                    optionCount++;
                };
            };

            for (let i = 0; i < optionCount - 1; i++) {
                dispatchOption({ type: 'INCREASE' });
            };

        }
        else {
            setIsUpdate(false);
        };
        // eslint-disable-next-line
    }, [updateData])

    const onUpdate = () => {
        if (productImgFile.titleImage === '') {
            alert('제품 이미지는 반드시 등록해야합니다.');
            return;
        };

        dispatch(UpdateProduct(updateNeedData, productInfo, productOptionInfo, productImgFile, navigate));
    };

    return (
        <>
            <br />

            <p>제품 이미지 등록</p>
            <UploadIMG>

                <input type='file' id='titleImage' onChange={onFileUpload} multiple={false} />

            </UploadIMG>

            <br />

            <p>제품 정보 입력</p>
            <UploadInfo>

                <input type='text' id='name' value={productInfo.name || ''} onChange={onChange} placeholder='제품명 입력' />

                <input type='number' id='price' value={productInfo.price || ''} onChange={onChange} placeholder='제품가격 입력' />

                <input type='text' id='deliveryFee' value={productInfo.deliveryFee || ''} onChange={onChange} placeholder='배송료 입력' />
                <p>* 미입력시 무료배송.</p>

            </UploadInfo>

            <br />

            <p>제품 분류 입력</p>
            <CategoryInfo>

                <p>대분류</p>
                <select id='mainCategory' value={productInfo.mainCategory || ''} onChange={onChange} required>
                    <option value=''>대분류 선택</option>
                    <option value='인형, 피규어'>인형, 피규어</option>
                    <option value='문구잡화'>문구잡화</option>
                    <option value='기타잡화'>기타잡화</option>
                    <option value='도서, 음반'>도서, 음반</option>
                </select>

                <p>소분류</p>
                <select id='subCategory' value={productInfo.subCategory || ''} onChange={onChange} required>
                    <option value=''>소분류 선택</option>
                    {productInfo.mainCategory === '인형, 피규어' && <>
                        <option value='인형'>인형</option>
                        <option value='피규어'>피규어</option>
                    </>}
                    {productInfo.mainCategory === '문구잡화' && <>
                        <option value='마우스패드'>마우스패드</option>
                        <option value='아크릴스탠드'>아크릴스탠드</option>
                        <option value='열쇠고리'>열쇠고리</option>
                    </>}
                    {productInfo.mainCategory === '기타잡화' && <>
                        <option value='의류'>의류</option>
                        <option value='식품'>식품</option>
                    </>}
                    {productInfo.mainCategory === '도서, 음반' && <>
                        <option value='도서'>도서</option>
                        <option value='음반'>음반</option>
                    </>}
                </select>

            </CategoryInfo>

            <br />

            <p>제품 옵션 정보 입력</p>
            <UploadProductOptionInfo>

                {/* {optionArray.map((item) => (
                    <Option key={item.number}>
                        <p>{item.number}번 옵션 입력</p>
                        <input type='text' id='productOption.option1' value={productInfo.productOption.option1 || ''} onChange={onChange} placeholder='옵션을 입력해주세요.' />
                    </Option>
                ))} */}

                {optionArray.length >= 1 && <>
                    <Option>
                        <hr />

                        <p>1번 옵션 입력</p>
                        <input type='text' id='option1' value={productOptionInfo.option1 || ''} onChange={onChangeOption} placeholder='1번 옵션을 입력해주세요.' />

                        <div>
                            <p>1번 옵션 추가금액</p>
                            <select id='option1SurchargeType' value={productOptionInfo.option1SurchargeType || ''} onChange={onChangeOption} required>
                                <option value='변동없음'>추가금액 없음</option>
                                <option value='추가가격'>+</option>
                                <option value='가격감소'>-</option>
                            </select>
                        </div>

                        {productOptionInfo.option1SurchargeType !== '변동없음' && <input type='text' id='option1SurchargePrice' value={productOptionInfo.option1SurchargePrice || ''} onChange={onChangeOption} placeholder='옵션의 변동수치를 입력해주세요.' />}

                        <hr />

                        <div>
                            <p>1번 옵션 구매한도량 입력</p>
                            <input type='text' id='option1PurchaseQuantityLimit' value={productOptionInfo.option1PurchaseQuantityLimit || ''} onChange={onChangeOption} placeholder='1번 옵션의 구매제한 한도를 입력해주세요.' />
                        </div>
                        <div>
                            <p>1번 옵션 재고량 입력</p>
                            <input type='text' id='option1Inventory' value={productOptionInfo.option1Inventory || ''} onChange={onChangeOption} placeholder='1번 옵션의 재고량을 입력해주세요.' />
                        </div>

                    </Option>

                    {optionArray.length >= 2 && <>
                        <Option>
                            <hr />
                            <p>2번 옵션 입력</p>
                            <input type='text' id='option2' value={productOptionInfo.option2 || ''} onChange={onChangeOption} placeholder='2번 옵션을 입력해주세요.' />

                            <div>
                                <p>2번 옵션 추가금액</p>
                                <select id='option2SurchargeType' value={productOptionInfo.option2SurchargeType || ''} onChange={onChangeOption} required>
                                    <option value='변동없음'>추가금액 없음</option>
                                    <option value='추가가격'>+</option>
                                    <option value='가격감소'>-</option>
                                </select>
                            </div>

                            {productOptionInfo.option2SurchargeType !== '변동없음' && <input type='text' id='option2SurchargePrice' value={productOptionInfo.option2SurchargePrice || ''} onChange={onChangeOption} placeholder='옵션의 변동수치를 입력해주세요.' />}

                            <hr />

                            <div>
                                <p>2번 옵션 구매한도량 입력</p>
                                <input type='text' id='option2PurchaseQuantityLimit' value={productOptionInfo.option2PurchaseQuantityLimit || ''} onChange={onChangeOption} placeholder='2번 옵션의 구매제한 한도를 입력해주세요.' />
                            </div>
                            <div>
                                <p>2번 옵션 재고량 입력</p>
                                <input type='text' id='option2Inventory' value={productOptionInfo.option2Inventory || ''} onChange={onChangeOption} placeholder='2번 옵션의 재고량을 입력해주세요.' />
                            </div>

                        </Option>

                        {optionArray.length >= 3 && <>
                            <Option>
                                <hr />
                                <p>3번 옵션 입력</p>
                                <input type='text' id='option3' value={productOptionInfo.option3 || ''} onChange={onChangeOption} placeholder='3번 옵션을 입력해주세요.' />

                                <div>
                                    <p>3번 옵션 추가금액</p>
                                    <select id='option3SurchargeType' value={productOptionInfo.option3SurchargeType || ''} onChange={onChangeOption} required>
                                        <option value='변동없음'>추가금액 없음</option>
                                        <option value='추가가격'>+</option>
                                        <option value='가격감소'>-</option>
                                    </select>
                                </div>

                                {productOptionInfo.option3SurchargeType !== '변동없음' && <input type='text' id='option3SurchargePrice' value={productOptionInfo.option3SurchargePrice || ''} onChange={onChangeOption} placeholder='옵션의 변동수치를 입력해주세요.' />}

                                <hr />

                                <div>
                                    <p>3번 옵션 재고량 입력</p>
                                    <input type='text' id='option3PurchaseQuantityLimit' value={productOptionInfo.option3PurchaseQuantityLimit || ''} onChange={onChangeOption} placeholder='3번 옵션의 구매제한 한도를 입력해주세요.' />
                                </div>
                                <div>
                                    <p>3번 옵션 구매한도량 입력</p>
                                    <input type='text' id='option3Inventory' value={productOptionInfo.option3Inventory || ''} onChange={onChangeOption} placeholder='3번 옵션의 재고량을 입력해주세요.' />
                                </div>

                            </Option>

                            {optionArray.length >= 4 && <>
                                <Option>
                                    <hr />
                                    <p>4번 옵션 입력</p>
                                    <input type='text' id='option4' value={productOptionInfo.option4 || ''} onChange={onChangeOption} placeholder='4번 옵션을 입력해주세요.' />

                                    <div>
                                        <p>4번 옵션 추가금액</p>
                                        <select id='option4SurchargeType' value={productOptionInfo.option4SurchargeType || ''} onChange={onChangeOption} required>
                                            <option value='변동없음'>추가금액 없음</option>
                                            <option value='추가가격'>+</option>
                                            <option value='가격감소'>-</option>
                                        </select>
                                    </div>

                                    {productOptionInfo.option4SurchargeType !== '변동없음' && <input type='text' id='option4SurchargePrice' value={productOptionInfo.option4SurchargePrice || ''} onChange={onChangeOption} placeholder='옵션의 변동수치를 입력해주세요.' />}

                                    <hr />

                                    <div>
                                        <p>4번 옵션 재고량 입력</p>
                                        <input type='text' id='option4PurchaseQuantityLimit' value={productOptionInfo.option4PurchaseQuantityLimit || ''} onChange={onChangeOption} placeholder='4번 옵션의 구매제한 한도를 입력해주세요.' />
                                    </div>
                                    <div>
                                        <p>4번 옵션 구매한도량 입력</p>
                                        <input type='text' id='option4Inventory' value={productOptionInfo.option4Inventory || ''} onChange={onChangeOption} placeholder='4번 옵션의 재고량을 입력해주세요.' />
                                    </div>

                                </Option>

                                {optionArray.length >= 5 && <>
                                    <Option>
                                        <hr />
                                        <p>5번 옵션 입력</p>
                                        <input type='text' id='option5' value={productOptionInfo.option5 || ''} onChange={onChangeOption} placeholder='5번 옵션을 입력해주세요.' />

                                        <div>
                                            <p>5번 옵션 추가금액</p>
                                            <select id='option5SurchargeType' value={productOptionInfo.option5SurchargeType || ''} onChange={onChangeOption} required>
                                                <option value='변동없음'>추가금액 없음</option>
                                                <option value='추가가격'>+</option>
                                                <option value='가격감소'>-</option>
                                            </select>
                                        </div>

                                        {productOptionInfo.option5SurchargeType !== '변동없음' && <input type='text' id='option5SurchargePrice' value={productOptionInfo.option5SurchargePrice || ''} onChange={onChangeOption} placeholder='옵션의 변동수치를 입력해주세요.' />}

                                        <hr />

                                        <div>
                                            <p>5번 옵션 재고량 입력</p>
                                            <input type='text' id='option5PurchaseQuantityLimit' value={productOptionInfo.option5PurchaseQuantityLimit || ''} onChange={onChangeOption} placeholder='5번 옵션의 구매제한 한도를 입력해주세요.' />
                                        </div>
                                        <div>
                                            <p>5번 옵션 구매한도량 입력</p>
                                            <input type='text' id='option5Inventory' value={productOptionInfo.option5Inventory || ''} onChange={onChangeOption} placeholder='5번 옵션의 재고량을 입력해주세요.' />
                                        </div>
                                    </Option>
                                </>}
                            </>}
                        </>}
                    </>}
                </>}

                <button onClick={() => optionCountControl('+')}>옵션 추가</button>
                <button onClick={() => optionCountControl('-')}>옵션 제거</button>

            </UploadProductOptionInfo>

            <br />

            <p>할인 정보 입력</p>
            <UploadSaleInfo>

                <input type='text' id='discountRate' value={productInfo.discountRate || ''} onChange={onChange} placeholder='제품 기본 할인률 입력' />

                {/* <input type='text' id='rewardAmountRate' value={productInfo.rewardAmountRate || ''} onChange={onChange} placeholder='캐쉬백 포인트 수치 입력' /> */}

                <select id='eventType' value={productInfo.eventType || ''} onChange={onChange} required>
                    <option value=''>이벤트 종류 선택</option>
                    <option>리뷰 이벤트</option>
                    <option>추가 포인트 적립</option>
                </select>

                <input type='text' id='eventPoint' value={productInfo.eventPoint || ''} onChange={onChange} placeholder='이벤트 포인트 수치 입력' />

            </UploadSaleInfo>

            <br />

            <p>제품 설명 입력</p>
            <UploadProductInfo>

                {/* {infomationFileArray.map((item) => (
                    <Option key={item.number}>
                        <p>{item.number}번 파일 첨부</p>
                        <input type='file' />
                    </Option>
                ))} */}

                {infomationFileArray.length >= 1 && <>
                    <Option>
                        <p>1번 파일 첨부</p>
                        <input type='file' id='infoImage1' onChange={onFileUpload} />
                    </Option>

                    {infomationFileArray.length >= 2 && <>
                        <Option>
                            <p>2번 파일 첨부</p>
                            <input type='file' id='infoImage2' onChange={onFileUpload} />
                        </Option>

                        {infomationFileArray.length >= 3 && <>
                            <Option>
                                <p>3번 파일 첨부</p>
                                <input type='file' id='infoImage3' onChange={onFileUpload} />
                            </Option>
                        </>}
                    </>}
                </>}

                <button onClick={() => fileCountControl('+')}>파일 추가</button>
                <button onClick={() => fileCountControl('-')}>파일 제거</button>

            </UploadProductInfo>

            <br />

            <p>입력 정보 확인</p>
            <InputCheck>
                입력 정보를 확인하는 창을 모달로 할지 생각중.. 임시 폐쇄.

                {/* 
                <img src={productImgFile.titleImage} alt='None' />

                <input type='text' value={productInfo.number || ''} readOnly placeholder='제품번호' />

                <input type='text' value={productInfo.name || ''} readOnly placeholder='제품명' />

                <input type='text' value={productInfo.price || ''} readOnly placeholder='제품가격' />

                <input type='text' value={productInfo.deliveryFee || ''} readOnly placeholder='배송료' />

                <input type='text' value={productInfo.purchaseQuantityLimit || ''} readOnly placeholder='인당 구매제한 수량 입력' />

                <input type='text' value={productInfo.mainCategory || ''} readOnly placeholder='대분류' />

                <input type='text' value={productInfo.subCategory || ''} readOnly placeholder='소분류' />

                {optionArray.length >= 1 && <>
                    <input type='text' value={productOptionInfo.option1 || ''} readOnly placeholder='1번 옵션' />

                    {optionArray.length >= 2 && <>
                        <input type='text' value={productOptionInfo.option2 || ''} readOnly placeholder='2번 옵션' />

                        {optionArray.length >= 3 && <>
                            <input type='text' value={productOptionInfo.option3 || ''} readOnly placeholder='3번 옵션' />

                            {optionArray.length >= 4 && <>
                                <input type='text' value={productOptionInfo.option4 || ''} readOnly placeholder='4번 옵션' />

                                {optionArray.length >= 5 && <>
                                    <input type='text' value={productOptionInfo.option5 || ''} readOnly placeholder='5번 옵션' />
                                </>}
                            </>}
                        </>}
                    </>}
                </>}

                <input type='text' value={productInfo.discountRate || ''} readOnly placeholder='기본 할인률' />

                <input type='text' value={productInfo.rewardAmountRate || ''} readOnly placeholder='포인트 적입률' />

                <input type='text' value={productInfo.eventType || ''} readOnly placeholder='기본 할인률' />

                <input type='text' value={productInfo.eventPoint || ''} readOnly placeholder='포인트 적입률' /> */}

            </InputCheck>


            <UploadButtonArea >

                {isLoading ?
                    <>
                        <UploadButton>
                            등록 중..
                        </UploadButton>
                    </>
                    :
                    <>
                        {isUpdate ?
                            <UploadButton onClick={onUpdate}>
                                수정하기
                            </UploadButton>
                            :
                            <UploadButton onClick={onUpload}>
                                제품 등록하기
                            </UploadButton>
                        }
                    </>}


            </UploadButtonArea>

        </>
    );
};
