import { getCountFromServer, query } from 'firebase/firestore';
import { appAuth, timeStamp, storeCollectionRef } from '../../configs/firebase/config'

const Test1 = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });
        dispatch({ type: 'STORE_COMPLETE' });
        dispatch({ type: 'STORE_ERROR' });
    };
};


const AddProduct = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const process = async () => {
            const querys = query(storeCollectionRef);
            const allProductCount = await getCountFromServer(querys);

            const docRef = doc(storeCollectionRef, `${userData.email}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    Number: allProductCount.data().count + 1,

                    Name: '',
                    Price: '',
                    DeliveryFee: '',
                    PurchaseQuantityLimit: '',
                    MainCategory: '',
                    SubCategory: '',

                    DiscountRate: '',
                    RewardAmount: '',
                    ProductInformationFile1: '',
                    ProductInformationFile2: '',
                    ProductInformationFile3: '',
                    ProductInformationFile4: '',
                    ProductInformationFile5: '',



                    userType: '일반회원',
                    email: userData.email,
                    password: userData.password,
                    name: userData.name,
                    phonenumber: userData.phonenumber,
                    displayName: userData.displayname,
                    address: userData.address,
                    address2: userData.address2,
                    signupDate: createdTime
                }
            );
        };






        dispatch({ type: 'STORE_COMPLETE' });
        dispatch({ type: 'STORE_ERROR' });
    };
};

export { Test1 };
