import React, { useState } from 'react'
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';

// UI 기믹.
// 1200px 이하에서는 BackGround 너비가 90%로 
// 1000px 이하에서는 기능 메뉴 버튼의 크기가 축소. 
// 700px 이하에서는 모든 메뉴가 사라지고, 대신 드랍다운 메뉴가 등장.
// BackGround와 각 버튼 크기가 변화할 때마다 부드러운 애니매이션 효과가 적용.

// 커서가 상단 메뉴바에 올라갈 경우 바 높이가 50px에서 80px로 확장, opacity: 0.9에서 1로 변경.
const BackGround = styled.div`
    width: 1200px;
    height: 50px;

    position: fixed;
    top: 0;

    z-index: 999;

    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: gray;
    opacity: 0.9;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    &:hover{  
        height: 80px;

        opacity: 1;

        transform: translate3d(0, 0, 100%);
        transition: all 1s ease;
    }

    @media screen and (max-width: 1200px) {
        width: 90%;
    }
`;

const NavArea = styled.div`
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const TitleAndMenuArea = styled(NavArea)`
    width: 100%;
    display: none;

    @media screen and (max-width: 700px) {
        display: block;
    }
`;

const TitleArea = styled(NavArea)`
    width: 25%;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;
const MenuArea = styled(NavArea)`
    width: 65%;
    justify-content: flex-start;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;
const UserArea = styled(NavArea)`
    width: 10%;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

const Menus = styled.div`
    height: 100%;

    & > a {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    &:hover{  
        transform: translate3d(0, 0, 100%);
        transition: all 1s ease;
    }
`;
const DropDownMenu = styled(Menus)`
    width: 100%;
`;
const DownMenuIcon = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const DownMenuTitle = styled.div`
    width: 100%;
    height: 50px;

    padding: 5px 5px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background-color: gray;

    & > div {
        display: block; 
        top: 50px;
    };
`;
const DownMenu = styled.div`
    width: 100%;
    height: 90px;

    display: none; 
    position: absolute; 

    background-color: gray;

    & > a { 
        width: 100%;
        height: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    };
`;

const Menu1 = styled(Menus)`
    width: 100%;
`;
const Menu2 = styled(Menus)`
    width: 150px;

    @media screen and (max-width: 1000px) {
        width: 120px;
    }
`;
const Menu3 = styled(Menus)`
    width: 120px;
`;


export const Navigation = () => {

    const [isHovering, setIsHovering] = useState(0);

    const [isClick, setIsClick] = useState(true);

    return (
        <BackGround>

            <TitleAndMenuArea
                onClick={() => setIsClick(!isClick)}
            >
                <DropDownMenu>
                    {isClick ?
                        <>
                            <DownMenuIcon>
                                <AiOutlinePicCenter size={30} />
                            </DownMenuIcon>

                            <DownMenuTitle
                                onClick={(event) => event.stopPropagation()}
                            >
                                서브메뉴제목
                                <DownMenu>
                                    <Link to='/'>
                                        서브메뉴1
                                    </Link>
                                    <Link to='/'>
                                        서브메뉴2
                                    </Link>
                                    <Link to='/'>
                                        서브메뉴3
                                    </Link>
                                </DownMenu>
                            </DownMenuTitle>
                        </>
                        :
                        <DownMenuIcon>
                            <AiOutlineMenu size={30} />
                        </DownMenuIcon>
                    }
                </DropDownMenu>
            </TitleAndMenuArea>

            <TitleArea>
                <Menu1>
                    <Link to='/'>로고</Link>
                </Menu1>
            </TitleArea>

            <MenuArea>
                <Menu2>
                    <Link to='/'>기능1</Link>
                </Menu2>
                <Menu2>
                    <Link to='/'>기능2</Link>
                </Menu2>
                <Menu2>
                    <Link to='/'>기능3</Link>
                </Menu2>
            </MenuArea>

            <UserArea
            // onMouseOver={() => setIsHovering(1)}
            // onMouseOut={() => setIsHovering(0)}


            >
                <Menu3>

                    <DownMenuTitle
                        onMouseOver={() => setIsHovering(1)}
                        onMouseOut={() => setIsHovering(0)}
                    >




                    </DownMenuTitle>


                    {/* {isHovering ?
                        <>
                            <AiOutlinePicCenter size={30} />

                            <DownMenuTitle>
                                <div>
                                    <AiOutlinePicCenter size={30} />
                                </div>

                                {isClick ?
                                    <>
                                        ok
                                    </>
                                    :
                                    <>
                                        nok
                                    </>
                                }


                                <DownMenu>
                                    <Link to='/'>
                                        서브메뉴1
                                    </Link>
                                    <Link to='/'>
                                        서브메뉴2
                                    </Link>
                                    <Link to='/'>
                                        서브메뉴3
                                    </Link>
                                </DownMenu>

                            </DownMenuTitle>
                        </>
                        :
                        <>
                            <AiOutlineMenu size={30} />

                            <DownMenuTitle>
                                <AiOutlineMenu size={30} />
                            </DownMenuTitle>
                        </>

                    } */}

                </Menu3>
            </UserArea>
        </BackGround>
    );
};
