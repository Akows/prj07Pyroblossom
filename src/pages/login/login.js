import { useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleData = (event) => {
        if (event.target.type === 'email') {
            setEmail(event.target.value);
        } 
        else if (event.target.type === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
        } 
        catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='myEmail'>email : </label>
            <input type='email' id='myEmail' required onChange={handleData} value={email} />

            <label htmlFor='myPassWord'>password : </label>
            <input type='password' id='myPassWord' required onChange={handleData} value={password} />

            <button type='submit' className='btn' disabled={loading}>로그인</button>

            {errorMessage && <p>{errorMessage}</p>}
        </form>
    )
};

export default Login;

// admin@admin.com
// 123123