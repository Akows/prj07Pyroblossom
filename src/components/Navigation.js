import React, { useState } from 'react'
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';

// UI 기믹.
// 1200px 이하에서는 BackGround 너비가 90%로 
// 1000px 이하에서는 기능 메뉴 버튼의 크기가 축소. 
// 700px 이하에서는 로고 메뉴와 기능 메뉴가 사라지고 드랍다운 메뉴가 등장.
// BackGround와 각 버튼 크기가 변화할 때마다 부드러운 애니매이션 효과가 적용.

const BackGround = styled.div`
    width: 1200px;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: aquamarine;

    transform: translate3d(0, 0, 0);
    transition: all 1s ease;

    &:hover{  
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
    width: 90%;
    display: none;

    @media screen and (max-width: 700px) {
        display: block;
    }
`;

const TitleArea = styled(NavArea)`
    width: 30%;

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
    width: 10%;
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

    return (

        // Genshin Pyro Blossom
        // Menu1

        <BackGround>

            <TitleAndMenuArea>
                <DropDownMenu>
                    <Link to='/'>드랍다운메뉴</Link>
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
                onMouseOver={() => setIsHovering(1)}
                onMouseOut={() => setIsHovering(0)}
            >
                <Menu3>
                    <Link to='/'>
                        {isHovering ?
                            <AiOutlinePicCenter size={30} />
                            :
                            <AiOutlineMenu size={30} />
                        }
                    </Link>
                </Menu3>
            </UserArea>


        </BackGround>



    )
}
