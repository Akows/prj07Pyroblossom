import { signOut } from "firebase/auth";
import { appAuth } from "../../configs/firebaseconfig";

const Home = () => {

    const handleLogout = () => {
        signOut(appAuth);
    }

    return (
        <>
            Home

            <button onClick={handleLogout}>로그아웃</button>
        </>
    )
};

export default Home;