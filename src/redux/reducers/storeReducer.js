import { produce } from 'immer'

const initialState = {
    flagValue: {
        isError: false,
        isLoading: false,
    },
    processInfo: {
        processCode: '',
        processMessage: '',
        processData1: '',
        processData2: '',
    },
};

const storeReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {

        switch (action.type) {

            case 'STORE_STATE_INIT':
                draft.flagValue = {
                    isError: false,
                    isLoading: false,
                };
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
                draft.flagValue.isError = false;
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
                break;

            case 'STORE_PAGING_PROCESS':
                draft.processInfo.processCode = '목록 받아오는 중..';
                draft.processInfo.processMessage = '목록 받아오는 중..';
                draft.processInfo.processData1 = action.payload.processData1;
                draft.processInfo.processData2 = action.payload.processData2;
                break;




            default:
                break;
        }
    });
};

export { storeReducer };
