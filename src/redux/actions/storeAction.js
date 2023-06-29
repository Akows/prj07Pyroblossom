import { deleteDoc, doc, endBefore, getCountFromServer, getDoc, getDocs, limit, limitToLast, orderBy, query, setDoc, startAfter, updateDoc, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { createErrorData, errorCode } from '../../configs/errorCodes';
import { timeStamp, storeCollectionRef, storageRef, purchaseRecordCollectionRef, userCollectionRef, pointRecordCollectionRef, shoppingBasketCollectionRef, reviewCollectionRef } from '../../configs/firebase/config'
import { dateFormat, productOptionInfoProcess } from '../../functions/storeFunction';

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
                    price: parseInt(productInfo.price),
                    deliveryFee: parseInt(productInfo.deliveryFee),
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
                        option1: parseInt(processOptionData.option1SurchargePrice),
                        option2: parseInt(processOptionData.option2SurchargePrice),
                        option3: parseInt(processOptionData.option3SurchargePrice),
                        option4: parseInt(processOptionData.option4SurchargePrice),
                        option5: parseInt(processOptionData.option5SurchargePrice),
                    },
                    productOptionPurchaseQuantityLimit: {
                        option1: parseInt(processOptionData.option1PurchaseQuantityLimit),
                        option2: parseInt(processOptionData.option2PurchaseQuantityLimit),
                        option3: parseInt(processOptionData.option3PurchaseQuantityLimit),
                        option4: parseInt(processOptionData.option4PurchaseQuantityLimit),
                        option5: parseInt(processOptionData.option5PurchaseQuantityLimit),
                    },
                    productOptionInventory: {
                        option1: parseInt(processOptionData.option1Inventory),
                        option2: parseInt(processOptionData.option2Inventory),
                        option3: parseInt(processOptionData.option3Inventory),
                        option4: parseInt(processOptionData.option4Inventory),
                        option5: parseInt(processOptionData.option5Inventory),
                    },
                    productOptionSalesRate: {
                        option1: parseInt(processOptionData.option1SalesRate),
                        option2: parseInt(processOptionData.option2SalesRate),
                        option3: parseInt(processOptionData.option3SalesRate),
                        option4: parseInt(processOptionData.option4SalesRate),
                        option5: parseInt(processOptionData.option5SalesRate),
                    },
                    productSalesRate : 0,
                    productReviews : 0,
                    discountRate: parseInt(productInfo.discountRate),
                    // rewardAmountRate: productInfo.rewardAmountRate,
                    eventType: productInfo.eventType,
                    eventPoint: parseInt(productInfo.eventPoint),
                    productInformationFile: {
                        titleimage: productImgFile.titleImage[0].name,
                        infoimage1: infoFileNames[0],
                        infoimage2: infoFileNames[1],
                        infoimage3: infoFileNames[2],
                    },
                    productDisclosure: false,
                    registrationDate: createdTime,
                    productScore: 0,
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

            if (listCallType === 'keywordSearch') {
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

            // 일반 유저화면에서의 제품 로딩의 경우, 비공개된 제품이 출력되서는 안된다.
            if (listCallType === 'commonusergetproduct') {
                queryRef = query(storeCollectionRef, orderBy('number'), where('productDisclosure', '==', true), limit(itemPerPage));
            }
            // 만약 검색어를 입력하지 않았는데 검색 버튼을 클릭할 경우에도 마찬가지로 처리한다.
            else if (listCallType === 'firstRender' || searchKeyword === '') {
                queryRef = query(storeCollectionRef, orderBy('number'), limit(itemPerPage));
            }
            // 검색일 때, where 함수를 사용하여 조건검색으로 데이터를 조회해온다.
            else if (listCallType === 'keywordSearch') {
                queryRef = query(storeCollectionRef, orderBy('number'), where('name', '==', searchKeyword), limit(itemPerPage));
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
                console.log(doc.data());
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

const GetSearchProductList = (listCallType, itemPerPage, keyword, sortCondition) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        console.log(listCallType, itemPerPage, keyword, sortCondition);

        const returnData = {
            processData1: {
                firstOfPage: {},
                lastOfPage: {},
                firstOfAllList: {},
                lastOfAllList: {},
            },
            processData2: [],
        };

        let sortConditionEng = '';

        if (sortCondition === '인기도순') {
            sortConditionEng = 'productSalesRate';
        };
        if (sortCondition === '높은 가격순' || sortCondition === '낮은 가격순') {
            sortConditionEng = 'price';
        };
        if (sortCondition === '리뷰 많은순') {
            sortConditionEng = 'productReviews';
        };
        if (sortCondition === '등록일 순') {
            sortConditionEng = 'registrationDate';
        };

        const calculateBothEndsIndex = async () => {
            let firstQueryRef = '';
            let LastQueryRef = '';

            if (listCallType === 'keywordSearch') {
                firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', keyword), where('productDisclosure', '==', true), limit(1));
                LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', keyword), where('productDisclosure', '==', true), limitToLast(1));
            }
            else if (listCallType === 'categorySearch') {

                if (keyword === '전체상품') {
                    firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('productDisclosure', '==', true), limit(1));
                    LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('productDisclosure', '==', true), limitToLast(1));
                }
                else {
                    firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('mainCategory', '==', keyword), where('productDisclosure', '==', true), limit(1));
                    LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('mainCategory', '==', keyword), where('productDisclosure', '==', true), limitToLast(1));
                };

            };
            
            const firstDocumentSnapshots = await getDocs(firstQueryRef);
            const lastDocumentSnapshots = await getDocs(LastQueryRef);

            returnData.processData1.firstOfAllList = firstDocumentSnapshots.docs[0];
            returnData.processData1.lastOfAllList = lastDocumentSnapshots.docs[0];
        };

        const calculateProductPerPage = async () => {

            let queryRef = '';


            if (listCallType === 'keywordSearch') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('name', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('name', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                };
            }
            else if (listCallType === 'categorySearch') {
                if (keyword === '전체상품') {
                    if (sortCondition === '높은 가격순') {
                        queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('productDisclosure', '==', true), limit(itemPerPage));
                    }
                    else {
                        queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('productDisclosure', '==', true), limit(itemPerPage));
                    };
                }
                else {
                    if (sortCondition === '높은 가격순') {
                        queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('mainCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                    }
                    else {
                        queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('mainCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                    };
                };
            };

            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('name', '==', keyword), where('productDisclosure', '==', true), startAfter(lastOfPage), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('name', '==', keyword), where('productDisclosure', '==', true), startAfter(lastOfPage), limit(itemPerPage));
                };
            }
            else if (listCallType === 'prev') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('name', '==', keyword), where('productDisclosure', '==', true), endBefore(firstOfPage), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('name', '==', keyword), where('productDisclosure', '==', true), endBefore(firstOfPage), limit(itemPerPage));
                };
            };

            const allDocumentSnapshots = await getDocs(queryRef);

            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

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

const GetSearchSubCategoryProductList = (listCallType, itemPerPage, keyword, sortCondition) => {
    return (dispatch, getState) => {

        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        console.log(listCallType, itemPerPage, keyword, sortCondition);

        const returnData = {
            processData1: {
                firstOfPage: {},
                lastOfPage: {},
                firstOfAllList: {},
                lastOfAllList: {},
            },
            processData2: [],
        };

        let sortConditionEng = '';

        if (sortCondition === '인기도순') {
            sortConditionEng = 'productSalesRate';
        };
        if (sortCondition === '높은 가격순' || sortCondition === '낮은 가격순') {
            sortConditionEng = 'price';
        };
        if (sortCondition === '리뷰 많은순') {
            sortConditionEng = 'productReviews';
        };
        if (sortCondition === '등록일 순') {
            sortConditionEng = 'registrationDate';
        };

        const calculateBothEndsIndex = async () => {
            let firstQueryRef = '';
            let LastQueryRef = '';

            if (keyword === '전체상품') {
                firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(1));
                LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limitToLast(1));
            }
            else {
                firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(1));
                LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limitToLast(1));
            };

            const firstDocumentSnapshots = await getDocs(firstQueryRef);
            const lastDocumentSnapshots = await getDocs(LastQueryRef);

            returnData.processData1.firstOfAllList = firstDocumentSnapshots.docs[0];
            returnData.processData1.lastOfAllList = lastDocumentSnapshots.docs[0];
        };

        const calculateProductPerPage = async () => {

            let queryRef = '';

            if (keyword === '전체상품') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                };
            }
            else {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), limit(itemPerPage));
                };
            };

            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), startAfter(lastOfPage), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), startAfter(lastOfPage), limit(itemPerPage));
                };
            }
            else if (listCallType === 'prev') {
                if (sortCondition === '높은 가격순') {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'desc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), endBefore(firstOfPage), limit(itemPerPage));
                }
                else {
                    queryRef = query(storeCollectionRef, orderBy(sortConditionEng, 'asc'), where('subCategory', '==', keyword), where('productDisclosure', '==', true), endBefore(firstOfPage), limit(itemPerPage));
                };
            };

            const allDocumentSnapshots = await getDocs(queryRef);

            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

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
                    price: parseInt(productInfo.price),
                    deliveryFee: parseInt(productInfo.deliveryFee),
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
                        option1: parseInt(processOptionData.option1SurchargePrice),
                        option2: parseInt(processOptionData.option2SurchargePrice),
                        option3: parseInt(processOptionData.option3SurchargePrice),
                        option4: parseInt(processOptionData.option4SurchargePrice),
                        option5: parseInt(processOptionData.option5SurchargePrice),
                    },
                    productOptionPurchaseQuantityLimit: {
                        option1: parseInt(processOptionData.option1PurchaseQuantityLimit),
                        option2: parseInt(processOptionData.option2PurchaseQuantityLimit),
                        option3: parseInt(processOptionData.option3PurchaseQuantityLimit),
                        option4: parseInt(processOptionData.option4PurchaseQuantityLimit),
                        option5: parseInt(processOptionData.option5PurchaseQuantityLimit),
                    },
                    productOptionInventory: {
                        option1: parseInt(processOptionData.option1Inventory),
                        option2: parseInt(processOptionData.option2Inventory),
                        option3: parseInt(processOptionData.option3Inventory),
                        option4: parseInt(processOptionData.option4Inventory),
                        option5: parseInt(processOptionData.option5Inventory),
                    },
                    discountRate: parseInt(productInfo.discountRate),
                    // rewardAmountRate: productInfo.rewardAmountRate,
                    eventType: productInfo.eventType,
                    eventPoint: parseInt(productInfo.eventPoint),
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

const GoToPurchasePage = (purchaseList, totalQuantity, totalAmount, navigate, isBasket) => {
    return (dispatch, getState) => {

        console.log(purchaseList);

        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const data = {
            purchaseList: [],
            totalQuantity: 0,
            totalAmount: 0,
        };

        let data2 = '';

        if (isBasket) {
            let totalQuantity = 0;
            let totalAmount = 0;   

            // eslint-disable-next-line
            purchaseList.map((item) => {
                data.purchaseList.push(item.purchaseList[0]);
                data2 = item.productData;
                totalQuantity += item.totalQuantity;
                totalAmount += item.totalAmount;
            });

            data.totalQuantity = totalQuantity;
            data.totalAmount = totalAmount;

            dispatch({ type: 'STORE_SAVE_PRODUCTDATA', payload: data2 });
            dispatch({ type: 'STORE_SAVE_PURCHASEDATA', payload: data });
            dispatch({ type: 'STORE_COMPLETE' });
            navigate('/store/payment', { replace: true });
        }
        else {
            data.purchaseList = purchaseList;
            data.totalQuantity = totalQuantity;
            data.totalAmount = totalAmount;

            dispatch({ type: 'STORE_SAVE_PURCHASEDATA', payload: data });
            dispatch({ type: 'STORE_COMPLETE' });
            navigate('/store/payment', { replace: true });
        };
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
                    purchaseNumber: allPurchaseRecordCount.data().count + 1,
                    userName: userData.email,
                    address: userData.address,
                    address2: userData.address2,
                    date: createdTime,
                    purchaseData: purchaseData,
                    productData: productData,
                    isDelete: false,
                }
            );
        };

        let beforePoint = 0;

        // 유저 데이터의 포인트 값을 수정.
        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);
            const docSnap = await getDoc(docRef);

            beforePoint = parseInt(docSnap.data().point);

            if (beforePoint < purchaseData.totalAmount) {
                throw errorCode.storeError.InsufficientPoint;
            };

            await setDoc(docRef, {
                point: beforePoint - parseInt(purchaseData.totalAmount),
            }, { merge: true });
        };

        // 제품의 재고량과 판매량을 수정.
        const updataProductInfo = async () => {
            const docRef = doc(storeCollectionRef, productData[0].name);
            const docSnap = await getDoc(docRef);

            let option1Sales = 0;
            let option2Sales = 0;
            let option3Sales = 0;
            let option4Sales = 0;
            let option5Sales = 0;

            // eslint-disable-next-line
            purchaseData.purchaseList.map((item) => {
                if (item.optionNumber === 'option1') {
                    option1Sales = item.purchaseQuantity;
                };

                if (item.optionNumber === 'option2') {
                    option2Sales = item.purchaseQuantity;
                };

                if (item.optionNumber === 'option3') {
                    option3Sales = item.purchaseQuantity;
                };

                if (item.optionNumber === 'option4') {
                    option4Sales = item.purchaseQuantity;
                };

                if (item.optionNumber === 'option5') {
                    option5Sales = item.purchaseQuantity;
                };
            });

            await setDoc(docRef, {
                productOptionInventory: {
                    option1: parseInt(docSnap.data().productOptionInventory.option1 - option1Sales),
                    option2: parseInt(docSnap.data().productOptionInventory.option2 - option2Sales),
                    option3: parseInt(docSnap.data().productOptionInventory.option3 - option3Sales),
                    option4: parseInt(docSnap.data().productOptionInventory.option4 - option4Sales),
                    option5: parseInt(docSnap.data().productOptionInventory.option5 - option5Sales),
                },
                productOptionSalesRate: {
                    option1: parseInt(docSnap.data().productOptionSalesRate.option1 + option1Sales),
                    option2: parseInt(docSnap.data().productOptionSalesRate.option2 + option2Sales),
                    option3: parseInt(docSnap.data().productOptionSalesRate.option3 + option3Sales),
                    option4: parseInt(docSnap.data().productOptionSalesRate.option4 + option4Sales),
                    option5: parseInt(docSnap.data().productOptionSalesRate.option5 + option5Sales),
                },
            }, { merge: true });

            await setDoc(docRef, {
                productSalesRate : parseInt(docSnap.data().productSalesRate) + parseInt(purchaseData.totalQuantity),
            }, { merge: true });
        };

        const recordPointData = async () => {
            const querys = query(pointRecordCollectionRef);
            const count = await getCountFromServer(querys);

            const docRef = doc(pointRecordCollectionRef, `${count.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    recordNumber: count.data().count + 1,
                    userEmail: userData.email,
                    recordType: '-',
                    pointChangeNumber: parseInt(purchaseData.totalAmount),
                    recordDesc: '포인트 사용(굿즈 스토어 물건 구매).',
                    recordDate: createdTime,
                    leftoverPoint: beforePoint - parseInt(purchaseData.totalAmount),
                }
            );
        };

        updataUserInfo()
        .then(() => {
            addRecord()
            .then(() => {
                recordPointData()
                .then(() => {
                    updataProductInfo()
                    .then(() => {
                        dispatch({ type: 'STORE_COMPLETE' });
                    })
                    .catch((error) => {
                        dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                    });
                })
                .catch((error) => {
                    dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                // navigate('/store/mypage', { replace: true });
            });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            dispatch({ type: 'STORE_NOTENOUGH_POINT' });
            // navigate('/store/mypage', { replace: true });
        });

    };
};

const ChargePoint = (userEmail, chargePoint, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        let beforePoint = 0;

        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userEmail);
            const docSnap = await getDoc(docRef);

            beforePoint = parseInt(docSnap.data().point);

            await setDoc(docRef, {
                point: beforePoint + parseInt(chargePoint),
            }, { merge: true });
        };

        const recordPointData = async () => {
            const querys = query(pointRecordCollectionRef);
            const count = await getCountFromServer(querys);

            const docRef = doc(pointRecordCollectionRef, `${count.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    recordNumber: count.data().count + 1,
                    userEmail: userEmail,
                    recordType: '+',
                    pointChangeNumber: parseInt(chargePoint),
                    recordDesc: '포인트 충전.',
                    recordDate: createdTime,
                    leftoverPoint: beforePoint + parseInt(chargePoint),
                }
            );
        };

        updataUserInfo()
        .then(() => {
            recordPointData()
            .then(() => {
                alert(`${chargePoint}원이 충전되었습니다.`);
                dispatch({ type: 'STORE_COMPLETE' });
                dispatch({ type: 'STORE_RENDERING_ON' });
                navigate('/store/mypage', { replace: true });
            })
            .catch((error) => {
                dispatch({ type: 'ERROR', payload: createErrorData(error) });
            })
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: createErrorData(error) });
        });
    };
};

const GetpurchaseRecord = (listCallType, itemPerPage, searchKeyword, userEmail) => {
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
                firstQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('name', '==', searchKeyword), where('userName', '==', userEmail), where('isDelete', '==', false), limit(1));
                LastQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('name', '==', searchKeyword), where('userName', '==', userEmail), where('isDelete', '==', false), limitToLast(1));
            }
            else {
                firstQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('userName', '==', userEmail), where('isDelete', '==', false), limit(1));
                LastQueryRef = query(purchaseRecordCollectionRef, orderBy('date', 'asc'), where('userName', '==', userEmail), where('isDelete', '==', false), limitToLast(1));
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
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('userName', '==', userEmail), where('isDelete', '==', false), limit(itemPerPage));
            }
            // 검색일 때, where 함수를 사용하여 조건검색으로 데이터를 조회해온다.
            else if (listCallType === 'keywordsearch') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('name', '==', searchKeyword), where('userName', '==', userEmail), where('isDelete', '==', false), limit(itemPerPage));
            };

            // 일반 유저화면에서의 제품 로딩의 경우, 비공개된 제품이 출력되서는 안된다.
            if (listCallType === 'commonusergetproduct') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('productDisclosure', '==', true), where('userName', '==', userEmail), where('isDelete', '==', false), limit(itemPerPage));
            };

            // 다른 페이지로 이동할 경우, 페이지 이동을 위한 데이터 Index를 바탕으로 데이터를 조회해온다.
            // 페이지가 렌더링 되었을 때 무조건 1차례 데이터를 받아오고 이 과정에서 페이지 이동에 필요한 데이터가 Redux에 저장되어있다.
            // 따라서 당 정보를 가져와서 사용한다.
            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('userName', '==', userEmail), where('isDelete', '==', false), startAfter(lastOfPage), limit(itemPerPage));
            }
            else if (listCallType === 'prev') {
                queryRef = query(purchaseRecordCollectionRef, orderBy('date'), where('userName', '==', userEmail), where('isDelete', '==', false), endBefore(firstOfPage), limitToLast(itemPerPage));
            };
            
            // 그리고 쿼리를 기준으로 Doc을 가져온다.
            const allDocumentSnapshots = await getDocs(queryRef);

            // 또한 페이지 이동을 위해 호출해온 데이터의 가장 첫 요소와 마지막 요소의 정보를 저장해준다. ()
            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

            // 제품 데이터를 배열에 담아 저장해준다.
            const result = [];
            let data = {};
            allDocumentSnapshots.forEach((doc) => {
                data = Object.assign(doc.data());
                data.date = dateFormat(doc.data().date.toDate());
                result.push(data);
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

const DeletePurchaseRecord = (recordNumber) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const updateInfo = async () => {
            const docRef = doc(purchaseRecordCollectionRef, `${recordNumber}`);

            const docSnap = await getDoc(docRef);

            const isDelete = docSnap.data().isDelete;

            await setDoc(docRef, {
                isDelete: !isDelete,
            }, { merge: true });
        };

        updateInfo()
        .then(() => {
            alert('결제내역이 삭제되었습니다.');
            dispatch({ type: 'STORE_COMPLETE' });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: createErrorData(error) });
        });
    };
};

const GetPointRecord = (listCallType, itemPerPage, userEmail) => {
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
            const firstQueryRef = query(pointRecordCollectionRef, orderBy('recordDate', 'desc'), where('userEmail', '==', userEmail), limit(1));
            const LastQueryRef = query(pointRecordCollectionRef, orderBy('recordDate', 'desc'), where('userEmail', '==', userEmail), limitToLast(1));
            
            const firstDocumentSnapshots = await getDocs(firstQueryRef);
            const lastDocumentSnapshots = await getDocs(LastQueryRef);

            returnData.processData1.firstOfAllList = firstDocumentSnapshots.docs[0];
            returnData.processData1.lastOfAllList = lastDocumentSnapshots.docs[0];
        };

        const calculateProductPerPage = async () => {

            let queryRef = '';

            if (listCallType === 'firstRender') {
                queryRef = query(pointRecordCollectionRef, orderBy('recordDate', 'desc'), where('userEmail', '==', userEmail), limit(itemPerPage));
            };

            const { firstOfPage, lastOfPage } = getState().store.processInfo.processData1;
            if (listCallType === 'next') {
                queryRef = query(pointRecordCollectionRef, orderBy('recordDate', 'desc'), where('userEmail', '==', userEmail), startAfter(lastOfPage), limit(itemPerPage));
            }
            else if (listCallType === 'prev') {
                queryRef = query(pointRecordCollectionRef, orderBy('recordDate', 'desc'), where('userEmail', '==', userEmail), endBefore(firstOfPage), limitToLast(itemPerPage));
            };
            
            const allDocumentSnapshots = await getDocs(queryRef);
            returnData.processData1.firstOfPage = allDocumentSnapshots.docs[0];
            returnData.processData1.lastOfPage = allDocumentSnapshots.docs[allDocumentSnapshots.docs.length - 1];

            const result = [];
            let data = {};
            allDocumentSnapshots.forEach((doc) => {
                data = Object.assign(doc.data());
                data.recordDate = dateFormat(doc.data().recordDate.toDate());
                result.push(data);
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

const AddShoppingBasket = (userData, productData, purchaseList, totalQuantity, totalAmount, navigate) => {
    return (dispatch, getState) => {

        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const addressInfo = {
            address: '',
            address2: '',
        };

        // 우선 유저의 주소값을 가져와서 준비된 객체에 저장해준다.
        const getUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);
            const docSnap = await getDoc(docRef);

            addressInfo.address = docSnap.data().address;
            addressInfo.address2 = docSnap.data().address2;
        };

        // 다음으로는 장바구니 DB에 데이터를 저장해준다.
        const addBasket = async () => {
            const querys = query(shoppingBasketCollectionRef);
            const allPurchaseRecordCount = await getCountFromServer(querys);

            const docRef = doc(shoppingBasketCollectionRef, `${allPurchaseRecordCount.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    basketNumber: allPurchaseRecordCount.data().count + 1,
                    userEmail: userData.email,
                    address: addressInfo.address,
                    address2: addressInfo.address2,
                    productData: productData,
                    purchaseList: purchaseList,
                    totalQuantity: totalQuantity,
                    totalAmount: totalAmount,
                    date: createdTime,
                }
            );
        };

        getUserInfo()
        .then(() => {
            addBasket()
            .then(() => {
                dispatch({ type: 'STORE_COMPLETE' });
                navigate('/store/mypage/shoppingbasket', { replace: true });
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

const DeleteShoppingBasket = (data, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const deleteBasket = async () => {

            // 장바구니 데이터 삭제에 앞서 삭제 기능 실행에 필요한 Doc의 id 값을 찾아야한다.
            const queryRef = query(shoppingBasketCollectionRef, orderBy('basketNumber', 'asc'), where('userEmail', '==', data.userEmail), where('productData', '==', data.productData));
            const allDocumentSnapshots = await getDocs(queryRef);

            let docId = '';

            // query를 이용한 조건 검색으로 doc의 데이터를 식별한다.
            allDocumentSnapshots.forEach((doc) => {
                // console.log(doc.data());
                // console.log(doc.id);

                docId = doc.id;
            });

            await deleteDoc(doc(shoppingBasketCollectionRef, docId));
        };

        deleteBasket()
        .then(() => {
            dispatch({ type: 'STORE_COMPLETE' });
            dispatch({ type: 'STORE_CLEAN_BASKETDATA' });
            alert('장바구니 내역이 삭제되었습니다.');
            navigate('/store/mypage/shoppingbasket', { replace: true });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
        });
    };
};

const GetShoppingBasket = (userEmail) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const result = [];

        const getData = async () => {
            const queryRef = query(shoppingBasketCollectionRef, orderBy('basketNumber', 'asc'), where('userEmail', '==', userEmail));
            const allDocumentSnapshots = await getDocs(queryRef);

            allDocumentSnapshots.forEach((doc) => {
                result.push(doc.data());
            });
        };

        getData()
        .then(() => {
            dispatch({ type: 'STORE_COMPLETE' });
            dispatch({ type: 'STORE_SET_BASKETDATA', payload: result });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
        });
    };
};

const CreateReview = (inputData, userData, productData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const process = async () => {
            const querys = query(reviewCollectionRef);
            const docCount = await getCountFromServer(querys);
            const docRef = doc(reviewCollectionRef, `${docCount.data().count + 1}`);

            const time = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    docNumber: docCount.data().count + 1,
                    title: inputData.inputTitle,
                    text: inputData.inputText,
                    score: parseInt(inputData.inputScore),
                    writer: userData.displayName,
                    isDelete: false,
                    createdDate: time,
                }
            );
        };

        let reviewsCals = 0;
        let beforeScore = 0;

        const updataProductInfo = async () => {
            const docRef = doc(storeCollectionRef, productData.name);
            const docSnap = await getDoc(docRef);

            reviewsCals = docSnap.data().productReviews + 1;
            beforeScore = docSnap.data().productScore;

            await setDoc(docRef, {
                productReviews: parseInt(reviewsCals),
                productScore: Math.round((parseInt(beforeScore) + parseInt(inputData.inputScore)) / parseInt(reviewsCals) * 10) / 10,
            }, { merge: true });
        };

        let beforePoint = 0;

        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);
            const docSnap = await getDoc(docRef);

            beforePoint = parseInt(docSnap.data().point);

            await setDoc(docRef, {
                point: beforePoint + parseInt(productData.eventPoint),
            }, { merge: true });
        };

        const recordPointData = async () => {
            const querys = query(pointRecordCollectionRef);
            const count = await getCountFromServer(querys);

            const docRef = doc(pointRecordCollectionRef, `${count.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    recordNumber: count.data().count + 1,
                    userEmail: userData.email,
                    recordType: '+',
                    pointChangeNumber: parseInt(productData.eventPoint),
                    recordDesc: '포인트 적립(리뷰 작성).',
                    recordDate: createdTime,
                    leftoverPoint: beforePoint + parseInt(productData.eventPoint),
                }
            );
        };

        process()
            .then(() => {
                updataProductInfo()
                .then(() => {

                    // 리뷰 이벤트가 있을 경우에만 포인트를 적립하고 DB를 수정.
                    if (productData.eventType === '리뷰 이벤트') {
                        updataUserInfo()
                        .then(() => {
                            recordPointData()
                            .then(() => {
                                dispatch({ type: 'STORE_COMPLETE' });
                                dispatch({ type: 'STORE_RENDERING_ON' });
                                alert('리뷰 작성이 완료되었습니다.');
                                navigate(`/store/productdetail/${productData.name}`, { replace: true });
                            })
                            .catch((error) => {
                                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                                navigate(`/store/productdetail/${productData.name}`, { replace: true });
                            });
                        })
                        .catch((error) => {
                            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                            navigate(`/store/productdetail/${productData.name}`, { replace: true });
                        });
                    }
                    // 아닐 경우에는 그냥 리뷰만 작성.
                    else {
                        dispatch({ type: 'STORE_COMPLETE' });
                        dispatch({ type: 'STORE_RENDERING_ON' });
                        navigate(`/store/productdetail/${productData.name}`, { replace: true });
                    };

                })
                .catch((error) => {
                    dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                    navigate(`/store/productdetail/${productData.name}`, { replace: true });
                });

            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                navigate(`/store/productdetail/${productData.name}`, { replace: true });
            });
    };
};

const DeleteReview = (docData, productData, userData, navigate) => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const updateInfo = async () => {
            const docRef = doc(reviewCollectionRef, `${docData.docNumber}`);
            const docSnap = await getDoc(docRef);

            const isDelete = docSnap.data().isDelete;

            await setDoc(docRef, {
                isDelete: !isDelete,
            }, { merge: true });
        };

        let reviewsCals = 0;
        // let beforeScore = 0;

        const updataProductInfo = async () => {
            const docRef = doc(storeCollectionRef, productData.name);
            const docSnap = await getDoc(docRef);

            reviewsCals = docSnap.data().productReviews - 1;
            // beforeScore = docSnap.data().productScore; // 4.5

            await setDoc(docRef, {
                productReviews: parseInt(reviewsCals),
                // productScore: (parseInt(beforeScore) - parseInt(docData.score)) / parseInt(reviewsCals),
            }, { merge: true });
        };

        let beforePoint = 0;

        const updataUserInfo = async () => {
            const docRef = doc(userCollectionRef, userData.email);
            const docSnap = await getDoc(docRef);

            beforePoint = parseInt(docSnap.data().point);

            await setDoc(docRef, {
                point: beforePoint - parseInt(productData.eventPoint),
            }, { merge: true });
        };

        const recordPointData = async () => {
            const querys = query(pointRecordCollectionRef);
            const count = await getCountFromServer(querys);

            const docRef = doc(pointRecordCollectionRef, `${count.data().count + 1}`);
            const createdTime = timeStamp.fromDate(new Date());

            await setDoc(docRef,
                {
                    recordNumber: count.data().count + 1,
                    userEmail: userData.email,
                    recordType: '-',
                    pointChangeNumber: parseInt(productData.eventPoint),
                    recordDesc: '적립 취소(리뷰 삭제).',
                    recordDate: createdTime,
                    leftoverPoint: beforePoint - parseInt(productData.eventPoint),
                }
            );
        };

        updateInfo()
        .then(() => {
            updataProductInfo()
            .then(() => {
                updataUserInfo()
                .then(() => {
                    recordPointData()
                    .then(() => {
                        dispatch({ type: 'STORE_COMPLETE' });
                        dispatch({ type: 'STORE_RENDERING_ON' });
                        alert('리뷰 삭제가 완료되었습니다.');
                        navigate(`/store/productdetail/${productData.name}`, { replace: true });
                    })
                    .catch((error) => {
                        dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                        navigate(`/store/productdetail/${productData.name}`, { replace: true });
                    });
                })
                .catch((error) => {
                    dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                    navigate(`/store/productdetail/${productData.name}`, { replace: true });
                });
            })
            .catch((error) => {
                dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
                navigate(`/store/productdetail/${productData.name}`, { replace: true });
            });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            navigate(`/store/productdetail/${productData.name}`, { replace: true });
        });

    };
};
const UpdateReview = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });
        dispatch({ type: 'STORE_COMPLETE' });
        dispatch({ type: 'STORE_ERROR' });
    };
};
const ReadReview = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'STORE_STATE_INIT' });
        dispatch({ type: 'STORE_LOADING' });

        const result = [];

        const process = async () => {
            const queryRef = query(reviewCollectionRef, orderBy('docNumber', 'asc'), where('isDelete', '==', false));
            const documentSnapshots = await getDocs(queryRef);

            documentSnapshots.forEach((doc) => {
                result.push(doc.data());
            });
        };

        process()
        .then(() => {
            dispatch({ type: 'STORE_COMPLETE' });
            dispatch({ type: 'STORE_SET_REVIEWDATA', payload: result });
            // navigate(`/store/productdetail/${productData.name}`, { replace: true });
        })
        .catch((error) => {
            dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
            // navigate(`/store/productdetail/${productData.name}`, { replace: true });
        });

    };
};

export { Test1, AddProduct, GetProductList, GetSearchProductList, GetSearchSubCategoryProductList, GetProductInfo, UpdateProduct, ChangeProductDisclosure, GoToPurchasePage, PurchaseProduct, ChargePoint, GetpurchaseRecord, DeletePurchaseRecord, GetPointRecord, AddShoppingBasket, DeleteShoppingBasket, GetShoppingBasket, CreateReview, DeleteReview, UpdateReview, ReadReview };





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