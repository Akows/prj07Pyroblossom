import { deleteDoc, doc, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, orderBy, query, setDoc, startAfter, updateDoc, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { timeStamp, storeCollectionRef, storageRef, purchaseRecordCollectionRef, userCollectionRef } from '../../configs/firebase/config'
import { productOptionInfoProcess } from '../../functions/storeFunction';

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

        const processOptionData = productOptionInfoProcess(productInfo, productOptionInfo);

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
                    mainCategory: productInfo.mainCategory,
                    subCategory: productInfo.subCategory,
                    productOption: {
                        option1: processOptionData.option1,
                        option2: processOptionData.option2,
                        option3: processOptionData.option3,
                        option4: processOptionData.option4,
                        option5: processOptionData.option5,
                    },
                    productOptionSurchargeType: {
                        option1: processOptionData.option1SurchargeType,
                        option2: processOptionData.option2SurchargeType,
                        option3: processOptionData.option3SurchargeType,
                        option4: processOptionData.option4SurchargeType,
                        option5: processOptionData.option5SurchargeType,
                    },
                    productOptionSurchargePrice: {
                        option1: processOptionData.option1SurchargePrice,
                        option2: processOptionData.option2SurchargePrice,
                        option3: processOptionData.option3SurchargePrice,
                        option4: processOptionData.option4SurchargePrice,
                        option5: processOptionData.option5SurchargePrice,
                    },
                    productOptionPurchaseQuantityLimit: {
                        option1: processOptionData.option1PurchaseQuantityLimit,
                        option2: processOptionData.option2PurchaseQuantityLimit,
                        option3: processOptionData.option3PurchaseQuantityLimit,
                        option4: processOptionData.option4PurchaseQuantityLimit,
                        option5: processOptionData.option5PurchaseQuantityLimit,
                    },
                    productOptionInventory: {
                        option1: processOptionData.option1Inventory,
                        option2: processOptionData.option2Inventory,
                        option3: processOptionData.option3Inventory,
                        option4: processOptionData.option4Inventory,
                        option5: processOptionData.option5Inventory,
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
                    productDisclosure: false,
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
                dispatch({ type: 'STORE_RENDERING_ON' });
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

const GetProductList = (listCallType, itemPerPage, searchKeyword) => {
    return (dispatch, getState) => {
        
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const returnData = {
            processData1: {
                firstOfPage: {},
                lastOfPage: {},
                firstOfAllList: {},
                lastOfAllList: {},
            },
            processData2: [],
        };

        const calculateBothEndsIndex = async () => {
            // 우선 제품 목록의 첫 번째와 마지막 제품이 무엇인지 특정해야한다.
            // 조건검색을 했을 경우에는 쿼리 조건이 다르게 적용되어야 한다.
            let firstQueryRef = '';
            let LastQueryRef = '';

            if (listCallType === 'keywordsearch') {
                firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', searchKeyword), limit(1));
                LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', searchKeyword), limitToLast(1));
            }
            else {
                firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limit(1));
                LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limitToLast(1));
            };
            
            const firstDocumentSnapshots = await getDocs(firstQueryRef);
            const lastDocumentSnapshots = await getDocs(LastQueryRef);

            // 페이지 커서의 한계점을 출력하기 위해 전체 제품 리스트의 첫 번째와 마지막 요소의 정보를 저장해준다.
            returnData.processData1.firstOfAllList = firstDocumentSnapshots.docs[0];
            returnData.processData1.lastOfAllList = lastDocumentSnapshots.docs[0];
        };

        const calculateProductPerPage = async () => {
            // 다음으로는 전체 제품 리스트 중 페이지 당 출력할 제품의 갯수만큼 데이터를 불러온다. (지금은 페이지당 2개)
            
            // 제품 목록을 조회하는 방식에 따라 쿼리를 다르게 적용한다.
            let queryRef = '';
            // 최초 랜더링일 때, itemPerPage만큼 데이터를 조회해온다.
            // 만약 검색어를 입력하지 않았는데 검색 버튼을 클릭할 경우에도 마찬가지로 처리한다.
            if (listCallType === 'firstRender' || searchKeyword === '') {
                queryRef = query(storeCollectionRef, orderBy('number'), limit(itemPerPage));
            }
            // 검색일 때, where 함수를 사용하여 조건검색으로 데이터를 조회해온다.
            else if (listCallType === 'keywordsearch') {
                queryRef = query(storeCollectionRef, orderBy('number'), where('name', '==', searchKeyword), limit(itemPerPage));
            };

            // 일반 유저화면에서의 제품 로딩의 경우, 비공개된 제품이 출력되서는 안된다.
            if (listCallType === 'commonusergetproduct') {
                queryRef = query(storeCollectionRef, orderBy('number'), where('productDisclosure', '==', true), limit(itemPerPage));
            };



            
            // 다른 페이지로 이동할 경우, 페이지 이동을 위한 데이터 Index를 바탕으로 데이터를 조회해온다.
            // 페이지가 렌더링 되었을 때 무조건 1차례 데이터를 받아오고 이 과정에서 페이지 이동에 필요한 데이터가 Redux에 저장되어있다.
            // 따라서 당 정보를 가져와서 사용한다.
            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                queryRef = query(storeCollectionRef, orderBy('number'), startAfter(lastOfPage), limit(itemPerPage));
            }
            else if (listCallType === 'prev') {
                queryRef = query(storeCollectionRef, orderBy('number'), endBefore(firstOfPage), limitToLast(itemPerPage));
            };
            
            // 그리고 쿼리를 기준으로 Doc을 가져온다.
            const allDocumentSnapshots = await getDocs(queryRef);

            // 또한 페이지 이동을 위해 호출해온 데이터의 가장 첫 요소와 마지막 요소의 정보를 저장해준다. ()
            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

            // 제품 데이터를 배열에 담아 저장해준다.
            const result = [];
            allDocumentSnapshots.forEach((doc) => {
                result.push(doc.data());
            });
            returnData.processData2 = result;
        };

        calculateBothEndsIndex()
        .then(() => {
            calculateProductPerPage()
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
                dispatch({ type: 'STORE_GET_PRODUCTLIST', payload: returnData});
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
        });

    };
};

const GetProductInfo = (productName) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const returnData = {
            processData1: {
                firstOfPage: {},
                lastOfPage: {},
                firstOfAllList: {},
                lastOfAllList: {},
            },
            processData2: [],
        };

        const process = async () => {
            const docRef = doc(storeCollectionRef, productName);
            const docSnap = await getDoc(docRef);
            
            returnData.processData2.push(docSnap.data());
            
        };

        process()
        .then(() => {
            dispatch({ type: 'STORE_COMPLETE' });
            dispatch({ type: 'STORE_GET_PRODUCTLIST', payload: returnData});
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
        });

    };
};



const UpdateProduct = (updateNeedData, productInfo, productOptionInfo, productImgFile, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        console.log(updateNeedData, productInfo, productOptionInfo, productImgFile);

        let infoFiles = ['', '', ''];
        let infoFileNames = ['', '', ''];

        for (let i = 0; i < 3; i++) {
            // productImgFile의 가장 첫 번째 자리는 제품 타이틀 이미지가 들어가있으므로 정보이미지 파일 처리를 위해서는 i의 값에 1을 더해주어야 한다.
            if (productImgFile[`infoImage${i + 1}`]) {
                infoFiles[i] = productImgFile[`infoImage${i + 1}`][0];
                infoFileNames[i] = productImgFile[`infoImage${i + 1}`][0].name;
            };
        };

        const processOptionData = productOptionInfoProcess(productInfo, productOptionInfo);

        const process = async () => {
            const docRef = doc(storeCollectionRef, `${productInfo.name}`);
            
            await setDoc(docRef,
                {
                    number: updateNeedData.number,
                    name: productInfo.name,
                    price: productInfo.price,
                    deliveryFee: productInfo.deliveryFee,
                    purchaseQuantityLimit: productInfo.purchaseQuantityLimit,
                    inventory: productInfo.inventory,
                    mainCategory: productInfo.mainCategory,
                    subCategory: productInfo.subCategory,
                    productOption: {
                        option1: processOptionData.option1,
                        option2: processOptionData.option2,
                        option3: processOptionData.option3,
                        option4: processOptionData.option4,
                        option5: processOptionData.option5,
                    },
                    productOptionSurchargeType: {
                        option1: processOptionData.option1SurchargeType,
                        option2: processOptionData.option2SurchargeType,
                        option3: processOptionData.option3SurchargeType,
                        option4: processOptionData.option4SurchargeType,
                        option5: processOptionData.option5SurchargeType,
                    },
                    productOptionSurchargePrice: {
                        option1: processOptionData.option1SurchargePrice,
                        option2: processOptionData.option2SurchargePrice,
                        option3: processOptionData.option3SurchargePrice,
                        option4: processOptionData.option4SurchargePrice,
                        option5: processOptionData.option5SurchargePrice,
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
                    productDisclosure: false,
                    registrationDate: productInfo.registrationDate,
                }
            );
            await deleteDoc(doc(storeCollectionRef, updateNeedData.formerName));

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
                dispatch({ type: 'STORE_RENDERING_ON' });
                alert('제품 수정이 완료되었습니다.');
                navigate('/store/mypage', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                alert('제품 수정 과정에서 에러가 발생하였습니다.');
                navigate('/store/mypage', { replace: true });
            });
    };
};

const ChangeProductDisclosure = (productName, productDisclosure, navigate) => {
    return (dispatch, getState) => {

        console.log(productName, productDisclosure);

        let result = '';

        const process = async () => {
            const docRef = doc(storeCollectionRef, productName);
            
            await updateDoc(docRef,
                {
                    productDisclosure: !productDisclosure,
                }
            );
        };

        if (!productDisclosure) {
            result = '공개';
        }
        else {
            result = '비공개';
        };

        process()
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
                dispatch({ type: 'STORE_RENDERING_ON' });
                alert(`제품이 ${result}처리되었습니다.`);
                navigate('/store/mypage', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                alert('제품 상태 변경 과정에서 에러가 발생하였습니다.');
                navigate('/store/mypage', { replace: true });
            });
    };
};

const GoToPurchasePage = (purchaseList, totalQuantity, totalAmount, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const data = {
            purchaseList: purchaseList,
            totalQuantity: totalQuantity,
            totalAmount: totalAmount,
        };

        dispatch({ type: 'STORE_SAVE_PURCHASEDATA', payload: data });
        dispatch({ type: 'STORE_COMPLETE' });
        
        navigate('/store/payment', { replace: true });
    };
};

const PurchaseProduct = (purchaseData, productData, userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        // 구매 기록을 저장.
        const addRecord = async () => {
            const querys = query(purchaseRecordCollectionRef);
            const allPurchaseRecordCount = await getCountFromServer(querys);

            const docRef = doc(purchaseRecordCollectionRef, `${allPurchaseRecordCount.data().count + 1}`);

            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    userName: userData.email,
                    address: userData.address,
                    address2: userData.address2,
                    date: createdTime,
                    purchaseData: purchaseData.purchaseList,
                }
            );
        };

        // 유저 데이터의 포인트 값을 수정.
        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);
            const docSnap = await getDoc(docRef);

            const beforePoint = parseInt(docSnap.data().point);

            if (beforePoint < purchaseData.totalAmount) {
                throw errorCode.storeError.InsufficientPoint;
            };

            await setDoc(docRef, {
                point: beforePoint - parseInt(purchaseData.totalAmount),
            }, { merge: true });
        };

        updataUserInfo()
        .then(() => {
            addRecord()
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                // navigate('/store/mypage', { replace: true });
            });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            // navigate('/store/mypage', { replace: true });
        });

    };
};

const ChargePoint = (userEmail, chargePoint, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userEmail);
            const docSnap = await getDoc(docRef);

            const beforePoint = parseInt(docSnap.data().point);

            await setDoc(docRef, {
                point: beforePoint + parseInt(chargePoint),
            }, { merge: true });
        };

        updataUserInfo()
        .then(() => {
            dispatch({ type: 'STORE_COMPLETE' });
            dispatch({ type: 'STORE_RENDERING_ON' });
            alert(`${chargePoint}원이 충전되었습니다.`);
            navigate('/store/mypage', { replace: true });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: createErrorData(error) });
        });
    };
};





const GetpurchaseRecord = (listCallType, itemPerPage, searchKeyword) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const returnData = {
            processData1: {
                firstOfPage: {},
                lastOfPage: {},
                firstOfAllList: {},
                lastOfAllList: {},
            },
            processData2: [],
        };

        const calculateBothEndsIndex = async () => {
            let firstQueryRef = '';
            let LastQueryRef = '';

            if (listCallType === 'keywordsearch') {
                firstQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('name', '==', searchKeyword), limit(1));
                LastQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('name', '==', searchKeyword), limitToLast(1));
            }
            else {
                firstQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), limit(1));
                LastQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), limitToLast(1));
            };
            
            const firstDocumentSnapshots = await getDocs(firstQueryRef);
            const lastDocumentSnapshots = await getDocs(LastQueryRef);

            // 페이지 커서의 한계점을 출력하기 위해 전체 제품 리스트의 첫 번째와 마지막 요소의 정보를 저장해준다.
            returnData.processData1.firstOfAllList = firstDocumentSnapshots.docs[0];
            returnData.processData1.lastOfAllList = lastDocumentSnapshots.docs[0];
        };

        const calculateProductPerPage = async () => {
            // 다음으로는 전체 제품 리스트 중 페이지 당 출력할 제품의 갯수만큼 데이터를 불러온다. (지금은 페이지당 2개)
            
            // 제품 목록을 조회하는 방식에 따라 쿼리를 다르게 적용한다.
            let queryRef = '';
            // 최초 랜더링일 때, itemPerPage만큼 데이터를 조회해온다.
            // 만약 검색어를 입력하지 않았는데 검색 버튼을 클릭할 경우에도 마찬가지로 처리한다.
            if (listCallType === 'firstRender' || searchKeyword === '') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), limit(itemPerPage));
            }
            // 검색일 때, where 함수를 사용하여 조건검색으로 데이터를 조회해온다.
            else if (listCallType === 'keywordsearch') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('name', '==', searchKeyword), limit(itemPerPage));
            };

            // 일반 유저화면에서의 제품 로딩의 경우, 비공개된 제품이 출력되서는 안된다.
            if (listCallType === 'commonusergetproduct') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('productDisclosure', '==', true), limit(itemPerPage));
            };

            // 다른 페이지로 이동할 경우, 페이지 이동을 위한 데이터 Index를 바탕으로 데이터를 조회해온다.
            // 페이지가 렌더링 되었을 때 무조건 1차례 데이터를 받아오고 이 과정에서 페이지 이동에 필요한 데이터가 Redux에 저장되어있다.
            // 따라서 당 정보를 가져와서 사용한다.
            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), startAfter(lastOfPage), limit(itemPerPage));
            }
            else if (listCallType === 'prev') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), endBefore(firstOfPage), limitToLast(itemPerPage));
            };
            
            // 그리고 쿼리를 기준으로 Doc을 가져온다.
            const allDocumentSnapshots = await getDocs(queryRef);

            // 또한 페이지 이동을 위해 호출해온 데이터의 가장 첫 요소와 마지막 요소의 정보를 저장해준다. ()
            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

            // 제품 데이터를 배열에 담아 저장해준다.
            const result = [];
            allDocumentSnapshots.forEach((doc) => {
                result.push(doc.data());
            });
            returnData.processData2 = result;
        };

        calculateBothEndsIndex()
        .then(() => {
            calculateProductPerPage()
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
                dispatch({ type: 'STORE_GET_PRODUCTLIST', payload: returnData});
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
        });

    };
};






export { Test1, AddProduct, GetProductList, GetProductInfo, UpdateProduct, ChangeProductDisclosure, GoToPurchasePage, PurchaseProduct, ChargePoint, GetpurchaseRecord };





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