import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import productimg from '../../assets/images/testImg/testproductimg.jpg';
import { Loading } from '../../components/Loading';
import { GetSearchProductList, GetSearchSubCategoryProductList } from '../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba( 65, 71, 89, 1 );
`;

const ProductListTitle = styled.div`
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: #D3BC8E;

    margin-top: 120px;
    margin-bottom: 30px;
`;
const ProductListButtonArea = styled.div`
    width: 90%;
    height: 50px;

    margin-bottom: 30px;
`;

const CategoryButton = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const DropDownButton = styled.div`
    width: 35%;
    height: 100%;

    font-size: 32px;
    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid gray;
`;
const TypeButton = styled.div`
    width: 85%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > button {
        border: none;
        background-color: rgba( 65, 71, 89, 1 );

        font-family: 'GIfont';
        font-size: 18px;
        color: #D3BC8E;
    };
    & > button:hover {
        opacity: 0.8;
    };
`;





const ProductListArea = styled.div`
    width: 90%;
    height: 100%;

`;

const ListType = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > p {
        width: 120px;
        height: 50px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-size: 18px;
        color: #D3BC8E;

        margin: 3px;

        border: 2px solid gray;

        @media screen and (max-width: 550px) {
            font-size: 15px;
        };
        @media screen and (max-width: 450px) {
            font-size: 13px;
        };
    };
    & > p:hover {
        opacity: 0.7;
    };
`;
const ProductLists = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const Product = styled.div`
    width: 100%;
    height: 150px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    border-bottom: 1px solid gray;

    margin-bottom: 10px;

    @media screen and (max-width: 700px) {
        height: 100%;

        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
`;

const ProductPic = styled.div`
    width: 150px;
    height: 100%;

    margin-bottom: 10px;

    & > img {
        width: 100%;
        height: 100%;
    };

    @media screen and (max-width: 700px) {
        height: 150px;
    }
`;
const ProductInfo = styled.div`
    width: 500px;
    height: 100%;

    font-size: 18px;
    color: #D3BC8E;

    margin-bottom: 10px;

    & > p {
        width: 100%;
        margin: 3px;
    }; 

    & > p:nth-child(1) {
        font-size: 24px;
    };
    & > p:nth-child(2) {
        color: black;
    };
    & > p:nth-child(3) {
        color: black;
    };
    & > p:nth-child(4) {
        margin-top: 55px;
        color: black;

        @media screen and (max-width: 700px) {
            margin-top: 15px;
        };
    };

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

const UtilButton = styled.div`
    width: 100%;
    height: 100%;

    margin-top: 10px;
    padding: 10px;

    border: 1px solid gray;
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    };
    & > div > input {
        width: 20px;
        height: 20px;
    };

    & > button {
        width: 100px;
        height: 30px;

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

    & > input {
        width: 400px;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;

        @media screen and (max-width: 600px) {
            width: 70%;
        };
    };
`;

export const ProductList = () => {

    const dispatch = useDispatch();
    const getStoreState = useSelector((state) => state.store);

    const { searchtype } = useParams(); // 일반 검색시에는 keywordSearch, 카테고리 검색은 category.
    const { keyword } = useParams(); // 일반 검색시에는 검색값, 카테고리 검색은 카테고리 이름.
    const [sortCondition, setSortCondition] = useState('인기도순');

    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isDataFirst, setIsDataFirst] = useState(false);
    const [isDataLast, setIsDataLast] = useState(false);

    const subCategorySearch = (keyword) => {
        dispatch(GetSearchSubCategoryProductList('categorySearch', 10, keyword, sortCondition));
    };

    const prevPage = () => {

    };
    const nextPage = () => {

    };


    useEffect(() => {
        // 키워드 검색 기능.
        if (searchtype === 'keywordSearch') {
            dispatch(GetSearchProductList('keywordSearch', 10, keyword, sortCondition));
        }
        // 카테고리 검색 기능.
        else if (searchtype === 'categorySearch') {
            dispatch(GetSearchProductList('categorySearch', 10, keyword, sortCondition));
        }
        // eslint-disable-next-line
    }, [searchtype, keyword, sortCondition]);

    useEffect(() => {
        setIsLoading(getStoreState.flagValue.isLoading);
    }, [getStoreState.flagValue]);

    useEffect(() => {
        if (getStoreState.processInfo.processData2 !== '') {
            setListData(getStoreState.processInfo.processData2);

            const firstItem = getStoreState.processInfo.processData1.firstOfPage;
            const lastItem = getStoreState.processInfo.processData1.lastOfPage;
            const firstIndex = getStoreState.processInfo.processData1.firstOfAllList;
            const lastIndex = getStoreState.processInfo.processData1.lastOfAllList;

            if (firstItem?.data().number === firstIndex?.data().number) {
                setIsDataFirst(true);
            }
            else {
                setIsDataFirst(false);
            };

            if (lastItem?.data().number === lastIndex?.data().number) {
                setIsDataLast(true);
            }
            else {
                setIsDataLast(false);
            };
        };
    }, [getStoreState.processInfo]);

    return (
        <BackGround>

            {isLoading && <Loading />}

            <ProductListTitle>
                '{keyword}'에 대한 검색 결과입니다.
            </ProductListTitle>

            {searchtype === 'categorySearch' &&
                <ProductListButtonArea>
                    <CategoryButton>
                        <DropDownButton>
                            {keyword}
                        </DropDownButton>

                        {keyword === '인형, 피규어' &&
                            <TypeButton>
                                <button onClick={() => subCategorySearch('인형')}>인형</button>
                                <button onClick={() => subCategorySearch('피규어')}>피규어</button>
                            </TypeButton>
                        }

                        {keyword === '문구잡화' &&
                            <TypeButton>
                                <button onClick={() => subCategorySearch('마우스패드')}>마우스패드</button>
                                <button onClick={() => subCategorySearch('아크릴스탠드')}>아크릴스탠드</button>
                                <button onClick={() => subCategorySearch('열쇠고리')}>열쇠고리</button>
                            </TypeButton>
                        }

                        {keyword === '기타잡화' &&
                            <TypeButton>
                                <button onClick={() => subCategorySearch('의류')}>의류</button>
                                <button onClick={() => subCategorySearch('식품')}>식품</button>
                            </TypeButton>
                        }

                        {keyword === '도서, 음반' &&
                            <TypeButton>
                                <button onClick={() => subCategorySearch('도서')}>도서</button>
                                <button onClick={() => subCategorySearch('음반')}>음반</button>
                            </TypeButton>
                        }
                    </CategoryButton>
                </ProductListButtonArea>
            }

            <ProductListArea>

                <ListType>
                    <p onClick={() => setSortCondition('인기도순')}>인기도순</p>
                    <p onClick={() => setSortCondition('낮은 가격순')}>낮은 가격순</p>
                    <p onClick={() => setSortCondition('높은 가격순')}>높은 가격순</p>
                    <p onClick={() => setSortCondition('리뷰 많은순')}>리뷰 많은순</p>
                    <p onClick={() => setSortCondition('등록일 순')}>등록일 순</p>
                </ListType>

                <hr />

                <ProductLists>

                    {listData.map((item) => (
                        <Product key={item.number}>
                            <ProductPic>
                                <img src={productimg} alt=''></img>
                            </ProductPic>

                            <ProductInfo>
                                <p>{item.name}</p>
                                <p>{item.price}원 | {item.deliveryFee !== 0 ? `${item.deliveryFee}원` : '무료배송'}</p>
                                <p>{item.mainCategory} {'>'} {item.subCategory}</p>
                                {/* <p>리뷰 2334 - 구매 12334 - 등록일 2023.03 - 찜하기 556</p> */}
                            </ProductInfo>
                        </Product>
                    ))}
                </ProductLists>


            </ProductListArea>

            <UtilButton>
                {isDataFirst ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => prevPage()}>{'<'}-</button>
                }

                {isDataLast ?
                    <button>페이지 끝</button>
                    :
                    <button onClick={() => nextPage()}>-{'>'}</button>
                }
            </UtilButton>

        </BackGround>
    );
};