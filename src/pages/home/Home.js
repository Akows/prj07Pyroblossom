import { signOut } from "firebase/auth";
import { appAuth } from "../../configs/firebaseconfig";

const Home = () => {

    const handleLogout = () => {
        signOut(appAuth);
    }

    return (
        <>
            Home

            <button onClick={handleLogout}>๋ก๊ทธ์์</button>
        </>
    )
};

export default Home;