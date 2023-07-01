import { produce } from 'immer'

const initialState = {
    flagValue: {
        isError: false,
        isLoading: false,
        isRendering: false,
        isPointEnough: true,
    },
    processInfo: {
        processCode: '',
        processMessage: '',
        processData1: {},
        processData2: [],
    },
    purchaseData: {
        purchaseList: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    basketData: {},
    reviewData: []
};

const storeReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {

        switch (action.type) {

            case 'STORE_STATE_INIT':
                draft.flagValue.isLoading = false;
                draft.flagValue.isError = false;
                draft.processInfo.processCode = '';
                draft.processInfo.processMessage = '';
                break;
            case 'STORE_PROCESSDATA_CLEAN':
                draft.processInfo = {
                    processData1: '',
                    processData2: '',
                };
                break;

            case 'STORE_LOADING':
                draft.flagValue.isLoading = true;
                draft.processInfo.processCode = '로딩 중..';
                draft.processInfo.processMessage = '로딩 중..';
                break;
            case 'STORE_COMPLETE':
                draft.flagValue.isLoading = false;
                draft.flagValue.isError = false;
                draft.processInfo.processCode = '작업 완료.';
                draft.processInfo.processMessage = '작업 완료.';
                break;
            case 'STORE_ERROR':
                draft.flagValue.isLoading = false;
                draft.flagValue.isError = true;
                draft.processInfo.processCode = action.payload.errorCode;
                draft.processInfo.processMessage = action.payload.errorMessage;
                draft.processInfo.processData1 = '';
                draft.processInfo.processData2 = '';
                draft.processInfo.purchaseData = {};
                break;

            case 'STORE_NOTENOUGH_POINT':
                draft.flagValue.isPointEnough = false;
                break;
            case 'STORE_ENOUGH_POINT':
                draft.flagValue.isPointEnough = true;
                break;

            case 'STORE_RENDERING_ON':
                draft.flagValue.isRendering = true;
                break;
            case 'STORE_RENDERING_OFF':
                draft.flagValue.isRendering = false;
                break;

            case 'STORE_GET_PRODUCTLIST':
                draft.processInfo.processCode = '페이징 완료.';
                draft.processInfo.processMessage = '페이징 완료.';
                draft.processInfo.processData1 = action.payload.processData1;
                draft.processInfo.processData2 = action.payload.processData2;
                break;

            case 'STORE_SAVE_PRODUCTDATA':

                // eslint-disable-next-line
                action.payload.map((item) => {
                    draft.processInfo.processData2.push(item[0]);
                });

                // draft.processInfo.processData2 = action.payload;
                break;

            case 'STORE_SAVE_PURCHASEDATA':

                // eslint-disable-next-line
                action.payload.purchaseList.map((item) => {
                    draft.purchaseData.purchaseList.push(item[0]);
                });
                draft.purchaseData.totalQuantity = action.payload.totalQuantity;
                draft.purchaseData.totalAmount = action.payload.totalAmount;

                // draft.purchaseData = action.payload;
                break;
            case 'STORE_CLEAN_PURCHASEDATA':
                draft.purchaseData = {};
                break;

            case 'STORE_SET_BASKETDATA':
                draft.basketData = action.payload;
                break;
            case 'STORE_CLEAN_BASKETDATA':
                draft.basketData = {};
                break;

            case 'STORE_SET_REVIEWDATA':
                draft.reviewData = action.payload;
                break;
            case 'STORE_CLEAN_REVIEWDATA':
                draft.reviewData = [];
                break;




            case 'STORE_PAGING_PROCESS':
                draft.processInfo.processCode = '목록 받아오는 중..';
                draft.processInfo.processMessage = '목록 받아오는 중..';
                if (action.payload.type === 'cal_pageIndex') {
                    draft.processInfo.processData3 = action.payload.processData3;
                };
                if (action.payload.type === 'cal_pageCursor') {
                    draft.processInfo.processData1 = action.payload.processData1;
                    draft.processInfo.processData2 = action.payload.processData2;
                };
                if (action.payload.type === 'cal_IndexAndCursor') {
                    draft.processInfo.processData1 = action.payload.processData1;
                    draft.processInfo.processData2 = action.payload.processData2;
                    draft.processInfo.processData3 = action.payload.processData3;
                };
                break;




            default:
                break;
        }
    });
};

export { storeReducer };
