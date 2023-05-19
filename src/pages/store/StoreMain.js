import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Test1, Test2 } from '../../redux/actions/storeAction';

export const StoreMain = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);
    const getStoreState = useSelector((state) => state.store);

    const [isUserError, setIsUserError] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [isStoreError, setIsStoreError] = useState(false);
    const [isStoreLoading, setIsStoreLoading] = useState(false);

    useEffect(() => {
        setIsUserError(getUserState.flagvalue.isError);
        setIsUserLoading(getUserState.flagvalue.isLoading);
    }, [getUserState.flagvalue]);

    useEffect(() => {
        setIsStoreError(getStoreState.flagValue.isError);
        setIsStoreLoading(getStoreState.flagValue.isLoading);
    }, [getStoreState.flagValue]);

    const a1 = () => {

    };
    const a2 = () => {

    };
    const a3 = () => {
        dispatch(Test1());
    };
    const a4 = () => {
        dispatch(Test2());
    };

    return (
        <div>

            <br /><br /><br /><br /><br /><br /><br /><br />

            {isUserError ? <>유저 에러!</> : <></>}<br />
            {isUserLoading ? <>유저 로딩!</> : <></>}<br />
            {isStoreError ? <>스토어 에러!</> : <></>}<br />
            {isStoreLoading ? <>스토어 로딩!</> : <></>}<br />

            StoreMain

            <button onClick={a1}>a1</button>
            <button onClick={a2}>a2</button>
            <button onClick={a3}>a3</button>
            <button onClick={a4}>a4</button>

        </div>
    );
};
