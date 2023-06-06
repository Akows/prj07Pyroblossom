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


const AddProduct = (productInfo) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const process = async () => {
            const querys = query(storeCollectionRef);
            const allProductCount = await getCountFromServer(querys);

            const docRef = doc(storeCollectionRef, `${productInfo.name}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    number: allProductCount.data().count + 1,
                    name: '',
                    price: '',
                    deliveryFee: '',
                    PurchaseQuantityLimit: '',
                    mainCategory: '',
                    subCategory: '',
                    productOption: {},
                    discountRate: '',
                    rewardAmount: '',
                    productInformationFile: {},
                    registrationDate: createdTime
                }
            );
        };






        dispatch({ type: 'STORE_COMPLETE' });
        dispatch({ type: 'STORE_ERROR' });
    };
};

export { Test1 };
