import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/animation.css';

import Sildeshow from '../../components/SlideShow';

// import React, { useEffect, useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { Test1, Test2 } from '../../redux/actions/storeAction';

import BackgroundImagesrc from '../../assets/images/background/upLiyueport2.jpg';

import MainImagesrc from '../../assets/images/System_Shop.webp';
// import Sub1Imagesrc from '../../assets/images/character_eula_portrait.png';
import Sub2Imagesrc from '../../assets/images/Character_Klee_Full_Wish.webp';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductList, Test1 } from '../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
    z-index: 0;

    background-color: rgba( 65, 71, 89, 1 );
    background-attachment: fixed;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const BackGroundImage = styled.div`
    width: 100%;
    height: 500px;

    position: absolute;
    z-index: -100;

    background-image: url(${BackgroundImagesrc});
    background-size: 100% 100%;
    background-position: 0px 0px;
    background-repeat: no-repeat;
`

const InnerContents = styled.div`
    width: 1200px;
    height: 100%;

    z-index: 100;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 95%;
    };
`;

const StoreTitleArea = styled.div`
    width: 100%;
    height: 50px;

    margin-top: 120px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

`;
const StoreSlideShowArea = styled.div`
    width: 100%;
    height: 550px;

    margin-top: 0px;

    z-index: 3;
`;

const ProductDesc = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 42px;
    color: #D3BC8E;
`;


const StoreListArea = styled.div`
    width: 90%;
    height: 100%;

    margin-top: 80px;
    margin-bottom: 150px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    z-index: 3;
`;

const TitleMainImage = styled.div`
    width: 30%;
    height: 100%;

    z-index: 2;

    /* background-image: url(${MainImagesrc});
    background-size: 300px 300px;
    background-position: center;
    background-repeat: no-repeat; */

    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;
const TitleSub1Image = styled.div`
    width: 35%;
    height: 100%;

    @media screen and (max-width: 1000px) {
        width: 0%;
    }
`;
const TitleSub2Image = styled.div`
    width: 35%;
    height: 100%;

    margin-top: 1200px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 1;

    & > img {
        width: 630px;
        height: 850px;

        opacity: 0.7;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;

        animation: storeSubImageAni 1s ease-in;
    }

    @media screen and (max-width: 1000px) {
        width: 0%;
        display: none;
    }
`;

const Product = styled.div`
    width: 300px;
    height: 550px;

    margin: 15px;

    margin-bottom: 10px;

    &:hover {
        background-color: gray;
        opacity: 0.8;
    };
`;
const ProductImg = styled.div`
    width: 100%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    opacity: ${(props) => props.isSale ? '0.3' : '1'};

    & > img {
        width: 100%;
        height: 330px;
    };
`;
const ProductTitle = styled.div`
    width: 100%;
    height: 40%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    & > div:nth-child(2) {
        
    };
    & > p:nth-child(3) {
        margin-top: 15px;
        font-size: 32px;
    };
`;

const ProductName = styled.div`
    width: 100%;
    height: 50%;

    line-height: 1.3;

    text-align: center;

    font-size: 24px;
    color: #D3BC8E;

    text-decoration: ${(props) => props.isSale ? 'line-through' : 'none'};
`;

const SoldOutMsg = styled.p`
    font-size: 18px;
    color: red;
`;
const SaleMsg = styled.p`
    font-size: 18px;
    color: green;
`;

export const StoreMain = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [listData, setListData] = useState([]);
    const [slideListData, setSlideListData] = useState([]);

    // 무한 스크롤 사용 중단으로 아래 변수는 일시 미사용.
    // eslint-disable-next-line
    const [listLast, setListLast] = useState();
    // eslint-disable-next-line
    const [indexLast, setLndexLast] = useState();
    // eslint-disable-next-line
    const [isDataLast, setIsDataLast] = useState(false);

    const observer = useRef();
    const deepPoint = useRef();

    useEffect(() => {
        dispatch(GetProductList('commonusergetproduct', 9, ''));

        observer.current = new IntersectionObserver(entries => {
            entries.forEach((item) => {
                if (item.isIntersecting) {

                    if (!isDataLast) {
                        // console.log('데이터 불러오기');
                        // dispatch(GetProductList('next', 1, ''));
                    }
                    else {

                    };
                }
                else {

                };
            });
        }, { threshold: 1 });

        observer.current.observe(deepPoint.current);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (setSlideListData.length !== 0) {
            setSlideListData(getStoreState.processInfo.processData2);
        };

        // if (!listLast && !indexLast) {
        //     setListLast(getStoreState.processInfo.processData1.lastOfPage);
        //     setLndexLast(getStoreState.processInfo.processData1.lastOfAllList);
        // };

        if (getStoreState.processInfo.processData1 !== '' || getStoreState.processInfo.processData2 !== '') {

            // let newData = {};
            // getStoreState.processInfo.processData2.map((item) => {
            //     newData = Object.assign(item);
            //     setListData([...listData, newData]);
            // });

            setListData(getStoreState.processInfo.processData2);
        };
    }, [getStoreState.processInfo]);

    // useEffect(() => {
    //     if (listLast && indexLast) {
    //         const check = listLast.data().number === indexLast.data().number;

    //         if (check) {
    //             console.log('마지막 데이터에 도달함.');
    //             setIsDataLast(true);
    //         }
    //         else {
    //             console.log('마지막 데이터에 도달하지 않음.');
    //             setIsDataLast(false);
    //         };
    //     };
    // }, [listLast, indexLast]);
    return (
        <BackGround>

            <BackGroundImage />

            <InnerContents>

                <StoreTitleArea>
                    <TitleSub1Image>
                        {/* <img src={Sub1Imagesrc} alt=''></img> */}
                    </TitleSub1Image>
                    <TitleMainImage>

                    </TitleMainImage>
                    <TitleSub2Image>
                        <img src={Sub2Imagesrc} alt=''></img>
                    </TitleSub2Image>

                </StoreTitleArea>

                <br /><br /><br /><br /><br /><br /><br /><br />

                <ProductDesc>오늘의 상품</ProductDesc>

                <StoreSlideShowArea>
                    <Sildeshow listData={slideListData} />
                </StoreSlideShowArea>

                <br /><br /><br /><br />

                <ProductDesc>신상품</ProductDesc>

                <StoreListArea>

                    {listData?.length === 0 && '제품 정보가 존재하지 않습니다.'}

                    {listData?.map(item => (
                        <Product key={item.number} onClick={() => navigate(`/store/productdetail/${item.name}`)}>
                            <ProductImg isSale={item.inventory <= 0}>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsImage%2F${item.name}%2F${item.productInformationFile?.titleimage}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />
                            </ProductImg>

                            <hr />

                            <ProductTitle>

                                <ProductName isSale={item.inventory <= 0}>
                                    {item.name}
                                </ProductName>

                                <div>
                                    {item.inventory <= 0 ?
                                        <SoldOutMsg>품절</SoldOutMsg>
                                        :
                                        <SaleMsg>판매중</SaleMsg>
                                    }
                                </div>

                                <p>{item.price.toLocaleString()}원</p>

                            </ProductTitle>
                        </Product>
                    ))}

                </StoreListArea>

                <p ref={deepPoint}></p>

            </InnerContents>
        </BackGround>
    );
};
