import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { OrderPurchase } from '../../components/store/payment/OrderPurchase';
import { PurchaseComplete } from '../../components/store/payment/PurchaseComplete';

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

export const PaymentPage = () => {

    // const { data } = useLocation();

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    const [whatComponentIsShow, setWhatComponentIsShow] = useState('orderpurchase');



    const getStoreState = useSelector((state) => state.store);
    const [purchaseData, setPurchaseData] = useState({});
    const [productData, setProductData] = useState({});

    useEffect(() => {
        setPurchaseData(getStoreState.purchaseData);
        setProductData(getStoreState.processInfo.processData2);
    }, [getStoreState.purchaseData]);

    return (
        <BackGround>
            <InnerContents>

                {whatComponentIsShow === 'orderpurchase' && <OrderPurchase setWhatComponentIsShow={setWhatComponentIsShow} purchaseData={purchaseData} productData={productData} />}

                {whatComponentIsShow === 'purchasecomplete' && <PurchaseComplete />}

            </InnerContents>
        </BackGround>
    );
};
