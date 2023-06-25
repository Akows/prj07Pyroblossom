const productOptionInfoProcess = (productInfo, productOptionInfo) => {

    const resultData = {
        option1: '',
        option1SurchargeType: '',
        option1SurchargePrice: '',
        option1PurchaseQuantityLimit: '',
        option1Inventory: '',
        option1SalesRate: '',
        option2: '',
        option2SurchargeType: '',
        option2SurchargePrice: '',
        option2PurchaseQuantityLimit: '',
        option2Inventory: '',
        option2SalesRate: '',
        option3: '',
        option3SurchargeType: '',
        option3SurchargePrice: '',
        option3PurchaseQuantityLimit: '',
        option3Inventory: '',
        option3SalesRate: '',
        option4: '',
        option4SurchargeType: '',
        option4SurchargePrice: '',
        option4PurchaseQuantityLimit: '',
        option4Inventory: '',
        option4SalesRate: '',
        option5: '',
        option5SurchargeType: '',
        option5SurchargePrice: '',
        option5PurchaseQuantityLimit: '',
        option5Inventory: '',
        option5SalesRate: '',
    };

    // 옵션 데이터 1차 가공.
    // 옵션을 입력하지 않았을 경우.
    if (productOptionInfo.option1 === '') {
        resultData.option1 = '옵션없음';
        resultData.option1SurchargeType = '';
        resultData.option1SurchargePrice = '';
        resultData.option1PurchaseQuantityLimit = '';
        resultData.option1Inventory = '';
        resultData.option1SalesRate = 0;
    };
    if (productOptionInfo.option2 === '') {
        resultData.option2 = '옵션없음';
        resultData.option2SurchargeType = '';
        resultData.option2SurchargePrice = '';
        resultData.option2PurchaseQuantityLimit = '';
        resultData.option2Inventory = '';
        resultData.option2SalesRate = 0;
    };
    if (productOptionInfo.option3 === '') {
        resultData.option3 = '옵션없음';
        resultData.option3SurchargeType = '';
        resultData.option3SurchargePrice = '';
        resultData.option3PurchaseQuantityLimit = '';
        resultData.option3Inventory = '';
        resultData.option3SalesRate = 0;
    };
    if (productOptionInfo.option4 === '') {
        resultData.option4 = '옵션없음';
        resultData.option4SurchargeType = '';
        resultData.option4SurchargePrice = '';
        resultData.option4PurchaseQuantityLimit = '';
        resultData.option4Inventory = '';
        resultData.option4SalesRate = 0;
    };
    if (productOptionInfo.option5 === '') {
        resultData.option5 = '옵션없음';
        resultData.option5SurchargeType = '';
        resultData.option5SurchargePrice = '';
        resultData.option5PurchaseQuantityLimit = '';
        resultData.option5Inventory = '';
        resultData.option5SalesRate = 0;
    };

    // 옵션 데이터 2차 가공.
    // 옵션이 있으나 가격변동이 없을 경우.
    if (productOptionInfo.option1 !== '' && productOptionInfo.option1SurchargeType === '변동없음') {
        resultData.option1 = productOptionInfo.option1;
        resultData.option1SurchargeType = productOptionInfo.option1SurchargeType;
        resultData.option1SurchargePrice = parseInt(productInfo.price);
        resultData.option1PurchaseQuantityLimit = productOptionInfo.option1PurchaseQuantityLimit;
        resultData.option1Inventory = productOptionInfo.option1Inventory;
        resultData.option1SalesRate = 0;
    };
    if (productOptionInfo.option2 !== '' && productOptionInfo.option2SurchargeType === '변동없음') {
        resultData.option2 = productOptionInfo.option2;
        resultData.option2SurchargeType = productOptionInfo.option2SurchargeType;
        resultData.option2SurchargePrice = parseInt(productInfo.price);
        resultData.option2PurchaseQuantityLimit = productOptionInfo.option2PurchaseQuantityLimit;
        resultData.option2Inventory = productOptionInfo.option2Inventory;
        resultData.option2SalesRate = 0;
    };
    if (productOptionInfo.option3 !== '' && productOptionInfo.option3SurchargeType === '변동없음') {
        resultData.option3 = productOptionInfo.option3;
        resultData.option3SurchargeType = productOptionInfo.option3SurchargeType;
        resultData.option3SurchargePrice = parseInt(productInfo.price);
        resultData.option3PurchaseQuantityLimit = productOptionInfo.option3PurchaseQuantityLimit;
        resultData.option3Inventory = productOptionInfo.option3Inventory;
        resultData.option3SalesRate = 0;
    };
    if (productOptionInfo.option4 !== '' && productOptionInfo.option4SurchargeType === '변동없음') {
        resultData.option4 = productOptionInfo.option4;
        resultData.option4SurchargeType = productOptionInfo.option4SurchargeType;
        resultData.option4SurchargePrice = parseInt(productInfo.price);
        resultData.option4PurchaseQuantityLimit = productOptionInfo.option4PurchaseQuantityLimit;
        resultData.option4Inventory = productOptionInfo.option4Inventory;
        resultData.option4SalesRate = 0;
    };
    if (productOptionInfo.option5 !== '' && productOptionInfo.option5SurchargeType === '변동없음') {
        resultData.option5 = productOptionInfo.option5;
        resultData.option5SurchargeType = productOptionInfo.option5SurchargeType;
        resultData.option5SurchargePrice = parseInt(productInfo.price);
        resultData.option5PurchaseQuantityLimit = productOptionInfo.option5PurchaseQuantityLimit;
        resultData.option5Inventory = productOptionInfo.option5Inventory;
        resultData.option5SalesRate = 0;
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
        resultData.option1SalesRate = 0;
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
        resultData.option2SalesRate = 0;
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
        resultData.option3SalesRate = 0;
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
        resultData.option4SalesRate = 0;
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
        resultData.option5SalesRate = 0;
    };

    return resultData;
};

const dateFormat = (date) => {
    const time = new Date(date);

    let year = time.getFullYear().toString(); //년도 뒤에 두자리
    let month = ("0" + (time.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    let day = ("0" + time.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    let hour = ("0" + time.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    let minute = ("0" + time.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    let second = ("0" + time.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    return year + '년 ' + month + '월 ' + day + '일, ' + hour + '시 ' + minute + '분 ' + second + '초.';
};

export { productOptionInfoProcess, dateFormat };