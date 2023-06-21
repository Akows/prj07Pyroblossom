import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChargePoint } from '../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;
    
    position: fixed;

    top: 0;
    left: 0;

    z-index: 999;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: rgba( 65, 71, 89, 0.8 );

    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
`;

const PointCharge = styled.div`
    width: 600px;
    height: 600px;

    margin-top: 20px;
`;
const Title = styled.div`
    width: 100%;
    height: 100px;

    border: 1px solid gray;
    border-radius: 0px 0px 15px 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > p {
        font-size: 52px;
    };
`;
const ChargeFunc = styled.div`
    width: 100%;
    height: 200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    border: 1px solid gray;
    border-radius: 15px 15px 15px 15px;

    & > input {
        width: 90%;
        height: 40px;

        margin-top: 20px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;

        border-color: ${(props) => props.isEmpty ? 'red' : 'gray'};

        &::placeholder {
            color: ${(props) => props.isEmpty ? 'red' : 'gray'};
        };
    };

    & > p:nth-child(3) {
        margin-top: 20px;
    };
    & > p:nth-child(4) {
        margin-top: 10px;
    };
`;
const Button = styled.div`
    width: 100%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
    border-radius: 15px 15px 0px 0px;

    & > button {
        width: 90%;
        height: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: none;
        border-radius: 5px;
        background-color: #D3BC8E;
        color: #414147;

        font-family: 'GIFont';
        font-size: 16px;
    };

    & > button:hover {
        background-color: #414147;
        color: #D3BC8E;
    };
`;

export const PointChargeModal = ({ userData, isShowModal, setIsShowModal }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [chargePoint, setChargePoint] = useState(0);
    const [chargePointRewrite, setChargePointRewrite] = useState(0);

    const [isChargePointEmpty, setIsChargePointEmpty] = useState(false);
    const [isChargePointRewriteEmpty, setIsChargePointRewriteEmpty] = useState(false);

    const [isFirstRenderingChargePoint, setIsFirstRenderingChargePoint] = useState(true);
    const [isFirstRenderingChargePointRewrite, setIsFirstRenderingChargePointRewrite] = useState(true);

    const [isRewriteSame, setIsRewriteSame] = useState(false);

    const onChange = (event) => {
        setChargePoint(event.target.value);
        setIsFirstRenderingChargePoint(false);
        setIsChargePointEmpty(false);

        if (event.target.value === '') {
            setIsFirstRenderingChargePoint(true);
            setIsChargePointEmpty(true);
        };
    };

    const onChangeRewrite = (event) => {
        setChargePointRewrite(event.target.value);
        setIsFirstRenderingChargePointRewrite(false);
        setIsChargePointRewriteEmpty(false);

        if (event.target.value === '') {
            setIsFirstRenderingChargePointRewrite(true);
            setIsChargePointRewriteEmpty(true);
        };
    };

    const onClick = () => {
        if (!chargePoint) {
            setIsChargePointEmpty(true);
            return;
        };

        if (!chargePointRewrite) {
            setIsChargePointRewriteEmpty(true);
            return;
        };

        if (!isRewriteSame) {
            alert('충전 포인트의 수치가 일치하지않습니다.');
            return;
        };

        const confirmChoice = window.confirm('충전하시겠어요?');

        if (!confirmChoice) {
            return;
        }
        else {
            dispatch(ChargePoint(userData.email, chargePointRewrite, navigate));
            setIsShowModal(false);
        };
    };

    useEffect(() => {
        if (chargePoint === '' || chargePointRewrite === '') {
            setIsRewriteSame(false);
            return;
        };

        setIsRewriteSame(chargePoint === chargePointRewrite);
    }, [chargePoint, chargePointRewrite]);

    if (isShowModal) {
        return (
            <BackGround>

                <PointCharge>

                    <Title>
                        <p>포인트 충전하기</p>
                    </Title>
                    <ChargeFunc>
                        <input type='number' value={chargePoint} onChange={onChange} placeholder='충전액수를 입력해주세요.' isEmpty={isChargePointEmpty} />

                        <input type='number' value={chargePointRewrite} onChange={onChangeRewrite} placeholder='충전액수를 한번 더 입력해주세요.' isEmpty={isChargePointRewriteEmpty} />

                        {isFirstRenderingChargePointRewrite ? <></> :
                            <>
                                {!isRewriteSame && '불일치!'}
                            </>
                        }

                        <p>* 충전 내역은 마이페이지에서 확인가능합니다.</p>
                        <p>* 액수가 정확한지 꼭 확인해주세요.</p>
                    </ChargeFunc>

                    <Button onClick={onClick}>
                        <button>
                            완료
                        </button>
                    </Button>

                </PointCharge>

            </BackGround>
        );
    };
};
