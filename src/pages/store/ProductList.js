import React from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import productimg from '../../assets/images/testImg/testproductimg.jpg';

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
    width: 15%;
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

export const ProductList = () => {

    const { searchtype } = useParams();
    const { keyword } = useParams();

    return (
        <BackGround>

            <ProductListTitle>
                입력하신 '{keyword}'에 대한 검색 결과입니다.
            </ProductListTitle>

            {searchtype === 'category' &&
                <ProductListButtonArea>
                    <CategoryButton>
                        <DropDownButton>
                            {keyword}
                        </DropDownButton>

                        {keyword === '서적' &&
                            <TypeButton>
                                <button>문화</button>
                                <button>시사</button>
                                <button>만화</button>
                                <button>소설</button>
                            </TypeButton>
                        }

                        {keyword === '인형' &&
                            <TypeButton>
                                <button>봉제인형</button>
                                <button>케릭터인형</button>
                                <button>패션인형</button>
                                <button>유아인형</button>
                            </TypeButton>
                        }

                    </CategoryButton>
                </ProductListButtonArea>
            }

            <ProductListArea>

                <ListType>
                    <p>인기도순</p>
                    <p>낮은 가격순</p>
                    <p>높은 가격순</p>
                    <p>리뷰 많은순</p>
                    <p>등록일 순</p>
                </ListType>

                <hr />

                <ProductLists>

                    <Product>
                        <ProductPic>
                            <img src={productimg} alt=''></img>
                        </ProductPic>

                        <ProductInfo>
                            <p>통통폭탄인형</p>
                            <p>30,000원 | 무료배송</p>
                            <p>인형 {'>'} 봉제인형</p>
                            <p>리뷰 2334 - 구매 12334 - 등록일 2023.03 - 찜하기 556</p>
                        </ProductInfo>


                    </Product>

                    <Product>
                        <ProductPic>
                            <img src={productimg} alt=''></img>
                        </ProductPic>

                        <ProductInfo>
                            <p>통통폭탄인형</p>
                            <p>30,000원 | 무료배송</p>
                            <p>인형 {'>'} 봉제인형</p>
                            <p>리뷰 2334 - 구매 12334 - 등록일 2023.03 - 찜하기 556</p>
                        </ProductInfo>
                    </Product>



                    <Product>
                        <ProductPic>
                            <img src={productimg} alt=''></img>
                        </ProductPic>

                        <ProductInfo>
                            <p>통통폭탄인형</p>
                            <p>30,000원 | 무료배송</p>
                            <p>인형 {'>'} 봉제인형</p>
                            <p>리뷰 2334 - 구매 12334 - 등록일 2023.03 - 찜하기 556</p>
                        </ProductInfo>
                    </Product>



                </ProductLists>


            </ProductListArea>

        </BackGround>
    );
};