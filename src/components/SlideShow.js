import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import leftarrow from '../assets/images/button/btnleft.png';
import rightarrow from '../assets/images/button/btnright.png';

import sildeImg1 from '../assets/slideshow/testimg1.jfif';
import sildeImg2 from '../assets/slideshow/testimg2.jfif';
import sildeImg3 from '../assets/slideshow/testimg3.jfif';
import sildeImg4 from '../assets/slideshow/testimg4.jfif';
import sildeImg5 from '../assets/slideshow/testimg5.jfif';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;

    border: 2px red solid;
`;

const SildeButton = styled.img`
    width: 150px;
    height: 150px;

    margin-bottom: 80px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 700px) {
        width: 0%;
    }
`;

const SildeBlock = styled.div`
    width: 100%;
    height: 100%;

    display: flex; 
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`;

const SlideImg = styled.img`
    width: 400px;
    height: 400px;

    touch-action: auto;  
`;

const SlidePointer = styled.div`
    width: 100%;
    height: 10%;

    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const PointerDots = styled.div`
    width: 100%;
    height: 100%;

    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > button {
        border: 0px;
        margin: 2px;

        border-radius: 15px;
    };
    & > button:active {
        background-color: gray;
    };
`;
const PointerDot = styled.div`
    width: 15px;
    height: 15px;

    background-color: ${(props) => props.isActive ? 'white' : 'gray'};
`;

const Sildeshow = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [whatSlideIsShow, setWhatSlideIsShow] = useState(sildeImg1);
    const slideLength = 5;

    const [mouseDownClientX, setMouseDownClientX] = useState(0);
    const [mouseDownClientY, setMouseDownClientY] = useState(0);
    const [mouseUpClientX, setMouseUpClientX] = useState(0);
    const [mouseUpClientY, setMouseUpClientY] = useState(0);
    const [tochedX, setTochedX] = useState(0);
    const [tochedY, setTochedY] = useState(0);

    // 윈도우 클릭 제스쳐.
    const onMouseDown = (event) => {
        setMouseDownClientX(event.clientX);
        setMouseDownClientY(event.clientY);
    };
    const onMouseUp = (event) => {
        setMouseUpClientX(event.clientX);
        setMouseUpClientY(event.clientY);

        const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
        const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
        const vector = dragSpaceX / dragSpaceY;

        if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
            if (mouseUpClientX < mouseDownClientX) {
                showSlide(currentSlide - 1);
            }
            else if (mouseUpClientX > mouseDownClientX) {
                showSlide(currentSlide + 1);
            };
        }
    };

    // 모바일 터치 제스쳐.
    const onTouchStart = (event) => {
        setTochedX(event.changedTouches[0].pageX);
        setTochedY(event.changedTouches[0].pageY);
    };
    const onTouchEnd = (event) => {
        const distanceX = tochedX - event.changedTouches[0].pageX;
        const distanceY = tochedY - event.changedTouches[0].pageY;
        const vector = Math.abs(distanceX / distanceY);

        if (distanceX > 30 && vector > 2) {
            showSlide(currentSlide - 1);
        }
        else if (distanceX < -30 && vector > 2) {
            showSlide(currentSlide + 1);
        };
    };

    // useEffect(() => {

    //     const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    //     const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    //     const vector = dragSpaceX / dragSpaceY;

    //     console.log(dragSpaceX, dragSpaceY);

    //     if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
    //         if (mouseUpClientX < mouseDownClientX) {
    //             showSlide(currentSlide - 1);
    //         }
    //         else if (mouseUpClientX > mouseDownClientX) {
    //             showSlide(currentSlide + 1);
    //         };
    //     }

    //     // eslint-disable-next-line
    // }, [mouseUpClientX]);

    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const [isActive5, setIsActive5] = useState(false);

    const showSlide = (index) => {
        const listLength = slideLength - 1;

        if (index < 0) {
            setCurrentSlide(listLength);
            return;
        }
        else if (index > listLength) {
            setCurrentSlide(0);
            return;
        };

        if (index <= listLength) {
            setCurrentSlide(index);
            return;
        };
    };

    const setSlide = (slideNumber) => {
        setCurrentSlide(slideNumber);
        showSlide(slideNumber);
    };

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useEffect(() => {
        showSlide(0);
    }, []);

    useEffect(() => {
        switch (currentSlide) {
            case 0:
                setWhatSlideIsShow(sildeImg1);
                setIsActive1(true);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 1:
                setWhatSlideIsShow(sildeImg2);
                setIsActive1(false);
                setIsActive2(true);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 2:
                setWhatSlideIsShow(sildeImg3);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(true);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 3:
                setWhatSlideIsShow(sildeImg4);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(true);
                setIsActive5(false);
                break;
            case 4:
                setWhatSlideIsShow(sildeImg5);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(true);
                break;
            default:
                break;
        }
    }, [currentSlide]);

    // eslint-disable-next-line
    // useInterval(() => {
    //     showSlide(currentSlide);
    //     setCurrentSlide(currentSlide + 1);

    //     if (currentSlide > slideLength - 2) {
    //         setCurrentSlide(0);
    //     }
    // }, 2000);

    return (
        <BackGround
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
        >

            <SildeButton src={leftarrow} alt='' onClick={() => { showSlide(currentSlide - 1) }} />

            <SildeBlock>
                <SlideImg src={whatSlideIsShow} />

                <SlidePointer>
                    <PointerDots>
                        {isActive1 ? <PointerDot isActive={isActive1} onClick={() => { setSlide(0) }} /> : <PointerDot isActive={false} onClick={() => { setSlide(0) }} />}
                        {isActive2 ? <PointerDot isActive={isActive2} onClick={() => { setSlide(1) }} /> : <PointerDot isActive={false} onClick={() => { setSlide(1) }} />}
                        {isActive3 ? <PointerDot isActive={isActive3} onClick={() => { setSlide(2) }} /> : <PointerDot isActive={false} onClick={() => { setSlide(2) }} />}
                        {isActive4 ? <PointerDot isActive={isActive4} onClick={() => { setSlide(3) }} /> : <PointerDot isActive={false} onClick={() => { setSlide(3) }} />}
                        {isActive5 ? <PointerDot isActive={isActive5} onClick={() => { setSlide(4) }} /> : <PointerDot isActive={false} onClick={() => { setSlide(4) }} />}
                    </PointerDots>
                </SlidePointer>
            </SildeBlock>

            <SildeButton src={rightarrow} alt='' onClick={() => { showSlide(currentSlide + 1) }} />

        </BackGround>
    );
};

export default Sildeshow;
