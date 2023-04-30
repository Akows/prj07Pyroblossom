import React, { useCallback, useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// import { logIn, logOut } from '../redux/actions/userAction'

const IndexBackGround = styled.div`
    width: 1200px;
    height: 100%;

    background-color: antiquewhite;

    font-size: 72px;
    font-weight: 500;

    @media screen and (max-width: 1200px) {
        width: 95%;
        background-color: red;
    }
`;

const Back = styled.div`
    background: black;
    height: 6000px;
`;

const Div = styled.div`
    height: 700px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    color: white;

    opacity: 0;
    transition: all 0.5s;
    transform: rotate(-180deg);

    border: 1px solid wheat;
`;


export const Index = () => {




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
                    item.target.style.transform = 'rotate(0deg)';
                }
                else {
                    item.target.style.opacity = 0.3;
                    item.target.style.transform = 'rotate(180deg)';
                }

                console.log(item.intersectionRatio);
            });
        }, { threshold: 0.8 });

        for (let index = 0; index < refs.current.children.length; index++) {
            observer.current.observe(refs.current.children[index]);
        }

        console.log(observer.current);

        return () => {

        }
    }, [])




    const ref = useCallback(node => {

        if (observer.current)
            observer.current.disconnect();

        // IntersectionObserver가 수행할 동작을 작성.
        observer.current = new IntersectionObserver(entries => {

            entries.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.style.opacity = 1;
                    item.target.style.transform = 'rotate(0deg)';
                }
                else {
                    item.target.style.opacity = 0;
                    item.target.style.transform = 'rotate(720deg)';
                }

                console.log(item.intersectionRatio);
            });

            // if (entries[0].isIntersecting) {
            //     console.log(entries);
            // }
        });

        // DOM으로 제어된 HTML Element를 observe.
        if (node) {

            for (let index = 0; index < node.children.length; index++) {
                observer.current.observe(node.children[index]);
            }



            // console.log(node.children);

            // observer.current.observe(node);
        };

    }, [])


    return (
        <>
            <IndexBackGround>

            </IndexBackGround>

            <Back ref={refs}>
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
            </Back>
        </>
    )
}
