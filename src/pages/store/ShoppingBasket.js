import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MyPageNavigation } from '../../components/store/myPage/MyPageNavigation';
import { DeleteShoppingBasket, GetShoppingBasket, GoToPurchasePage } from '../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba( 65, 71, 89, 1 );

    color: #D3BC8E;
`;

const InnerContents = styled.div`
    width: 1200px;
    height: 100%;

    margin-top: 20px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    };
`;

const ComponentArea = styled.div`
    width: 68%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;

const UserUtilButton = styled.div`
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
const Info1 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info2 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info3 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
`;
const Info4 = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p:nth-child(1) {
        opacity: 0.7;
    };
    & > p:nth-child(2) {
        font-size: 18px;
    };
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


const UserComponent = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Basket = styled.div`
    width: 95%;
    height: 100%;

    margin-top: 5px;
    margin-bottom: 10px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    border: 1px solid gray;
    border-radius: 15px;

    & > input {
        width: 25px;
        height: 25px;
    };

    & > div:nth-child(2) {
        width: 100%;
        height: 30px;

        margin-top: 30px;

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    };

    & > div:nth-child(2) > p {
        font-size: 22px;
    };

    & > div:nth-child(2) > p:nth-child(2):hover {
        color: gray;
    };
`;


const BasketInfo = styled.div`
    width: 95%;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;
const ProductImg = styled.div`
    width: 120px;
    height: 120px;

    & > img {
        width: 100%;
        height: 100%;

        border-radius: 15px;
    };
`;
const ProductInfo = styled.div`
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
    & > p:nth-child(2) {
        font-size: 18px;

        margin-top: 3px;
    };
    & > p:nth-child(3) {
        margin-top: 8px;
    };
    & > p:nth-child(4) {
        margin-top: 12px;
    };
`;


export const ShoppingBasket = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserState = useSelector((state) => state.user);
    const getStoreState = useSelector((state) => state.store);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [listData, setListData] = useState([]);

    const [productPrice, setProductPrice] = useState(0);
    const [productDeliveryFee, setProductDeliveryFee] = useState(0);

    const onDelete = (item) => {
        const choice = window.confirm('장바구니를 삭제하시겠습니까?');

        if (!choice) {
            return;
        }
        else {
            dispatch(DeleteShoppingBasket(item, navigate))
        };
    };

    const onPurchase = () => {
        dispatch(GoToPurchasePage(getStoreState.basketData, '', '', navigate, true));
    };

    useEffect(() => {
        dispatch(GetShoppingBasket(getUserState.userdata.email));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (Object.keys(getStoreState.basketData).length !== 0) {
            setListData(getStoreState.basketData);

            // eslint-disable-next-line
            listData?.map((item) => {
                let result = 0;
                result += item.productData[0].deliveryFee;

                setProductDeliveryFee(result);

                // eslint-disable-next-line
                item.purchaseList.map((item2) => {
                    let result = 0;
                    result += item2.totalAmount;

                    setProductPrice(result);
                });
            });
        }
        else {
            setListData([]);
        };

        // eslint-disable-next-line
    }, [getStoreState.basketData, listData]);

    useEffect(() => {
        setIsLoading(getStoreState.flagValue.isLoading);
        setIsError(getStoreState.flagValue.isError);
    }, [getStoreState.flagValue]);

    return (
        <BackGround>
            <MyPageNavigation />

            <InnerContents>

                <ComponentArea>

                    {/* <UserUtilButton>

                        <div>
                            <input type='checkbox' />
                            <p>전체 선택</p>
                        </div>

                        <button>전체 삭제</button>

                    </UserUtilButton> */}

                    <UserComponent>

                        {listData?.length !== 0 ?
                            <>
                                {listData?.map((item) => (
                                    <Basket key={item.basketNumber}>
                                        {/* <input type='checkbox' /> */}

                                        {item?.purchaseList.map((item2) => (
                                            <BasketInfo>
                                                <ProductImg>
                                                    <img src='' alt='' />
                                                </ProductImg>
                                                <ProductInfo>
                                                    <p>{item2.optionName}</p>
                                                    <p>{item2.purchaseQuantity}개</p>
                                                    <p>{item2.totalAmount}원</p>
                                                </ProductInfo>
                                            </BasketInfo>
                                        ))}

                                        <div>
                                            <p>배송비 {item.productData[0].deliveryFee}원</p>

                                            <p onClick={() => onDelete(item)}>X</p>
                                        </div>

                                    </Basket>
                                ))}
                            </>
                            :
                            '장바구니 내역이 존재하지 않습니다.'
                        }

                    </UserComponent>

                    {listData?.length !== 0 ?
                        <>
                            <PurchaseInfo>
                                <Info1>
                                    <p>제품 가격</p>
                                    <p>{productPrice}원</p>
                                </Info1>

                                <p> + </p>

                                <Info2>
                                    <p>배송비</p>
                                    <p>{productDeliveryFee}원</p>
                                </Info2>

                                <p> = </p>

                                <Info4>
                                    <p>총주문금액</p>
                                    <p>{productPrice + productDeliveryFee}원</p>
                                </Info4>
                            </PurchaseInfo>

                            <PurchaseInfo>

                                <PurchaseInfoButton onClick={onPurchase}>
                                    구매하기
                                </PurchaseInfoButton>

                            </PurchaseInfo>
                        </>
                        :
                        <>
                            <PurchaseInfo>
                                <br />
                                <br />
                            </PurchaseInfo>

                            <PurchaseInfo>
                                <PurchaseInfoButton>
                                    비어있는 장바구니
                                </PurchaseInfoButton>
                            </PurchaseInfo>
                        </>}

                </ComponentArea>

            </InnerContents>
        </BackGround>
    );
};

