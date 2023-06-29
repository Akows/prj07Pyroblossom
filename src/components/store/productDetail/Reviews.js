import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import star1img from '../../../assets/images/stars/Icon_1_Star.webp';
import star2img from '../../../assets/images/stars/Icon_2_Stars.webp';
import star3img from '../../../assets/images/stars/Icon_3_Stars.webp';
import star4img from '../../../assets/images/stars/Icon_4_Stars.webp';
import star5img from '../../../assets/images/stars/Icon_5_Stars.webp';

import { CreateReview, DeleteReview, GetProductInfo, ReadReview } from '../../../redux/actions/storeAction';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    margin: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ReviewInfo = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ReviewList = styled.div`
    width: 90%;
    height: 50%;

    margin-top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

`;

const FontB = styled.b`
    color: blue;
`;

const ReviewInfoTitle = styled.div`
    width: 90%;
    height: 20%;

    font-size: 18px;
    color: #D3BC8E;
    margin-bottom: 3px;

    & > p:nth-child(1) {
        font-size: 32px;
        margin-bottom: 10px;
    };
`;
const ReviewInfoScore = styled.div`
    width: 95%;
    height: 80%;

    margin-top: 30px;

    border-top: 2px solid gray;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ReviewInfoGrade = styled.div`
    width: 33%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    color: #D3BC8E;

    & > p:nth-child(1) {
        font-size: 24px;
    };
    & > p:nth-child(2) {
        margin-top: 10px;
    };
`;
const ReviewInfoReviewNumber = styled.div`
    width: 33%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    color: #D3BC8E;

    & > p:nth-child(1) {
        font-size: 24px;
    };
    & > p:nth-child(2) {
        margin-top: 10px;
    };
`;

const ReviewInfoAverage = styled.div`
    width: 33%;
    height: 120px;

    margin-top: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    color: #D3BC8E;

    & > p {
        margin-top: 10px;
    };
`;

const ReviewForm = styled.div`
    width: 95%;
    height: 80%;

    margin-top: 30px;

    border-top: 2px solid gray;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > select {
        width: 10%;
        height: 30px;

        margin-top: 10px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        background-color: white;
        border-radius: 5px;
        border: none;

    };

    & > input {
        width: 100%;
        height: 30px;

        font-family: 'GIFont';
        font-size: 16px;
        color: black;

        margin-top: 10px;

        background-color: #aaaaaa;
        border-radius: 5px;
        border: none;
    };

    & > button {
        width: 120px;
        height: 30px;

        margin-top: 10px;

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


const Review = styled.div`
    width: 80%;
    height: 150px;

    color: #D3BC8E;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
`;

const UserPic = styled.div`
    width: 8%;
    height: 100%;
`;
const UserReviewInfo = styled.div`
    width: 92%;
    height: 100%;
`;


const UserScore = styled.div`
    width: 100%;
    height: 10%;

    margin-top: 3px;
    margin-bottom: 3px;
`;
const UserInfo = styled.div`
    width: 100%;
    height: 10%;

    margin-top: 3px;
    margin-bottom: 3px;
`;
const UserProductInfo = styled.div`
    width: 100%;
    height: 10%;

    margin-top: 3px;
    margin-bottom: 3px;
`;
const UserReview = styled.div`
    width: 100%;
    height: 70%;
    
    margin-top: 3px;
    margin-bottom: 3px;
`;


export const Reviews = ({ userData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getStoreState = useSelector((state) => state.store);

    const [isLoading, setIsLoading] = useState(false);

    const [productData, setProductData] = useState({});
    const [reviewData, setReviewData] = useState([]);

    const [inputData, setInputData] = useState({
        inputTitle: '',
        inputText: '',
        inputScore: 5,
    });

    const onChangeInputData = (event) => {
        setInputData({ ...inputData, [event.target.id]: event.target.value });
    };

    const onCreateReviewAndQnA = () => {
        if (userData.userdata.email) {
            const confirmChoice = window.confirm('리뷰를 작성하시겠습니까?');

            if (!confirmChoice) {
                return;
            }
            else {
                dispatch(CreateReview(inputData, userData.userdata, productData, navigate));
            };

        }
        else {
            alert('리뷰 작성은 회원만 가능합니다.');
        };
    };

    const onDelete = (docNumber, productData, userData) => {
        const confirmChoice = window.confirm('리뷰를 삭제하시겠습니까?');

        if (!confirmChoice) {
            return;
        }
        else {
            dispatch(DeleteReview(docNumber, productData, userData));
        };
    };

    useEffect(() => {
        dispatch(ReadReview(navigate));
    }, []);

    useEffect(() => {
        if (getStoreState.reviewData.length === 0) {
            setReviewData([]);
        }
        else {
            setReviewData(getStoreState.reviewData);
        };
    }, [getStoreState.reviewData]);

    useEffect(() => {
        setProductData(getStoreState.processInfo.processData2[0]);
    }, [getStoreState.processInfo]);

    useEffect(() => {
        setIsLoading(getStoreState.flagValue.isLoading);
    }, [getStoreState.flagValue]);

    useEffect(() => {
        dispatch(ReadReview(getStoreState.processInfo.processData2[0], navigate));
    }, [getStoreState.flagValue.isRendering]);

    return (
        <BackGround>
            <ReviewInfo>
                <ReviewInfoTitle>
                    <p>상품리뷰</p>
                    <p>상품을 구매하신 분들이 남긴 리뷰입니다.</p>

                    {productData?.eventType === '리뷰 이벤트' &&
                        <>
                            <p>리뷰 작성시 다음과 같은 해택이 제공됩니다.</p>
                            <p>리뷰 작성 이벤트 포인트 : <FontB>{productData?.eventPoint}p</FontB></p>
                        </>
                    }

                </ReviewInfoTitle>
                <ReviewInfoScore>
                    <ReviewInfoGrade>
                        <p>별점 평균</p>
                        <p>{productData?.productScore} / 5</p>
                    </ReviewInfoGrade>
                    <ReviewInfoReviewNumber>
                        <p>리뷰 숫자</p>
                        <p>{productData?.productReviews}</p>
                    </ReviewInfoReviewNumber>
                    {/* <ReviewInfoAverage>
                        <p>5점 : 1235</p>
                        <p>4점 : 787</p>
                        <p>3점 : 34</p>
                        <p>2점 : 34</p>
                        <p>1점 : 1</p>
                    </ReviewInfoAverage> */}
                </ReviewInfoScore>

                <ReviewForm>
                    <select id='inputScore' onChange={onChangeInputData} required>
                        <option value='5'>5점</option>
                        <option value='4'>4점</option>
                        <option value='3'>3점</option>
                        <option value='2'>2점</option>
                        <option value='1'>1점</option>
                    </select>

                    <input id='inputTitle' onChange={onChangeInputData} type='text' placeholder='제목을 입력해주세요.' required />
                    <input id='inputText' onChange={onChangeInputData} type='text' placeholder='내용을 입력해주세요.' required />

                    <button onClick={() => onCreateReviewAndQnA()}>리뷰 작성하기</button>
                </ReviewForm>

            </ReviewInfo>

            <ReviewList>

                {reviewData?.length === 0 && '리뷰가 존재하지 않습니다.'}

                {reviewData?.map((item) => (
                    <Review key={item.docNumber}>
                        <UserPic>
                            사진
                        </UserPic>

                        <UserReviewInfo>
                            <UserScore>
                                <img src={star5img} alt=''></img>
                            </UserScore>
                            <UserInfo>
                                {item.writer} | 23.01.31
                            </UserInfo>
                            <UserProductInfo>
                                통통폭탄인형
                            </UserProductInfo>

                            <p onClick={() => onDelete(item, getStoreState.processInfo.processData2[0], userData.userdata)}>X</p>

                            <hr />

                            <UserReview>
                                {item.title}
                            </UserReview>
                        </UserReviewInfo>
                    </Review>
                ))}

            </ReviewList>
        </BackGround>
    );
};
