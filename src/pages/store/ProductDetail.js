import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Reviews } from '../../components/store/productDetail/Reviews';
// import { QnA } from '../../components/store/productDetail/QnA';
import { ProductInfomation } from '../../components/store/productDetail/ProductInfomation';

import { useDispatch, useSelector } from 'react-redux';
import { AddShoppingBasket, GetProductInfo, GetShoppingBasket, GoToPurchasePage } from '../../redux/actions/storeAction';

const SpecialCharacter = styled.p`
    margin-left: 2px;
    margin-right: 2px;
`;

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: rgba( 65, 71, 89, 1 );
`;

const InnerContents = styled.div`
    width: 1200px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;

const ProductTypeShowArea = styled.div`
    width: 90%;
    height: 20px;

    margin-top: 120px;

    font-size: 18px;
    color: #D3BC8E;

    @media screen and (max-width: 1200px) {
        margin-top: 130px;
        height: 100%;
    };
`;
const ProductInfoArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OtherInfoArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 30px;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductInfo = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProductImg = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > img {
        width: 100%;
        height: 100%;
    };

    @media screen and (max-width: 1000px) {
        width: 90%;
    }
`;

const ProductPayInfo = styled.div`
    width: 50%;
    height: 100%;

    margin-left: 10px;

    @media screen and (max-width: 1000px) {
        width: 90%;
    };

    & > p {
        font-size: 18px;
        color: #D3BC8E;
    };
`;

const ProductName = styled.div`
    width: 100%;
    height: 100%;

    font-size: 32px;
    color: #D3BC8E;

    margin-top: 10px;
    margin-bottom: 20px;
`;
const ProductPrice = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    margin-top: 10px;
    margin-bottom: 10px;
`;
const SalePer = styled.div`
    width: 7%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: #D3BC8E;
`;

const Price = styled.div`
    width: 93%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;
const ListPrice = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    font-size: 18px;
    color: #D3BC8E;

    text-decoration: line-through;
    opacity: 0.3;
`;
const LastPrice = styled.div`
    width: 130px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    font-size: 26px;
    color: #D3BC8E;

    margin-right: 5px;
`;

const EventInfo = styled.div`
    width: 95%;
    height: 100%;

    font-size: 18px;
    color: #D3BC8E;

    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;

    border: 1px solid black;

    & > p {
        margin: 10px;
    };
`;

const PurchaseInfo = styled.div`
    width: 100%;
    height: 100%;

    font-size: 16px;
    color: #D3BC8E;

    & > p {
        margin: 5px;
        margin-bottom: 10px;
    };
`;

const PurchaseSelect = styled.select`
    width: 100%;
    height: 40px;

    font-family: 'GIFont';
    font-size: 16px;

    border-radius: 10px;

    margin-top: 10px;
    margin-bottom: 15px;
`;

const PurchasePrice = styled.div`
    width: 100%;
    height: 100%;

    font-size: 16px;
    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    margin-top: 10px;
    margin-bottom: 10px;
`;
const PurchasePrice1 = styled.div`
    width: 20%;
    height: 100%;

    font-size: 18px;

    @media screen and (max-width: 800px) {
        width: 30%;
    }
`;
const PurchasePrice2 = styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    & > p:nth-child(1) {
        font-size: 18px;
        opacity: 0.8;
    };
    & > p:nth-child(3) {
        font-size: 24px;
    };

    @media screen and (max-width: 800px) {
        width: 70%;
    }
`;

const PurchaseOption = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    font-size: 22px;
    color: #D3BC8E;

    margin-top: 20px;
    margin-bottom: 20px;

    & > p {
        width: 100%;
    }
`;

const PurchaseOption1 = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > button {
        width: 30px;
        height: 30px;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;

        font-family: 'GIFont';
        font-size: 22px;
    };
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;

const PurchaseOption2 = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin-top: 10px;
    margin-bottom: 10px;

    & > div {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    };
    & > div:nth-child(1) {
        width: 90px;

        justify-content: flex-start;
    };
    & > div:nth-child(1) > button {
        width: 30px;
        height: 30px;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;

        text-align: center;

        font-family: 'GIFont';
        font-size: 22px;
    };
    & > div:nth-child(1) > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
    & > div:nth-child(1) > p {
        width: 30px;
        height: 30px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
    };

    & > div:nth-child(2) {
        justify-content: flex-end;
    };
`;


const PurchaseUtil = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    margin-top: 10px;
    margin-bottom: 15px;

    & > button {
        width: 60%;
        height: 100%;

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


const PurchaseButton = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;

    & > button {
        width: 95%;
        height: 100%;

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






const OtherInfo = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const OtherInfoButtons = styled.div`
    width: 100%;
    height: 55px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > button {
        width: 50%;
        height: 100%;

        margin: 3px;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;

        font-family: 'GIFont';
        font-size: 16px;

        @media screen and (max-width: 1000px) {
            width: 100%;
            height: 33.3%;
        };
    };
    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        height: 150px;
    };
`;

const OtherInfoComponentArea = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 20px;
`;

export const ProductDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserState = useSelector((state) => state.user);
    const getStoreState = useSelector((state) => state.store);

    const [whatCompoIsShow, setWhatCompoIsShow] = useState('review');

    const OtherInfoScrollMovePoint = useRef();
    const setWhatComponentsRender = (name) => {
        setWhatCompoIsShow(name);
        OtherInfoScrollMovePoint.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [isLogin, setIsLogin] = useState(false);

    const [isBasketIn, setIsBasketIn] = useState(true);

    const [productData, setProductData] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const onSelectPurchaseOption = (event) => {

        // 옵션선택문구는 옵션선택으로 간주되지 않도록 한번 걸러준다.
        if (event.target.value === '') {
            return;
        };

        // 한번 선택된 옵션이 다시 선택되지 않도록 걸러준다.
        for (let value of purchaseList) {
            if (event.target.value === value.optionName) {
                return;
            };
        };

        const data = {
            optionNumber: '',
            optionName: '',
            optionPrice: '',
            purchaseQuantity: 1,
            totalAmount: 0,
        };

        for (let [key, value] of Object.entries(productData[0]?.productOption)) {
            if (event.target.value === value) {
                data.optionNumber = key;
                data.optionName = value;
                break;
            };
        };

        for (let [key, value] of Object.entries(productData[0]?.productOptionSurchargePrice)) {
            if (data.optionNumber === key) {
                data.optionPrice = value - (value * productData[0]?.discountRate / 100);
                data.totalAmount = value - (value * productData[0]?.discountRate / 100);
                break;
            };
        };

        setTotalQuantity(totalQuantity + data.purchaseQuantity);
        setPurchaseList([...purchaseList, data]);
    };

    const onPurchaseQuantity = (type, item) => {
        // 깊은 복사로 item 객체를 복사.
        const data = JSON.parse(JSON.stringify(item));

        // 변경된 갯수값을 반영.
        if (type === '-') {
            data.purchaseQuantity -= 1;

            if (data.purchaseQuantity < 1) {
                alert('상품의 갯수는 1개 이상이어야합니다.');
                data.purchaseQuantity = 1;
                return;
            };

            data.totalAmount = data.optionPrice * data.purchaseQuantity;
            setTotalQuantity(totalQuantity - 1);
        }
        else if (type === '+') {

            // 각 옵션의 구매갯수 제한보다 더 많은 수량을 선택할 수 없도록 한다.
            for (let [key, value] of Object.entries(productData[0]?.productOptionPurchaseQuantityLimit)) {
                if (data.optionNumber === key) {

                    if (data.purchaseQuantity > value) {
                        alert('구매 갯수 제한보다 더 많이 구매할 수 없습니다.');
                        break;
                    }
                    else {
                        data.purchaseQuantity += 1;
                        data.totalAmount = data.optionPrice * data.purchaseQuantity;
                        setTotalQuantity(totalQuantity + 1);
                    };
                };
            };
        };

        // 기존 배열의 optionNumber와 현재 제어중인 optionNumber를 비교하여..
        // 동일한 경우에는 새롭게 만든 data가 기존의 요소를 대체하도록 한다.
        const itemNumber = item.optionNumber;
        setPurchaseList(
            purchaseList.map((item) =>
                item.optionNumber === itemNumber ? data : item
            )
        );
    };

    const onOptionDelete = (item) => {
        const itemNumber = item.optionNumber;

        setPurchaseList(
            purchaseList.filter((item) =>
                item.optionNumber !== itemNumber
            )
        );

        setTotalQuantity(totalQuantity - item.purchaseQuantity);
    };

    const onGoShoppingBasket = () => {

        const confirmChoice = window.confirm('이미 장바구니에 추가된 상품입니다. 장바구니로 이동하시겠습니까?');

        if (!confirmChoice) {
            return;
        }
        else {
            navigate('/store/mypage/shoppingbasket', { replace: true });
        };
    };


    const onAddShoppingBasket = () => {
        if (purchaseList.length === 0) {
            alert('하나 이상의 옵션을 선택해야합니다.');
            return;
        };

        if (!isLogin) {
            alert('로그인한 회원만 장바구니 기능을 사용할 수 있습니다.');
            return;
        };

        const confirmChoice = window.confirm('장바구니에 추가하시겠어요?');

        if (!confirmChoice) {
            return;
        }
        else {
            dispatch(AddShoppingBasket(getUserState.userdata, productData, purchaseList, totalQuantity, totalAmount, navigate));
        };
    };

    const onBuy = () => {
        if (purchaseList.length === 0) {
            alert('하나 이상의 옵션을 선택해야합니다.');
            return;
        };

        if (!isLogin) {
            alert('로그인한 회원만 구매가 가능합니다.');
            return;
        };

        console.log(purchaseList, totalQuantity, totalAmount);

        dispatch(GoToPurchasePage(purchaseList, totalQuantity, totalAmount, navigate, false));
    };

    // 리뷰 작성시 isRendering 변수가 변화하면서 제품 데이터를 다시 로딩한다.
    useEffect(() => {
        dispatch(GetProductInfo(id));
        dispatch(GetShoppingBasket(getUserState.userdata.email));
        // eslint-disable-next-line
    }, [getStoreState.flagValue.isRendering]);

    useEffect(() => {
        setIsLogin(getUserState.flagvalue.isLogin);
    }, [getUserState.flagvalue]);

    useEffect(() => {

        if (productData[0]?.name !== id) {
            setProductData(getStoreState.processInfo.processData2);

            if (Object.keys(getStoreState.basketData).length !== 0) {
                if (getStoreState.processInfo.processData2[0].name === getStoreState.basketData[0].productData[0].name) {
                    setIsBasketIn(true);
                }
                else {
                    setIsBasketIn(false);
                };
            }
            else {
                setIsBasketIn(false);
            };
        };

        if (productData.length === 0) {
            setProductData(getStoreState.processInfo.processData2);

            if (Object.keys(getStoreState.basketData).length !== 0) {
                if (getStoreState.processInfo.processData2[0].name === getStoreState.basketData[0].productData[0].name) {
                    setIsBasketIn(true);
                }
                else {
                    setIsBasketIn(false);
                };
            }
            else {
                setIsBasketIn(false);
            };
        };

        // eslint-disable-next-line
    }, [getStoreState.processInfo, getStoreState.basketData]);


    useEffect(() => {
        let result = 0;

        for (let value of purchaseList) {
            result += value.totalAmount;
        };

        setTotalAmount(result);
    }, [purchaseList]);

    return (
        <BackGround>

            <InnerContents>

                <ProductTypeShowArea>
                    {productData[0]?.mainCategory} {'>'} {productData[0]?.subCategory} {'>'} {productData[0]?.name}
                </ProductTypeShowArea>

                <ProductInfoArea>
                    <ProductInfo>
                        <ProductImg>
                            <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${productData[0]?.name}%2F${productData[0]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                        </ProductImg>
                        <ProductPayInfo>
                            <ProductName>
                                {productData[0]?.name}
                            </ProductName>
                            <ProductPrice>
                                <SalePer>
                                    {productData[0]?.discountRate}%
                                </SalePer>

                                <Price>
                                    <ListPrice>
                                        {productData[0]?.price}원
                                    </ListPrice>
                                    <LastPrice>
                                        {productData[0]?.price - (productData[0]?.price * productData[0]?.discountRate / 100)}원
                                    </LastPrice>
                                </Price>
                            </ProductPrice>

                            <p>제품 판매량: {productData[0]?.productSalesRate}</p>

                            <EventInfo>
                                <p>회원님을 위한 해택</p>
                                <hr />

                                {/* {productData[0]?.rewardAmountRate !== 0 && <p>적립포인트 : {productData[0]?.rewardAmountRate}P</p>} */}
                                <p>이벤트 : {productData[0]?.eventType}</p>
                                <p>이벤트 포인트 : {productData[0]?.eventPoint}P</p>
                            </EventInfo>

                            <PurchaseInfo>
                                <p>택배배송 : 무료, 우체국택배</p>
                                <p>도서산간지역 {productData[0]?.deliveryFee}원</p>
                                <hr />

                                <PurchaseSelect onChange={onSelectPurchaseOption}>
                                    <option value=''>제품옵션선택</option>
                                    {productData[0]?.productOption.option1 !== '옵션없음' && <option value={productData[0]?.option1}>{productData[0]?.productOption.option1}</option>}
                                    {productData[0]?.productOption.option2 !== '옵션없음' && <option value={productData[0]?.option2}>{productData[0]?.productOption.option2}</option>}
                                    {productData[0]?.productOption.option3 !== '옵션없음' && <option value={productData[0]?.option3}>{productData[0]?.productOption.option3}</option>}
                                    {productData[0]?.productOption.option4 !== '옵션없음' && <option value={productData[0]?.option4}>{productData[0]?.productOption.option4}</option>}
                                    {productData[0]?.productOption.option5 !== '옵션없음' && <option value={productData[0]?.option5}>{productData[0]?.productOption.option5}</option>}
                                </PurchaseSelect>

                            </PurchaseInfo>

                            {purchaseList.map((item) => (
                                <PurchaseOption key={item.optionNumber}>
                                    <PurchaseOption1>
                                        <p>{item.optionName}</p>

                                        <button onClick={() => onOptionDelete(item)}>X</button>
                                    </PurchaseOption1>

                                    <PurchaseOption2>

                                        <div>
                                            <button onClick={() => onPurchaseQuantity('-', item)}>-</button>
                                            <p>{item.purchaseQuantity}</p>
                                            <button onClick={() => onPurchaseQuantity('+', item)}>+</button>
                                        </div>

                                        <div>
                                            <p>{item.totalAmount}원</p>
                                        </div>

                                    </PurchaseOption2>
                                </PurchaseOption>
                            ))}


                            <PurchasePrice>
                                <PurchasePrice1>
                                    전체 금액
                                </PurchasePrice1>
                                <PurchasePrice2>
                                    <p>선택 품목 : {totalQuantity}개</p>

                                    <SpecialCharacter>&#124;</SpecialCharacter>

                                    <p>{totalAmount}원</p>
                                </PurchasePrice2>
                            </PurchasePrice>

                            <PurchaseUtil>
                                {/* <button>찜하기</button> */}

                                {isBasketIn ?
                                    <button onClick={onGoShoppingBasket}>장바구니로 가기</button>
                                    :
                                    <button onClick={onAddShoppingBasket}>장바구니에 담기</button>
                                }
                            </PurchaseUtil>

                            <PurchaseButton ref={OtherInfoScrollMovePoint} isSale={productData[0]?.inventory <= 0}>
                                {productData[0]?.inventory <= 0 ?
                                    <button>품절</button>
                                    :
                                    <button onClick={() => onBuy()}>구매하기</button>
                                }
                            </PurchaseButton>
                        </ProductPayInfo>
                    </ProductInfo>
                </ProductInfoArea>

                <OtherInfoArea>
                    <OtherInfo>
                        <OtherInfoButtons>
                            <button onClick={() => setWhatComponentsRender('review')}>
                                리뷰
                            </button>
                            <button onClick={() => setWhatComponentsRender('info')}>
                                제품정보
                            </button>
                            {/* <button onClick={() => setWhatComponentsRender('qna')}>
                                QnA
                            </button> */}
                        </OtherInfoButtons>

                        <OtherInfoComponentArea>

                            {whatCompoIsShow === 'review' && <Reviews productData={productData[0]} userData={getUserState} />}
                            {whatCompoIsShow === 'info' && <ProductInfomation productData={productData[0]} />}
                            {/* {whatCompoIsShow === 'qna' && <QnA />} */}

                        </OtherInfoComponentArea>
                    </OtherInfo>


                </OtherInfoArea>

            </InnerContents>


        </BackGround>
    );
};