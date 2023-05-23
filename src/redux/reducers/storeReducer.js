import { produce } from 'immer'

const initialState = {
    flagValue: {
        isError: false,
        isLoading: false,
    },
    processInfo: {
        processCode: '',
        processMessage: '',
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
                draft.processInfo = {
                    processCode: '',
                    processMessage: '',
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
                draft.processInfo.processCode = '에러 발생!';
                draft.processInfo.processMessage = '에러 발생!';
                break;

            default:
                break;
        }
    });
};

export { storeReducer };
