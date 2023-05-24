import React, { useState } from 'react'
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userAction';

import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from "react-icons/fi";

import TitleIMGsrc from '../assets/images/Genshin-Impact-LogoW.png';

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

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    @media screen and (max-width: 1200px) {
        width: 90%;
    }

    @media screen and (max-width: 700px) {
        height: 120px;
    }

`;
const MainNav = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 10px 10px 0px 0px;

    background-color: #2A2732;
`;
const SearchNav = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 0px 0px 10px 10px;

    background-color: #2A2732;
`;

const SearchBarArea = styled.div`
    width: 85%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: #D3BC8E;
`;
const MyShoppingArea = styled.div`
    width: 15%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
    width: 50%;
    height: 100%;

    font-family: 'GIFont';
    font-size: 16px;
    color: black;

    background-color: #aaaaaa;

    border-radius: 5px;

    border: none;
`;
const SearchButton = styled.button`
    width: 10%;
    height: 80%;

    margin-left: 10px;

    border: 2px solid #535B6C;
    border-radius: 25px;
    background-color: #50596B;

    & > a {
        font-family: 'GIFont';
        font-size: 16px;
        color: #ECE5D8;
    }
`;

const MyShoppingButton = styled.button`
    width: 80%;
    height: 80%;

    border: 2px solid #535B6C;
    border-radius: 25px;
    background-color: #50596B;

    & > a {
        font-family: 'GIFont';
        font-size: 16px;
        color: #ECE5D8;
    }
`;

const CategoryList = styled.div`
    width: 100%;
    height: 100%;

    top: 100px;
    left: 0;

    position: absolute;

    border-radius: 5px 5px 10px 10px;

    display: ${(props) => props.isCategoryShow ? 'block' : 'none'};

    background-color: #dcdcdc;
    animation: opacity0to1 0.6s ease-in;

    @keyframes opacity0to1 {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    };
    };
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

        color: #D3BC8E;
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

    background-image: url(${TitleIMGsrc});
    background-size: 90px 60px;
    background-position: center;
    background-repeat: no-repeat;

    padding: 5px 5px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    background-color: #dcdcdc;
    opacity: 1;

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

    background-color: #dcdcdc;

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

const TitleImage = styled(Menus)`
    width: 100%;
    
    background-image: url(${TitleIMGsrc});
    background-size: 90px 60px;
    background-position: center;
    background-repeat: no-repeat;
`;
const TitleImageSmall = styled(Menus)`
    width: 100%;

    background-image: url(${TitleIMGsrc});
    background-size: 90px 55px;
    background-position: center;
    background-repeat: no-repeat;
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
    const [isCategoryShow, setIsCategoryShow] = useState(false);

    const logOuts = () => {
        const logOutChoice = window.confirm('로그아웃 하시겠어요?');

        if (!logOutChoice) {
            return;
        }
        else {
            dispatch(logOut(navigate));
        };
    };

    const onShowCategoryList = () => {
        setIsCategoryShow(!isCategoryShow);
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
                                    <TitleImage>
                                        <Link to='/'></Link>
                                    </TitleImage>
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
                    <TitleImageSmall>
                        <Link to='/'></Link>
                    </TitleImageSmall>
                </TitleArea>

                <MenuArea>
                    <Menu2>
                        <Link to='/store'>굿즈스토어</Link>
                    </Menu2>
                    <Menu2>
                        <Link to='/'>원신 DB</Link>
                    </Menu2>
                    <Menu2>
                        <Link to='/'>자유게시판</Link>
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
                    <CategoryButton onClick={onShowCategoryList}>
                        <AiOutlineMenu size={30} />
                    </CategoryButton>

                    <CategoryList isCategoryShow={isCategoryShow}></CategoryList>

                    <SearchBar>
                        <SearchInput />
                        <SearchButton>
                            <Link to='/store/productlist'>검색</Link>
                        </SearchButton>
                    </SearchBar>
                </SearchBarArea>

                <MyShoppingArea>
                    <MyShoppingButton>
                        <Link to='/store/mypage'>마이페이지</Link>
                    </MyShoppingButton>
                </MyShoppingArea>

            </SearchNav>

        </BackGround>
    );
};
