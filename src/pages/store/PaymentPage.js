import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorModal } from '../../components/ErrorModal';
import { Loading } from '../../components/Loading';
import { OrderPurchase } from '../../components/store/payment/OrderPurchase';
import { PurchaseComplete } from '../../components/store/payment/PurchaseComplete';
import { PurchaseProduct } from '../../redux/actions/storeAction';
import { GetUserData } from '../../redux/actions/userAction';

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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { data } = useLocation();

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    const [whatComponentIsShow, setWhatComponentIsShow] = useState('orderpurchase');


    const getUserState = useSelector((state) => state.user);
    const getStoreState = useSelector((state) => state.store);

    const [purchaseData, setPurchaseData] = useState({});
    const [productData, setProductData] = useState({});
    const [userData, setUserData] = useState({});

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isShowModal, setIsShowModal] = useState(false);

    const onClickError = () => {
        setIsError(false);
        setIsShowModal(true);
    };

    const onPurchase = (purchaseData, productData, userData) => {
        dispatch(PurchaseProduct(purchaseData, productData, userData, navigate));
        setWhatComponentIsShow('purchasecomplete');
    };

    useEffect(() => {
        dispatch(GetUserData(getUserState.userdata.email));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setPurchaseData(getStoreState.purchaseData);
        setProductData(getStoreState.processInfo.processData2);
        setUserData(getUserState.userdata);
        // eslint-disable-next-line
    }, [getStoreState.purchaseData, getUserState.userdata]);

    useEffect(() => {
        setIsError(getStoreState.flagValue.isError);
        setIsLoading(getStoreState.flagValue.isLoading);
    }, [getStoreState.flagValue]);

    return (
        <BackGround>

            {isLoading && <Loading />}

            <InnerContents>

                {whatComponentIsShow === 'orderpurchase' && <OrderPurchase setWhatComponentIsShow={setWhatComponentIsShow} purchaseData={purchaseData} productData={productData} userData={userData} onPurchase={onPurchase} />}

                {whatComponentIsShow === 'purchasecomplete' && <PurchaseComplete onClickError={onClickError} purchaseData={purchaseData} productData={productData} userData={userData} isShowModal={isShowModal} setIsShowModal={setIsShowModal} />}

            </InnerContents>

            <ErrorModal isError={isError} getUserState={getStoreState} onClickError={onClickError} type='store' />

        </BackGround>

    );
};
