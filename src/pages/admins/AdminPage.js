import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../redux/actions/userAction';

export const AdminPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [isError, setIsError] = useState(useSelector((state) => state.isError));
    // const [isLoading, setIsLoading] = useState(useSelector((state) => state.isLoading));
    // const [eMSG, setEMSG] = useState(useSelector((state) => state.errorMessage));

    const data = useSelector((state) => state.user.errorinfo);

    const test = () => {
        const userData = {
            email: 'admin@admin.com',
            password: '',
            name: '',
            displayName: '관리자',
            address: '',
        };

        dispatch(SignUp(userData, navigate));
    };

    useEffect(() => {
        console.log(data);
        console.log(data.errorCode);
        console.log(data.errorMessage);
    }, [data])


    return (
        <>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <div>AdminPage</div>

            <button onClick={test}>테스트버튼</button>

            {data?.errorCode} <br />
            {data?.errorMessage}
        </>
    )
}
