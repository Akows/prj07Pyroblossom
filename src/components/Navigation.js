import React, { useState } from 'react'
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlinePicCenter } from 'react-icons/ai';

export const Navigation = () => {

    const [isHovering, setIsHovering] = useState(0);

    const BackGround = styled.div`
        width: 1200px;
        height: 80px;

        display: flex;
        flex-direction: row;
        align-items: center;

        background-color: aquamarine;

        @media screen and (max-width: 1200px) {
            width: 95%;
        }
    `;

    const NavArea = styled.div`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    `;

    const TitleArea = styled(NavArea)`
        width: 20%;
    `;
    const MenuArea = styled(NavArea)`
        width: 70%;
        justify-content: flex-start;
    `;
    const UserArea = styled(NavArea)`
        width: 10%;


        &:hover{  
            
        }
    `;

    const Menus = styled.div`
        width: 120px;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    `;

    const Menu1 = styled(Menus)`
        
    `;
    const Menu2 = styled(Menus)`
    
    `;
    const Menu3 = styled(Menus)`
    
    `;

    return (
        <BackGround>

            <NavArea>
                <TitleArea>
                    <Link to='/'>Genshin Pyro Blossom</Link>
                </TitleArea>
                <MenuArea>
                    <Menu1>
                        <Link to='/'>Menu1</Link>
                    </Menu1>
                    <Menu2>
                        <Link to='/'>Menu2</Link>
                    </Menu2>
                    <Menu3>
                        <Link to='/'>Menu3</Link>
                    </Menu3>
                </MenuArea>
                <UserArea
                    onMouseOver={() => setIsHovering(1)}
                    onMouseOut={() => setIsHovering(0)}
                >
                    {isHovering ?
                        <AiOutlinePicCenter size={30} />
                        :
                        <AiOutlineMenu size={30} />
                    }
                </UserArea>
            </NavArea>




        </BackGround>
    )
}
