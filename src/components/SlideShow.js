import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import leftarrow from '../assets/images/button/btnleft.png';
import rightarrow from '../assets/images/button/btnright.png';

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

const Sildeshow = ({ listData }) => {

    const [productData, setProductData] = useState({});

    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideImgSrc, setSlideImgSrc] = useState('');
    const [slideLinkName, setSlideLinkName] = useState('');

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
        };
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

    // 드래그를 이용한 슬라이드 변경 (useEffect 버전.)
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

        setProductData({
            slide1Img: `https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${listData[0]?.name}%2F${listData[0]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`,
            slide1Name: listData[0]?.name,
            slide2Img: `https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${listData[1]?.name}%2F${listData[1]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`,
            slide2Name: listData[1]?.name,
            slide3Img: `https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${listData[2]?.name}%2F${listData[2]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`,
            slide3Name: listData[2]?.name,
            slide4Img: `https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${listData[3]?.name}%2F${listData[3]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`,
            slide4Name: listData[3]?.name,
            slide5Img: `https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${listData[4]?.name}%2F${listData[4]?.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`,
            slide5Name: listData[4]?.name,
        });

        setSlideImgSrc(productData.slide1Img);
        setSlideLinkName(productData.slide1Name);

        // eslint-disable-next-line
    }, [listData]);

    useEffect(() => {
        switch (currentSlide) {
            case 0:
                setSlideImgSrc(productData.slide1Img);
                setSlideLinkName(productData.slide1Name);
                setIsActive1(true);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 1:
                setSlideImgSrc(productData.slide2Img);
                setSlideLinkName(productData.slide2Name);
                setIsActive1(false);
                setIsActive2(true);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 2:
                setSlideImgSrc(productData.slide3Img);
                setSlideLinkName(productData.slide3Name);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(true);
                setIsActive4(false);
                setIsActive5(false);
                break;
            case 3:
                setSlideImgSrc(productData.slide4Img);
                setSlideLinkName(productData.slide4Name);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(true);
                setIsActive5(false);
                break;
            case 4:
                setSlideImgSrc(productData.slide5Img);
                setSlideLinkName(productData.slide5Name);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(false);
                setIsActive5(true);
                break;
            default:
                break;
        }

        // eslint-disable-next-line    
    }, [currentSlide]);

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
                <Link to={`/store/productdetail/${slideLinkName}`}>
                    <SlideImg src={slideImgSrc} />
                </Link>

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
