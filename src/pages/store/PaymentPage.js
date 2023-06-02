import React, { useState } from 'react'
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





export const PaymentPage = () => {

    const [whatComponentIsShow, setWhatComponentIsShow] = useState('orderpurchase');

    return (
        <BackGround>

            {whatComponentIsShow === 'orderpurchase' && <OrderPurchase setWhatComponentIsShow={setWhatComponentIsShow} />}

            {whatComponentIsShow === 'purchasecomplete' && <PurchaseComplete />}

        </BackGround>
    );
};
