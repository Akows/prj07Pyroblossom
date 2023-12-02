const processOption = (productInfo, productOptionInfo, optionNumber) => {
    const optionKey = `option${optionNumber}`;
    const option = productOptionInfo[optionKey];
    const surchargeType = `${optionKey}SurchargeType`;
    const surchargePrice = `${optionKey}SurchargePrice`;
    const purchaseQuantityLimit = `${optionKey}PurchaseQuantityLimit`;
    const inventory = `${optionKey}Inventory`;
    const salesRate = `${optionKey}SalesRate`;

    let result = {
        [optionKey]: option || '옵션없음',
        [surchargeType]: '',
        [surchargePrice]: '',
        [purchaseQuantityLimit]: '',
        [inventory]: '',
        [salesRate]: 0,
    };

    if (option) {
        result[surchargeType] = productOptionInfo[surchargeType];
        switch (productOptionInfo[surchargeType]) {
            case '변동없음':
                result[surchargePrice] = parseInt(productInfo.price);
                break;
            case '추가가격':
                result[surchargePrice] = parseInt(productInfo.price) + parseInt(productOptionInfo[surchargePrice]);
                break;
            case '가격감소':
                result[surchargePrice] = parseInt(productInfo.price) - parseInt(productOptionInfo[surchargePrice]);
                break;
            default:
                break;
        }
        result[purchaseQuantityLimit] = productOptionInfo[purchaseQuantityLimit];
        result[inventory] = productOptionInfo[inventory];
    }
    return result;
};

const productOptionInfoProcess = (productInfo, productOptionInfo) => {
    let resultData = {};
    for (let i = 1; i <= 5; i++) {
        Object.assign(resultData, processOption(productInfo, productOptionInfo, i));
    }
    return resultData;
};

const dateFormat = (date) => {
    const time = new Date(date);
    let year = time.getFullYear().toString();
    let month = ("0" + (time.getMonth() + 1)).slice(-2);
    let day = ("0" + time.getDate()).slice(-2);
    let hour = ("0" + time.getHours()).slice(-2);
    let minute = ("0" + time.getMinutes()).slice(-2);
    let second = ("0" + time.getSeconds()).slice(-2);
    return year + '년 ' + month + '월 ' + day + '일, ' + hour + '시 ' + minute + '분 ' + second + '초.';
};

export { productOptionInfoProcess, dateFormat };
