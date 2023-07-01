import React from 'react'
import styled from 'styled-components';

import infoimg1 from '../../../assets/images/testImg/test1.jpg';
import infoimg2 from '../../../assets/images/testImg/test2.jpg';
import infoimg3 from '../../../assets/images/testImg/test3.jpg';
import infoimg4 from '../../../assets/images/testImg/test4.jpg';
import infoimg5 from '../../../assets/images/testImg/test5.jpg';
import infoimg6 from '../../../assets/images/testImg/test6.jpg';

const BackGround = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
        width: 60%;
        height: 100%;

        @media screen and (max-width: 1000px) {
            width: 90%;
        };
    };
`;

export const ProductInfomation = ({ productData }) => {

    return (
        <BackGround>

            {productData.productInformationFile.infoimage1 !== '' && <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsInfoImage%2F${productData?.name}%2F${productData?.productInformationFile?.infoimage1}?alt=media&token=044dbc82-5ec8-42b0-b307-551d7ff0ad54`} alt='' />}

            {productData.productInformationFile.infoimage2 !== '' && <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsInfoImage%2F${productData?.name}%2F${productData?.productInformationFile?.infoimage2}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />}

            {productData.productInformationFile.infoimage3 !== '' && <img src={`https://firebasestorage.googleapis.com/v0/b/prj07pyroblossom.appspot.com/o/productsInfoImage%2F${productData?.name}%2F${productData?.productInformationFile?.infoimage3}?alt=media&token=bf2eff71-3c5e-4dc2-9706-445f95fd91e8`} alt='' />}

        </BackGround>
    );
};
