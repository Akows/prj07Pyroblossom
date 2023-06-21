const productOptionInfoProcess = (productInfo, productOptionInfo) => {

    const resultData = {
        option1: '',
        option1SurchargeType: '',
        option1SurchargePrice: '',
        option1PurchaseQuantityLimit: '',
        option1Inventory: '',
        option2: '',
        option2SurchargeType: '',
        option2SurchargePrice: '',
        option2PurchaseQuantityLimit: '',
        option2Inventory: '',
        option3: '',
        option3SurchargeType: '',
        option3SurchargePrice: '',
        option3PurchaseQuantityLimit: '',
        option3Inventory: '',
        option4: '',
        option4SurchargeType: '',
        option4SurchargePrice: '',
        option4PurchaseQuantityLimit: '',
        option4Inventory: '',
        option5: '',
        option5SurchargeType: '',
        option5SurchargePrice: '',
        option5PurchaseQuantityLimit: '',
        option5Inventory: '',
    };

    // 옵션 데이터 1차 가공.
    // 옵션을 입력하지 않았을 경우.
    if (productOptionInfo.option1 === '') {
        resultData.option1 = '옵션없음';
        resultData.option1SurchargeType = '';
        resultData.option1SurchargePrice = '';
        resultData.option1PurchaseQuantityLimit = '';
        resultData.option1Inventory = '';
    };
    if (productOptionInfo.option2 === '') {
        resultData.option2 = '옵션없음';
        resultData.option2SurchargeType = '';
        resultData.option2SurchargePrice = '';
        resultData.option2PurchaseQuantityLimit = '';
        resultData.option2Inventory = '';
    };
    if (productOptionInfo.option3 === '') {
        resultData.option3 = '옵션없음';
        resultData.option3SurchargeType = '';
        resultData.option3SurchargePrice = '';
        resultData.option3PurchaseQuantityLimit = '';
        resultData.option3Inventory = '';
    };
    if (productOptionInfo.option4 === '') {
        resultData.option4 = '옵션없음';
        resultData.option4SurchargeType = '';
        resultData.option4SurchargePrice = '';
        resultData.option4PurchaseQuantityLimit = '';
        resultData.option4Inventory = '';
    };
    if (productOptionInfo.option5 === '') {
        resultData.option5 = '옵션없음';
        resultData.option5SurchargeType = '';
        resultData.option5SurchargePrice = '';
        resultData.option5PurchaseQuantityLimit = '';
        resultData.option5Inventory = '';
    };

    // 옵션 데이터 2차 가공.
    // 옵션이 있으나 가격변동이 없을 경우.
    if (productOptionInfo.option1 !== '' && productOptionInfo.option1SurchargeType === '변동없음') {
        resultData.option1 = productOptionInfo.option1;
        resultData.option1SurchargeType = productOptionInfo.option1SurchargeType;
        resultData.option1SurchargePrice = parseInt(productInfo.price);
        resultData.option1PurchaseQuantityLimit = productOptionInfo.option1PurchaseQuantityLimit;
        resultData.option1Inventory = productOptionInfo.option1Inventory;
    };
    if (productOptionInfo.option2 !== '' && productOptionInfo.option2SurchargeType === '변동없음') {
        resultData.option2 = productOptionInfo.option2;
        resultData.option2SurchargeType = productOptionInfo.option2SurchargeType;
        resultData.option2SurchargePrice = parseInt(productInfo.price);
        resultData.option2PurchaseQuantityLimit = productOptionInfo.option2PurchaseQuantityLimit;
        resultData.option2Inventory = productOptionInfo.option2Inventory;
    };
    if (productOptionInfo.option3 !== '' && productOptionInfo.option3SurchargeType === '변동없음') {
        resultData.option3 = productOptionInfo.option3;
        resultData.option3SurchargeType = productOptionInfo.option3SurchargeType;
        resultData.option3SurchargePrice = parseInt(productInfo.price);
        resultData.option3PurchaseQuantityLimit = productOptionInfo.option3PurchaseQuantityLimit;
        resultData.option3Inventory = productOptionInfo.option3Inventory;
    };
    if (productOptionInfo.option4 !== '' && productOptionInfo.option4SurchargeType === '변동없음') {
        resultData.option4 = productOptionInfo.option4;
        resultData.option4SurchargeType = productOptionInfo.option4SurchargeType;
        resultData.option4SurchargePrice = parseInt(productInfo.price);
        resultData.option4PurchaseQuantityLimit = productOptionInfo.option4PurchaseQuantityLimit;
        resultData.option4Inventory = productOptionInfo.option4Inventory;
    };
    if (productOptionInfo.option5 !== '' && productOptionInfo.option5SurchargeType === '변동없음') {
        resultData.option5 = productOptionInfo.option5;
        resultData.option5SurchargeType = productOptionInfo.option5SurchargeType;
        resultData.option5SurchargePrice = parseInt(productInfo.price);
        resultData.option5PurchaseQuantityLimit = productOptionInfo.option5PurchaseQuantityLimit;
        resultData.option5Inventory = productOptionInfo.option5Inventory;
    };

    // 옵션 데이터 3차 가공.
    // 옵션이 있으나 가격변동이 있을 경우.
    if (productOptionInfo.option1 !== '' && (productOptionInfo.option1SurchargeType === '추가가격' || '가격감소')) {
        resultData.option1 = productOptionInfo.option1;
        resultData.option1SurchargeType = productOptionInfo.option1SurchargeType;

        if (productOptionInfo.option1SurchargeType === '추가가격') {
            resultData.option1SurchargePrice = parseInt(productInfo.price) + parseInt(productOptionInfo.option1SurchargePrice);
        };

        if (productOptionInfo.option1SurchargeType === '가격감소') {
            resultData.option1SurchargePrice = parseInt(productInfo.price) - parseInt(productOptionInfo.option1SurchargePrice);
        };

        resultData.option1PurchaseQuantityLimit = productOptionInfo.option1PurchaseQuantityLimit;
        resultData.option1Inventory = productOptionInfo.option1Inventory;
    };
    if (productOptionInfo.option2 !== '' && (productOptionInfo.option2SurchargeType === '추가가격' || '가격감소')) {
        resultData.option2 = productOptionInfo.option2;
        resultData.option2SurchargeType = productOptionInfo.option2SurchargeType;

        if (productOptionInfo.option2SurchargeType === '추가가격') {
            resultData.option2SurchargePrice = parseInt(productInfo.price) + parseInt(productOptionInfo.option2SurchargePrice);
        };

        if (productOptionInfo.option2SurchargeType === '가격감소') {
            resultData.option2SurchargePrice = parseInt(productInfo.price) - parseInt(productOptionInfo.option2SurchargePrice);
        };

        resultData.option2PurchaseQuantityLimit = productOptionInfo.option2PurchaseQuantityLimit;
        resultData.option2Inventory = productOptionInfo.option2Inventory;
    };
    if (productOptionInfo.option3 !== '' && (productOptionInfo.option3SurchargeType === '추가가격' || '가격감소')) {
        resultData.option3 = productOptionInfo.option3;
        resultData.option3SurchargeType = productOptionInfo.option3SurchargeType;

        if (productOptionInfo.option3SurchargeType === '추가가격') {
            resultData.option3SurchargePrice = parseInt(productInfo.price) + parseInt(productOptionInfo.option3SurchargePrice);
        };

        if (productOptionInfo.option3SurchargeType === '가격감소') {
            resultData.option3SurchargePrice = parseInt(productInfo.price) - parseInt(productOptionInfo.option3SurchargePrice);
        };

        resultData.option3PurchaseQuantityLimit = productOptionInfo.option3PurchaseQuantityLimit;
        resultData.option3Inventory = productOptionInfo.option3Inventory;
    };
    if (productOptionInfo.option4 !== '' && (productOptionInfo.option4SurchargeType === '추가가격' || '가격감소')) {
        resultData.option4 = productOptionInfo.option4;
        resultData.option4SurchargeType = productOptionInfo.option4SurchargeType;

        if (productOptionInfo.option4SurchargeType === '추가가격') {
            resultData.option4SurchargePrice = parseInt(productInfo.price) + parseInt(productOptionInfo.option4SurchargePrice);
        };

        if (productOptionInfo.option4SurchargeType === '가격감소') {
            resultData.option4SurchargePrice = parseInt(productInfo.price) - parseInt(productOptionInfo.option4SurchargePrice);
        };

        resultData.option4PurchaseQuantityLimit = productOptionInfo.option4PurchaseQuantityLimit;
        resultData.option4Inventory = productOptionInfo.option4Inventory;
    };
    if (productOptionInfo.option5 !== '' && (productOptionInfo.option5SurchargeType === '추가가격' || '가격감소')) {
        resultData.option5 = productOptionInfo.option5;
        resultData.option5SurchargeType = productOptionInfo.option5SurchargeType;

        if (productOptionInfo.option5SurchargeType === '추가가격') {
            resultData.option5SurchargePrice = parseInt(productInfo.price) + parseInt(productOptionInfo.option5SurchargePrice);
        };

        if (productOptionInfo.option5SurchargeType === '가격감소') {
            resultData.option5SurchargePrice = parseInt(productInfo.price) - parseInt(productOptionInfo.option5SurchargePrice);
        };

        resultData.option5PurchaseQuantityLimit = productOptionInfo.option5PurchaseQuantityLimit;
        resultData.option5Inventory = productOptionInfo.option5Inventory;
    };

    return resultData;
};























// const GetProductList = (listGetType, searchKeyword) => {
//     return (dispatch, getState) => {
//         dispatch({ type: 'STORE_STATE_INIT' });
//         dispatch({ type: 'STORE_LOADING' });

//         const result = [];

//         // const calListOfBothEnds = async () => {
//         //     컬렉션 Doc의 전체 갯수를 계산하여 반환하는 함수.
//         //     const getCounts = await getCountFromServer(queryRef);
//         //     console.log(getCounts.data().count);
//         // };

//         const pagingProcess = async (queryRef) => {
//             const documentSnapshots = await getDocs(queryRef);

//             const newFirstVisible = documentSnapshots.docs[0];
//             const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

//             documentSnapshots.forEach((doc) => {
//                 result.push(doc.data());
//             });

//             // 제품 검색의 경우 index와 cursor 모두를 다시 계산해주어야한다.
//             if (searchKeyword) {
//                 // let firstQueryRef = '';
//                 // let LastQueryRef = '';

//                 // if (searchKeyword === '') {
//                 //     firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limit(1));
//                 //     LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limitToLast(1));
//                 // }
//                 // else {
//                 //     firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', searchKeyword), limit(1));
//                 //     LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), where('name', '==', searchKeyword), limitToLast(1));
//                 // };

//                 // const firstDocumentSnapshots = await getDocs(firstQueryRef);
//                 // const lastDocumentSnapshots = await getDocs(LastQueryRef);

//                 // const firstDoc = firstDocumentSnapshots.docs[0];
//                 // const lastDoc = lastDocumentSnapshots.docs[0];

//                 const returnData = {
//                     type: 'cal_IndexAndCursor',
//                     processData1: {
//                         firstVisible: newFirstVisible,
//                         lastVisible: newLastVisible,
//                     },
//                     processData2: {
//                         productData: result,
//                     },
//                     processData3: {
//                         firstOfIndex: firstDoc,
//                         lastOfIndex: lastDoc,
//                     },
//                 };

//                 dispatch({ type: 'STORE_PAGING_PROCESS', payload: returnData });
//                 return;
//             };

//             // 페이지가 처음 렌더링 될 때 1번만 실행되는 함수.
//             // 전체 컬렉션의 가장 처음과 끝 Doc을 기록.
//             const { firstOfIndex, lastOfIndex } = getState().store.processInfo.processData3;

//             if (!firstOfIndex && !lastOfIndex) {
//                 const firstQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limit(1));
//                 const LastQueryRef = query(storeCollectionRef, orderBy('number', 'asc'), limitToLast(1));

//                 const firstDocumentSnapshots = await getDocs(firstQueryRef);
//                 const lastDocumentSnapshots = await getDocs(LastQueryRef);

//                 const firstDoc = firstDocumentSnapshots.docs[0];
//                 const lastDoc = lastDocumentSnapshots.docs[0];

//                 const returnData = {
//                     type: 'cal_pageIndex',
//                     processData3: {
//                         firstOfIndex: firstDoc,
//                         lastOfIndex: lastDoc,
//                     },
//                 };

//                 dispatch({ type: 'STORE_PAGING_PROCESS', payload: returnData });
//             };

//             const returnData = {
//                 type: 'cal_pageCursor',
//                 processData1: {
//                     firstVisible: newFirstVisible,
//                     lastVisible: newLastVisible,
//                 },
//                 processData2: {
//                     productData: result,
//                 },
//             };

//             dispatch({ type: 'STORE_PAGING_PROCESS', payload: returnData });
//         };

//         const process = (listGetType) => {
//             // let queryRef = '';
//             // const { firstVisible, lastVisible } = getState().store.processInfo.processData1;

//             // if (listGetType === '') {
//             //     queryRef = query(storeCollectionRef, orderBy('number'), limit(2));
//             // };

//             // if (listGetType === 'keywordsearch') {
//             //     if (searchKeyword === '') {
//             //         queryRef = query(storeCollectionRef, orderBy('number'), limit(2));
//             //     }
//             //     else {
//             //         queryRef = query(storeCollectionRef, orderBy('number'), where('name', '==', searchKeyword), limit(2));
//             //     };
//             // };

//             // if (listGetType === 'next') {
//             //     queryRef = query(storeCollectionRef, orderBy('number'), startAfter(lastVisible), limit(2));
//             // };

//             // if (listGetType === 'prev') {
//             //     queryRef = query(storeCollectionRef, orderBy('number'), endBefore(firstVisible), limitToLast(2));
//             // };

//             pagingProcess(queryRef)
//                 .then(() => {
//                     dispatch({ type: 'STORE_COMPLETE' });
//                 })
//                 .catch((error) => {
//                     dispatch({ type: 'STORE_ERROR', payload: createErrorData(error) });
//                 });
//         };

//         process(listGetType);
//     };
// };
















export { productOptionInfoProcess };