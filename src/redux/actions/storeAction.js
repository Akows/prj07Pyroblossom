import { doc, getCountFromServer, query, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { appAuth, timeStamp, storeCollectionRef, storageRef } from '../../configs/firebase/config'

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

        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        let infoFiles = ['', '', ''];
        let infoFileNames = ['', '', ''];

        for (let i = 0; i < 3; i++) {
            // productImgFile의 가장 첫 번째 자리는 제품 타이틀 이미지가 들어가있으므로 정보이미지 파일 처리를 위해서는 i의 값에 1을 더해주어야 한다.
            if (productImgFile[`infoImage${i + 1}`]) {
                infoFiles[i] = productImgFile[`infoImage${i + 1}`][0];
                infoFileNames[i] = productImgFile[`infoImage${i + 1}`][0].name;
            };
        };

        const process = async (infoFiles, infoFileNames) => {
            const querys = query(storeCollectionRef);
            const allProductCount = await getCountFromServer(querys);
            const docRef = doc(storeCollectionRef, `${productInfo.name}`);

            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    number: allProductCount.data().count + 1,
                    name: productInfo.name,
                    price: productInfo.price,
                    deliveryFee: productInfo.deliveryFee,
                    PurchaseQuantityLimit: productInfo.PurchaseQuantityLimit,
                    mainCategory: productInfo.mainCategory,
                    subCategory: productInfo.subCategory,
                    productOption: {
                        option1: productOptionInfo.option1,
                        option2: productOptionInfo.option2,
                        option3: productOptionInfo.option3,
                        option4: productOptionInfo.option4,
                        option5: productOptionInfo.option5,
                    },
                    productOptionSurchargeType: {
                        option1: productOptionInfo.option1SurchargeType,
                        option2: productOptionInfo.option2SurchargeType,
                        option3: productOptionInfo.option3SurchargeType,
                        option4: productOptionInfo.option4SurchargeType,
                        option5: productOptionInfo.option5SurchargeType,
                    },
                    productOptionSurchargePrice: {
                        option1: productOptionInfo.option1SurchargePrice,
                        option2: productOptionInfo.option2SurchargePrice,
                        option3: productOptionInfo.option3SurchargePrice,
                        option4: productOptionInfo.option4SurchargePrice,
                        option5: productOptionInfo.option5SurchargePrice,
                    },
                    discountRate: productInfo.discountRate,
                    rewardAmountRate: productInfo.rewardAmountRate,
                    eventType: productInfo.eventType,
                    eventPoint: productInfo.eventPoint,
                    productInformationFile: {
                        titleimage: productImgFile.titleImage[0].name,
                        infoimage1: infoFileNames[0],
                        infoimage2: infoFileNames[1],
                        infoimage3: infoFileNames[2],
                    },
                    registrationDate: createdTime
                }
            );

            const imagesRef = ref(storageRef, `productsImage/${productInfo.name}/${productImgFile.titleImage[0].name}`);
            await uploadBytes(imagesRef, productImgFile.titleImage[0]);

            for (let i = 0; i < 3; i++) {
                const imagesRef = ref(storageRef, `productsInfoImage/${productInfo.name}/${infoFileNames[i]}`);
                await uploadBytes(imagesRef, infoFiles[i]);
            };
        };

        process(infoFiles, infoFileNames)
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
                alert('제품 등록이 완료되었습니다.');
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: 'STORE_ERROR' });
            });
    };
};

export { Test1, AddProduct };
