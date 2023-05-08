import React, { useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Navigation } from '../components/Navigation';

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
    height: 700px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    color: white;

    opacity: 0.3;
    transition: all 0.5s;

    border: 1px solid wheat;
`;


export const Main = () => {




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



        for (let index = 0; index < refs.current.children.length; index++) {
            observer.current.observe(refs.current.children[index]);
        }

        // console.log(observer.current);

        return () => {

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
            <Navigation />

            <BackGround ref={refs}>
                <Div>
                    <h1>텍스트1</h1>
                </Div>
                <Div>
                    <h1>텍스트2</h1>
                </Div>
                <Div>
                    <h1>텍스트3</h1>
                </Div>
                <Div>
                    <h1>텍스트4</h1>
                </Div>
                <Div>
                    <h1>텍스트5</h1>
                </Div>
            </BackGround>
        </>
    );
};
