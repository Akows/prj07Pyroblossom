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

    return (
        <div>

            <br /><br /><br /><br /><br /><br /><br /><br />

            StoreMain

        </div>
    );
};
