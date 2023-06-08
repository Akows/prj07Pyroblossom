import { doc, endBefore, getCountFromServer, getDocs, limit, limitToLast, orderBy, query, setDoc, startAfter } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { createErrorData } from '../../configs/errorCodes';
import { timeStamp, storeCollectionRef, storageRef } from '../../configs/firebase/config'

const Test1 = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });
        dispatch({ type: 'STORE_COMPLETE' });
        dispatch({ type: 'STORE_ERROR' });
    };
};

const AddProduct = (productInfo, productOptionInfo, productImgFile, navigate) => {
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
                navigate('/store/mypage', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                alert('제품 등록 과정에서 에러가 발생하였습니다.');
                navigate('/store/mypage', { replace: true });
            });
    };
};

const GetProductList = (listGetType) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const result = [];

        const pagingProcess = async (queryRef) => {
            const documentSnapshots = await getDocs(queryRef);

            const newFirstVisible = documentSnapshots.docs[0];
            const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

            documentSnapshots.forEach((doc) => {
                result.push(doc.data());
            });

            const returnData = {
                processData1: {
                    firstVisible: newFirstVisible, 
                    lastVisible: newLastVisible
                },
                processData2: {
                    Data: result, 
                },
            };

            dispatch({ type: 'STORE_PAGING_PROCESS', payload: returnData });
        };

        const process = (listGetType) => {
            let queryRef = '';
            const { firstVisible, lastVisible } = getState().store.processInfo.processData1;

            if (listGetType === '') {
                queryRef = query(storeCollectionRef, orderBy('registrationDate'), limit(1));
            };

            if (listGetType === 'next') {
                queryRef = query(storeCollectionRef, orderBy('registrationDate'), startAfter(firstVisible), limit(1));
            };

            if (listGetType === 'prev') {
                queryRef = query(storeCollectionRef, orderBy('registrationDate'), endBefore(lastVisible), limitToLast(1));
            };

            pagingProcess(queryRef)
                .then(() => {
                    dispatch({ type: 'STORE_COMPLETE' });
                })
                .catch((error) => {
                    dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                });
        };

        process(listGetType);
    };
};










export { Test1, AddProduct, GetProductList };





        // const process = async () => {
        //     // 첫번째 post 컬렉션의 스냅샷을 작성날짜 기준 내림차순 (orderBy 2번째 인자 생략시 기본 내림차순)으로 정렬해 10개의 문서만 받아오기
        //     const first = query(storeCollectionRef, orderBy('registrationDate'), limit(1));
        //     const documentSnapshots = await getDocs(first);

        //     // 마지막 문서 스냅샷 기억해해두기 (쿼리결과 스냅샷 크기 - 1 = 마지막 문서 위치)
        //     const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        //     // 앞서 기억해둔 문서값으로 새로운 쿼리 요청 
        //     const next = query(storeCollectionRef,
        //         orderBy('registrationDate'),
        //         startAfter(lastVisible),
        //         limit(1));
        //     const documentSnapshots2 = await getDocs(next);

        //     documentSnapshots.forEach((doc) => {
        //         result.push(doc.data());
        //     });

        //     documentSnapshots2.forEach((doc) => {
        //         result2.push(doc.data());
        //     });

        //     console.log(result);
        //     console.log(result2);
        // };