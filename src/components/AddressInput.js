import React from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode';
import styled from 'styled-components';

import addressInputdecoimage from '../assets/images/emoji/Icon_Emoji_Kamisato_Ayato_3.webp';

const AddressInputModalBorder = styled.div`
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    display: ${(props) => props.isAddressInput ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: absolute;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.5);
`;

const AddressInputDecoImageBox = styled.div`
    width: 500px;
    height: 280px;

    margin-top: 70px;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
`;

const AddressInputDecoImage = styled.div`
    width: 100%;
    height: 100%;

    background-image: url(${addressInputdecoimage});
    background-size: 280px 280px;
    background-position: left;
    background-repeat: no-repeat;

    @media screen and (max-width: 300px) {
        background-size: 200px 200px;
    }
`;

const AddressInputInnerContents = styled.div`
    width: 500px;
    height: 630px;

    margin-top: -20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 2px solid black;
    border-radius: 20px;

    background-color: #d2d2d2;

    opacity: 0.9;

    @media screen and (max-width: 500px) {
        width: 95%;
    }
    @media screen and (max-width: 300px) {
        margin-top: -70px;
    }
`;

const AddressInputTitle = styled.div`
    width: 95%;
    height: 15%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: black;
    font-size: 32px;
`;
const AddressInputInfo = styled.div`
    width: 90%;
    height: 75%;

    color: black;
    font-size: 18px;
`;

export const AddressInputModal = ({ setAddress, isAddressInput, setIsAddressInput }) => {

    const handleAddressInputComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddress(fullAddress);
        setIsAddressInput(false);
    };

    return (
        <AddressInputModalBorder isAddressInput={isAddressInput}>
            <AddressInputDecoImageBox>
                <AddressInputDecoImage />
            </AddressInputDecoImageBox>

            <AddressInputInnerContents>

                <AddressInputTitle>
                    주소입력
                </AddressInputTitle>

                <AddressInputInfo>
                    <DaumPostcodeEmbed onComplete={handleAddressInputComplete} autoClose={false} />
                </AddressInputInfo>

            </AddressInputInnerContents>
        </AddressInputModalBorder>
    );
};
