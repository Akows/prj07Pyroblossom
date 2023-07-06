import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { logIn, logOut } from '../redux/actions/userAction'

const BackGround = styled.div`
    width: 1200px;
    height: 100%;

    background-color: black;

    margin-top: 50px;

    font-size: 36px;
    font-weight: 500;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 1200px) {
        width: 90.2%;
    }

    @media screen and (max-width: 700px) {
        margin-top: 80px;
    }
`;

const Div = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: white;

    opacity: 0.3;
    transition: all 0.5s;

    border: 1px solid wheat;

    & > p {
        margin: 15px;
        text-align: center;
    };
    
    & > p:nth-child(1) {
        font-size: 48px;
        margin-top: 250px;
        margin-bottom: 50px;
    };
    & > p:nth-child(4) {
        margin-bottom: 250px;
    };
`;

const ColorTextRed = styled.b`
    color: red;
`


export const Main = () => {
    // eslint-disable-next-line
    const dispatch = useDispatch();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = 'Genshin Fyro Blossom';
    });



    // const dispatch = useDispatch();

    // const onClick = useCallback(() => {
    //     dispatch(logIn({
    //         id: 'LEE',
    //         password: 'PWD',
    //     }));
    //     // eslint-disable-next-line    
    // }, []);

    // const onClick2 = useCallback(() => {
    //     dispatch(logOut());
    //     // eslint-disable-next-line    
    // }, []);

    const observer = useRef();

    const refs = useRef();

    useEffect(() => {

        // console.log(refs.current.children.length); // 5

        observer.current = new IntersectionObserver(entries => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.style.opacity = 1;
                }
                else {
                    item.target.style.opacity = 0.3;
                }

                // console.log(item.intersectionRatio);
            });
        }, { threshold: 0.8 });

        // console.log(observer.current);

        for (let index = 0; index < refs.current.children.length; index++) {
            observer.current.observe(refs.current.children[index]);
        }

    }, []);


    // const ref = useCallback(node => {

    //     if (observer.current)
    //         observer.current.disconnect();

    //     // IntersectionObserver가 수행할 동작을 작성.
    //     observer.current = new IntersectionObserver(entries => {

    //         entries.forEach((item) => {
    //             if (item.isIntersecting) {
    //                 item.target.style.opacity = 1;
    //                 item.target.style.transform = 'rotate(0deg)';
    //             }
    //             else {
    //                 item.target.style.opacity = 0;
    //                 item.target.style.transform = 'rotate(720deg)';
    //             }

    //             console.log(item.intersectionRatio);
    //         });

    //         // if (entries[0].isIntersecting) {
    //         //     console.log(entries);
    //         // }
    //     });

    //     // DOM으로 제어된 HTML Element를 observe.
    //     if (node) {

    //         for (let index = 0; index < node.children.length; index++) {
    //             observer.current.observe(node.children[index]);
    //         }



    //         // console.log(node.children);

    //         // observer.current.observe(node);
    //     };

    // }, []);

    return (
        <>
            <BackGround ref={refs}>
                <Div>

                    <p>프론트엔드 취업을 준비하는 이유승입니다!</p>
                    <p>본 프로젝트는 React.js, Redux를 중심으로</p>
                    <p>프론트엔드 기술을 연마하는 것을 목적으로 제작되었습니다.</p>
                    <p>백엔드 파트에는 구글 <ColorTextRed>파이어베이스</ColorTextRed>를 사용하였습니다!</p>

                </Div>
                <Div>

                    <p>프로젝트의 주요 기능 첫 번째.</p>

                    <p>회원 기능.</p>
                    <p>회원 가입, 로그인, 로그아웃, 회원정보 조회 및 수정, 회원탈퇴 기능을 구현하였습니다.</p>
                    <p>또한 각 단계에서 유효성 검사, 중복 검사, 필수 값 입력 검증 기능도 구현되어있습니다.</p>

                </Div>
                <Div>

                    <p>프로젝트의 주요 기능 두 번째.</p>

                    <p>굿즈 스토어.</p>
                    <p>제품 정보 등록, 조회, 수정, 삭제. 제품 정보의 검색, 카테고리 및 조건 정렬을 구현하였습니다.</p>
                    <p>또한 상품 옵션 선택과 구매, 사용자 리뷰 작성 및 삭제, 장바구니, 슬라이드쇼(버튼 이동 및 드래그/터치 이동), 포인트 적립 및 사용과 내역 조회, 결제 내역 조회 기능도 구현되어있습니다. </p>

                </Div>
            </BackGround>
        </>
    );
};
