import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PointChargeModal } from '../PointChargeModal';

const ProductListButtonArea = styled.div`
    width: 90%;
    height: 50px;

    margin-top: 120px;

    font-size: 28px;
    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid gray;

    & > div:nth-child(2) {
        font-size: 18px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    };

    & > div > p {
        margin: 10px;
    };

    & > div > p:nth-child(1) {
        opacity: 0.4;
    };
`;

const CompleteText = styled.div`
    width: 90%;
    height: 100%;

    font-size: 24px;
    color: #D3BC8E;

    margin-top: 30px;

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
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-top: 3px solid #D3BC8E;

    border-radius: 0px 0px 15px 15px;
`;
const ProductImg = styled.div`
    width: 20%;
    height: 100%;

    margin-top: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > img {
        width: 75%;
        height: 75%;

        border-radius: 20px;
    };
`;
const PurchaseInfo = styled.div`
    width: 80%;
    height: 100%;

    margin-top: 10px;
`;

const PurchaseName = styled.div`
    width: 100%;
    height: 50px;
`;
const DeliveryInfo = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    margin-bottom: 20px;

    & > p {
        font-size: 18px;
        margin: 5px;
    };
`;
const PurchasePrice = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    & > p {
        font-size: 18px;
        margin: 5px;
    };

    & > p:nth-child(1) {
        font-size: 14px;
        text-decoration: line-through;
        opacity: 0.6;
    };
`;


const ShippingAddress = styled.div`
    width: 100%;
    height: 100%;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;
`;
const DeliveryAddress = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    font-size: 28px;

    & > p:nth-child(2) {
        margin-top: 10px;

        font-size: 20px;
    };
    & > p:nth-child(3) {
        font-size: 20px;
    };

`;


const BuyerBenefit = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 15px 15px;

    & > p {
        margin-top: 10px;
        margin-left: 15px;
    };
`;

const PriceInfo = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 10px;
    margin-left: 15px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    font-size: 18px;
    opacity: 1;

    & > p {
        margin-top: 5px;
    };

    & > p:nth-child(1) {
        opacity: 0.6;
    };
    & > p:nth-child(2) {
        opacity: 0.6;
    };
    & > p:nth-child(3) {
        opacity: 0.6;
    };
    & > p:nth-child(4) {
        margin-top: 10px;
        margin-bottom: 15px;
        padding-top: 5px;

        border-top: 1px solid gray;
        font-size: 24px;
    };
`;

const PaymentSubmit = styled.div`
    width: 100%;
    height: 100%;

    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;

    border-radius: 15px 15px 0px 0px;

    & > p {
        margin-top: 10px;
        margin-left: 15px;
    };
    & > button {
        width: 200px;
        height: 45px;

        margin-top: 20px;
        margin-bottom: 20px;

        border: 2px solid #535B6C;
        border-radius: 25px;
        background-color: #50596B;

        font-family: 'GIFont';
        font-size: 32px;
        color: #D3BC8E;
    };
`;

export const PurchaseComplete = ({ onClickError, purchaseData, productData, userData, isShowModal, setIsShowModal }) => {

    const navigate = useNavigate();

    const getStoreState = useSelector((state) => state.store);

    const [purchaseDatas, setPurchaseDatas] = useState([]);
    const [productDatas, setProductDatas] = useState({});
    const [userDatas, setUserDatas] = useState({});

    const [isError, setIsError] = useState(false);

    const onSubmit = () => {
        navigate('/store/mypage');
    };

    useEffect(() => {
        setPurchaseDatas(purchaseData);
        setProductDatas(productData);
        setUserDatas(userData);
        // eslint-disable-next-line
    }, [purchaseData, productData, userData]);

    useEffect(() => {
        setIsError(getStoreState.flagValue.isError);
    }, [getStoreState.flagValue]);

    return (
        <>
            {isError ?
                <>
                    <ProductListButtonArea>
                        <p>주문/결제</p>

                        <div>
                            <p>주문/결제</p>
                            {'>'}
                            <p>포인트 충전</p>
                        </div>
                    </ProductListButtonArea>

                    <PointChargeModal userData={userData} isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
                </>
                :
                <>

                    <ProductListButtonArea>
                        <p>주문/결제</p>

                        <div>
                            <p>주문/결제</p>
                            {'>'}
                            <p>완료</p>
                        </div>
                    </ProductListButtonArea>

                    <CompleteText>

                        {purchaseDatas.purchaseList?.map((item) => (
                            <ProductInfo key={item.optionNumber}>

                                <ProductImg>
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${productDatas[0].name}%2F${productDatas[0]?.productInformationFile.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                                </ProductImg>
                                <PurchaseInfo>

                                    <PurchaseName>
                                        <p>{item.optionName}</p>
                                    </PurchaseName>
                                    <DeliveryInfo>
                                        <p>구매수량 : {item.purchaseQuantity}개</p>
                                        {productDatas[0]?.deliveryFee === 0 ? <p>무료배송</p> : <p>배송료 : {productDatas[0]?.deliveryFee}원</p>}
                                    </DeliveryInfo>
                                    <PurchasePrice>
                                        {productDatas[0]?.price > item.optionPrice ? <p>(-) {productDatas[0]?.discountRate}%</p> : <p></p>}
                                        <p>{item.totalAmount}원</p>
                                    </PurchasePrice>

                                </PurchaseInfo>

                            </ProductInfo>
                        ))}

                        <ShippingAddress>
                            <DeliveryAddress>
                                <p>배송주소</p>

                                <p>{userDatas.address}</p>
                                <p>{userDatas.address2}</p>
                            </DeliveryAddress>
                        </ShippingAddress>

                        <BuyerBenefit>
                            <p>할인 및 최종결제 내역</p>

                            <PriceInfo>
                                <p>주문금액 : {purchaseData.totalAmount}원</p>
                                <p>배송비 : {productDatas[0]?.deliveryFee}원</p>
                                <p></p>
                                <p>결제금액 : {purchaseData.totalAmount + parseInt(productDatas[0]?.deliveryFee)}원</p>
                            </PriceInfo>

                        </BuyerBenefit>


                        <PaymentSubmit>
                            <p>주문이 완료되었습니다. 구매해주셔서 감사합니다^^</p>

                            <button onClick={onSubmit}>확인</button>
                        </PaymentSubmit>

                    </CompleteText>
                </>
            }


        </>
    );
};
