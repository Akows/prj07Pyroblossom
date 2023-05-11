import React, { useState } from 'react'
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userAction';

import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';

import { FiLogIn, FiLogOut } from "react-icons/fi";

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

    // 700px 이하에서 등장하는 드롭다운 메뉴는 hover 효과가 발동되지 않도록 높이를 80px로 고정.
    @media screen and (max-width: 700px) {
        height: 80px;
        opacity: 1;
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
    width: 60%;
    justify-content: flex-start;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;
const UserArea = styled(NavArea)`
    width: 15%;

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

    animation: dropdown30 0.7s ease;

    & > div {
        display: block; 
        top: 50px;
    };
`;
const DownMenu = styled.div`
    width: 100%;
    height: 160px;

    display: none; 
    position: absolute; 

    background-color: gray;

    & > a { 
        width: 100%;
        height: 40px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    };
`;
const UserMenuSub = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const Menu1 = styled(Menus)`
    width: 100%;

    & > a { 
        color: green;
    };
`;
const Menu2 = styled(Menus)`
    width: 150px;

    @media screen and (max-width: 1000px) {
        width: 120px;
    }
`;
const Menu3 = styled(Menus)`
    width: 100%;
`;

const UserMenu = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;


export const Navigation = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserData = useSelector((state) => state.user);

    // eslint-disable-next-line
    const [isHovering, setIsHovering] = useState(0);
    const [isClick, setIsClick] = useState(false);

    const logOuts = () => {
        const logOutChoice = window.confirm('로그아웃 하시겠어요?');

        if (!logOutChoice) {
            return;
        }
        else {
            dispatch(logOut(navigate));
            alert('로그아웃되었습니다. 방문해주셔서 감사합니다.');
            navigate('/', { replace: true });
        };
    };

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
                                Genshin Pyro Blossom
                                <DownMenu>
                                    <Link to='/'>
                                        메뉴1
                                    </Link>
                                    <Link to='/'>
                                        메뉴2
                                    </Link>
                                    <Link to='/'>
                                        메뉴3
                                    </Link>

                                    {getUserData.flagvalue.isLogin ?
                                        <UserMenuSub>
                                            {getUserData.logindata.displayName === '관리자' ?
                                                <Link to='user/adminpage'>
                                                    <AiOutlineUser size={40} />
                                                </Link>
                                                :
                                                <Link to='user/mypage'>
                                                    <AiOutlineUser size={40} />
                                                </Link>
                                            }
                                            <FiLogOut onClick={logOuts} size={40} />
                                        </UserMenuSub>
                                        :
                                        <>
                                            <Link to='/user/login'><FiLogIn size={30} /></Link>
                                        </>
                                    }
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
                    {getUserData.flagvalue.isLogin ?
                        <>
                            <UserMenu>
                                {getUserData.userdata.displayName === 'Admin' ?
                                    <>
                                        <Link to='/user/adminpage'>
                                            <AiOutlineUser size={40} />
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link to='/user/mypage'>
                                            <AiOutlineUser size={40} />
                                        </Link>
                                    </>
                                }
                                <FiLogOut onClick={logOuts} size={40} />
                            </UserMenu>
                        </>
                        :
                        <>
                            <Link to='/user/login'><FiLogIn size={30} /></Link>
                        </>
                    }
                </Menu3>
            </UserArea>
        </BackGround>
    );
};
