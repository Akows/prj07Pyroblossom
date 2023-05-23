import React, { useState } from 'react'
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userAction';

import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from "react-icons/fi";

const BackGround = styled.div`
    width: 1200px;
    height: 100px;

    position: fixed;
    top: 0;

    z-index: 999;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    opacity: 0.9;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 1200px) {
        width: 90%;
    }

    @media screen and (max-width: 700px) {
        height: 120px;
        opacity: 1;
    }

`;
const MainNav = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: gray;
`;
const SearchNav = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: blue;
`;

const SearchBarArea = styled.div`
    width: 85%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: wheat;
`;
const MyShoppingArea = styled.div`
    width: 15%;
    height: 100%;

    color: wheat;
`;

const CategoryButton = styled.div`
    width: 5%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const SearchBar = styled.div`
    width: 95%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
`;
const SearchInput = styled.input`
    width: 90%;
    height: 100%;
`;
const SearchButton = styled.button`
    width: 10%;
    height: 100%;
`;

const MyShoppingButton = styled.button`
    width: 100%;
    height: 100%;
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



export const StoreNavigation = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);

    const [isClick, setIsClick] = useState(false);

    const logOuts = () => {
        const logOutChoice = window.confirm('로그아웃 하시겠어요?');

        if (!logOutChoice) {
            return;
        }
        else {
            dispatch(logOut(navigate));
        };
    };


    return (
        <BackGround>

            <MainNav>
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

                                        {getUserState.flagvalue.isLogin ?
                                            <UserMenuSub>
                                                {getUserState.userdata.displayName === '관리자' ?
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
                        <Link to='/store'>굿즈스토어</Link>
                    </Menu2>
                    <Menu2>
                        <Link to='/'>메뉴2</Link>
                    </Menu2>
                    <Menu2>
                        <Link to='/'>메뉴3</Link>
                    </Menu2>
                </MenuArea>

                <UserArea>
                    <Menu3>
                        {getUserState.flagvalue.isLogin ?
                            <>
                                <UserMenu>
                                    {getUserState.userdata.displayName === 'Admin' ?
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
            </MainNav>



            <SearchNav>
                <SearchBarArea>
                    <CategoryButton>
                        <AiOutlineMenu size={30} />
                    </CategoryButton>

                    <SearchBar>
                        <SearchInput />
                        <SearchButton />
                    </SearchBar>
                </SearchBarArea>

                <MyShoppingArea>
                    <MyShoppingButton />
                </MyShoppingArea>

            </SearchNav>

        </BackGround>
    );
};
