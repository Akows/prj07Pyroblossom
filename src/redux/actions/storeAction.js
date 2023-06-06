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


const AddProduct = (productInfo, productOptionInfo, productImgFile) => {
    return (dispatch, getState) => {

        // console.log(productInfo);
        // console.log(productOptionInfo);
        console.log(productImgFile);

        console.log(productImgFile.titleimage);

        // 하나의 온전한 파일 데이터
        console.log(productImgFile.titleimage[0]);

        console.log(productImgFile.titleimage[0].name);







        // dispatch({ type: 'STORE_STATE_INIT' });
        // dispatch({ type: 'STORE_LOADING' });
        // dispatch({ type: 'STORE_COMPLETE' });
        // dispatch({ type: 'STORE_ERROR' });

        // const process = async () => {
        //     const querys = query(storeCollectionRef);
        //     const allProductCount = await getCountFromServer(querys);

        //     const docRef = doc(storeCollectionRef, `${productInfo.name}`);
        //     const createdTime = timeStamp.fromDate(new Date());

        //     await setDoc(docRef,
        //         {
        //             number: allProductCount.data().count + 1,
        //             name: '',
        //             price: '',
        //             deliveryFee: '',
        //             PurchaseQuantityLimit: '',
        //             mainCategory: '',
        //             subCategory: '',
        //             productOption: {},
        //             discountRate: '',
        //             rewardAmountRate: '',
        //             eventType: '',
        //             eventPoint: '',
        //             productInformationFile: {},
        //             registrationDate: createdTime
        //         }
        //     );
        // };







    };
};

export { AddProduct };
