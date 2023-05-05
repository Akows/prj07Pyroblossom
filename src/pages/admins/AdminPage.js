import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SignUp } from '../../redux/actions/userAction';

export const AdminPage = () => {

    const dispatch = useDispatch();

    // const [isError, setIsError] = useState(useSelector((state) => state.isError));
    // const [isLoading, setIsLoading] = useState(useSelector((state) => state.isLoading));
    // const [eMSG, setEMSG] = useState(useSelector((state) => state.errorMassage));

    const data = useSelector((state) => state);

    const test = () => {
        const userData = {
            email: 'admin@admin.com',
            password: '',
            name: '',
            displayName: '관리자',
            address: '',
        };

        dispatch(SignUp(userData));
    };

    useEffect(() => {
        console.log(data);
    }, [data])


    return (
        <>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <div>AdminPage</div>

            <button onClick={test}>테스트버튼</button>
        </>
    )
}
