import React, { useState } from 'react'
import styled from 'styled-components';
import '../assets/animation.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/userAction';

import { AiOutlineUser, AiOutlineMenu, AiOutlinePicCenter } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { BiCategory, BiCategoryAlt } from 'react-icons/bi';

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
    height: 40%;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 10px 10px 0px 0px;

    background-color: #2A2732;
`;
const SearchNav = styled.div`
    width: 100%;
    height: 60%;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 0px 0px 10px 10px;

    background-color: #2A2732;
`;

const SearchBarArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: #D3BC8E;
`;


const CategoryButton = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 700px) {
        width: 10%;
    };
`;
const SearchBar = styled.div`
    width: 500px;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 700px) {
        width: 90%;
    };
`;
const SearchInput = styled.input`
    width: 80%;
    height: 80%;

    font-family: 'GIFont';
    font-size: 16px;
    color: black;

    background-color: #aaaaaa;

    border-radius: 5px;

    border: none;
`;
const SearchButton = styled.button`
    width: 20%;
    height: 80%;

    margin: 5px;

    border: 2px solid #535B6C;
    border-radius: 25px;
    background-color: #50596B;

    font-family: 'GIFont';
    font-size: 16px;
    color: #D3BC8E;
`;

const CategoryList = styled.div`
    width: 100%;
    height: 120px;

    top: 105px;
    left: 0;

    position: absolute;

    border-radius: 5px 5px 10px 10px;

    display: ${(props) => props.isCategoryShow ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #dcdcdc;
    animation: anime 0.6s ease-in;

    @keyframes anime {
        0% {
            opacity: 0;
            transform: translateY(-25%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        };
    };

    @media screen and (max-width: 700px) {
        top: 115px;
    }
`;

const KeywordButtonArea = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const KeywordButton = styled.button`
    width: 100px;
    height: 50px;

    margin: 2px;

    border: 2px solid #535B6C;
    border-radius: 15px;
    background-color: #50596B;
    font-family: 'GIFont';
    font-size: 16px;
    color: #D3BC8E;

    @media screen and (max-width: 420px) {
        font-size: 12px;
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

        color: #D3BC8E;
    }

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;
`;
const DropDownMenu = styled(Menus)`
    width: 100%;

    color: #D3BC8E;
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

    background-color: #2A2732;

    /* background-image: url(${TitleIMGsrc});
    background-size: 90px 60px;
    background-position: center;
    background-repeat: no-repeat; */

    /* padding: 5px 5px; */
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    /* background-color: #dcdcdc; */
    opacity: 1;

    animation: shortNavDropDownAni 0.7s ease-in;

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

    background-color: #2A2732;

    & > a { 
        width: 100%;
        height: 40px;

        color: #D3BC8E;

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

    background-color: #2A2732;

    background-image: url(${TitleIMGsrc});
    background-size: 90px 60px;
    background-position: center;
    background-repeat: no-repeat;
`;
const TitleImageSmall = styled(Menus)`
    width: 100%;

    background-color: #2A2732;

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

    & > a {
        border-radius: 100px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    };
    & > a:hover {
        background-color: gray;
    };
`;



export const StoreNavigation = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserState = useSelector((state) => state.user);

    const [isClick, setIsClick] = useState(false);
    const [isCategoryShow, setIsCategoryShow] = useState(false);

    const [searchKeyword, setSearchKeyword] = useState('');

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
        setIsClick(false);
    };

    const onChangeSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };

    const onSearch = (keyword) => {
        if (!searchKeyword) {
            alert('검색어를 입력해주세요.');
            return;
        };

        navigate(`/store/productlist/normal/${searchKeyword}`);
        setSearchKeyword('');
        setIsCategoryShow(false);
    };

    const onCategorySearch = (keyword) => {

        navigate(`/store/productlist/category/${keyword}`);
        setSearchKeyword('');
        setIsCategoryShow(false);
    };

    return (
        <BackGround>

            <MainNav>
                <TitleAndMenuArea
                    onClick={() => {
                        setIsClick(!isClick);
                        setIsCategoryShow(false);
                    }}
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
                                        <Link to='/store'>굿즈스토어</Link>
                                        {/* <Link to='/'>미구현</Link>
                                        <Link to='/freeboard'>로딩화면테스트</Link> */}

                                        {getUserState.flagvalue.isLogin ?
                                            <UserMenuSub>
                                                <Link to='/store/mypage'>
                                                    <AiOutlineUser size={40} color='#D3BC8E' />
                                                </Link>
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
                    {/* <Menu2>
                        <Link to='/'>미구현</Link>
                    </Menu2>
                    <Menu2>
                        <Link to='/freeboard'>로딩화면테스트</Link>
                    </Menu2> */}
                </MenuArea>

                <UserArea>
                    <Menu3>
                        {getUserState.flagvalue.isLogin ?
                            <>
                                <UserMenu>
                                    <Link to='/store/mypage'>
                                        <AiOutlineUser size={40} color='#D3BC8E' />
                                    </Link>
                                    <Link to=''>
                                        <FiLogOut onClick={logOuts} size={40} color='#D3BC8E' />
                                    </Link>
                                </UserMenu>
                            </>
                            :
                            <>
                                <UserMenu>
                                    <Link to='/user/login'>
                                        <FiLogIn size={30} />
                                    </Link>
                                </UserMenu>
                            </>
                        }
                    </Menu3>
                </UserArea>
            </MainNav>



            <SearchNav>
                <SearchBarArea>
                    <CategoryButton onClick={onShowCategoryList}>
                        {isCategoryShow && <BiCategoryAlt size={30} />}
                        {!isCategoryShow && <BiCategory size={30} />}
                    </CategoryButton>

                    <CategoryList isCategoryShow={isCategoryShow}>
                        <KeywordButtonArea>
                            <KeywordButton onClick={() => onCategorySearch('케이스')}>케이스</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('패드')}>패드</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('문구')}>문구</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('서적')}>서적</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('침구')}>침구</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('피규어')}>피규어</KeywordButton>
                            <KeywordButton onClick={() => onCategorySearch('인형')}>인형</KeywordButton>
                        </KeywordButtonArea>
                    </CategoryList>

                    <SearchBar>
                        <SearchInput type='text' value={searchKeyword} onChange={onChangeSearchKeyword} />
                        <SearchButton onClick={onSearch}>
                            검색
                        </SearchButton>
                    </SearchBar>

                </SearchBarArea>

            </SearchNav>

        </BackGround>
    );
};
