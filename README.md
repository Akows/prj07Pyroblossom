# 개인 프로젝트 07 - Pyro Blossom

## 👥 Member Info

### 이유승

<br/>

## 💪🏻프로젝트 목표

- 게임 ‘원신’을 주제로 하는 가상 온라인 쇼핑몰

<br/>

## ✔️ 배포링크

- `Google Firebase Hosting` [🔗Link](https://prj07pyroblossom.web.app/store)

<br/>

## 🛠️ 프로젝트 설명

### 해당 프로젝트에 대한 상세한 설명은 제 [🔗포트폴리오](https://www.notion.so/6f40078f4a3340a1955b62cf823e4b9a?pvs=4#23e873f37ee749f7a1655c694f3b24f3)에 작성해두었습니다!

<br/>

## 🛠️ 프로젝트 데모

https://github.com/Akows/prj07Pyroblossom/assets/54127322/aee7b576-d70a-4b9f-895f-cbd78093bbd7


https://github.com/Akows/prj07Pyroblossom/assets/54127322/f9efee67-305f-49ba-ad8b-6312c7db8588


https://github.com/Akows/prj07Pyroblossom/assets/54127322/cc3303ce-1219-4797-8eb2-cdc40c3d51e1


<br/>

## 🌲프로젝트 구조

```bash
src
 ┣ assets
 ┃ ┣ fonts
 ┃ ┃ ┣ font.css
 ┃ ┃ ┗ ja-jp.ttf
 ┃ ┣ images
 ┃ ┃ ┣ background
 ┃ ┃ ┃ ┣ loading.gif
 ┃ ┃ ┃ ┗ upLiyueport2.jpg
 ┃ ┃ ┣ button
 ┃ ┃ ┃ ┣ btnleft.png
 ┃ ┃ ┃ ┗ btnright.png
 ┃ ┃ ┣ emoji
 ┃ ┃ ┃ ┣ Icon_Emoji_010_Amber_Save_me.webp
 ┃ ┃ ┃ ┣ Icon_Emoji_066_Hu_Tao_Reciting_poetry.webp
 ┃ ┃ ┃ ┗ Icon_Emoji_Kamisato_Ayato_3.webp
 ┃ ┃ ┣ icon
 ┃ ┃ ┃ ┗ Element_Pyro.svg
 ┃ ┃ ┣ stars
 ┃ ┃ ┃ ┣ Icon_1_Star.webp
 ┃ ┃ ┃ ┣ Icon_2_Stars.webp
 ┃ ┃ ┃ ┣ Icon_3_Stars.webp
 ┃ ┃ ┃ ┣ Icon_4_Stars.webp
 ┃ ┃ ┃ ┗ Icon_5_Stars.webp
 ┃ ┃ ┣ testImg
 ┃ ┃ ┃ ┣ test1.jpg
 ┃ ┃ ┃ ┣ test2.jpg
 ┃ ┃ ┃ ┣ test3.jpg
 ┃ ┃ ┃ ┣ test4.jpg
 ┃ ┃ ┃ ┣ test5.jpg
 ┃ ┃ ┃ ┣ test6.jpg
 ┃ ┃ ┃ ┗ testproductimg.jpg
 ┃ ┃ ┣ character_eula_portrait.png
 ┃ ┃ ┣ Character_Klee_Full_Wish.webp
 ┃ ┃ ┣ Genshin-Impact-Logo.webp
 ┃ ┃ ┣ Genshin-Impact-LogoW.png
 ┃ ┃ ┗ System_Shop.webp
 ┃ ┣ slideshow
 ┃ ┃ ┣ testimg1.jfif
 ┃ ┃ ┣ testimg2.jfif
 ┃ ┃ ┣ testimg3.jfif
 ┃ ┃ ┣ testimg4.jfif
 ┃ ┃ ┗ testimg5.jfif
 ┃ ┗ animation.css
 ┣ components
 ┃ ┣ store
 ┃ ┃ ┣ myPage
 ┃ ┃ ┃ ┣ AdminProductManagement.js
 ┃ ┃ ┃ ┣ AdminProductUpload.js
 ┃ ┃ ┃ ┣ MyPageNavigation.js
 ┃ ┃ ┃ ┣ PointHistory.js
 ┃ ┃ ┃ ┗ PurchaseHistory.js
 ┃ ┃ ┣ payment
 ┃ ┃ ┃ ┣ OrderPurchase.js
 ┃ ┃ ┃ ┗ PurchaseComplete.js
 ┃ ┃ ┣ productDetail
 ┃ ┃ ┃ ┣ ProductInfomation.js
 ┃ ┃ ┃ ┣ QnA.js
 ┃ ┃ ┃ ┗ Reviews.js
 ┃ ┃ ┗ PointChargeModal.js
 ┃ ┣ user
 ┃ ┃ ┣ login
 ┃ ┃ ┃ ┗ IDAndPasswordSearchModal.js
 ┃ ┃ ┣ signup
 ┃ ┃ ┃ ┣ RequestEmailAndPasswordVerify.js
 ┃ ┃ ┃ ┣ RequestOtherVerify.js
 ┃ ┃ ┃ ┣ RequestTermsAgreement.js
 ┃ ┃ ┃ ┗ SignupComplete.js
 ┃ ┃ ┣ AddressInput.js
 ┃ ┃ ┗ DeleteAccountModal.js
 ┃ ┣ ErrorModal.js
 ┃ ┣ Footer.js
 ┃ ┣ Loading.js
 ┃ ┣ Navigation.js
 ┃ ┣ Pagination.js
 ┃ ┣ SlideShow.js
 ┃ ┗ StoreNavigation.js
 ┣ configs
 ┃ ┣ firebase
 ┃ ┃ ┗ config.js
 ┃ ┗ errorCodes.js
 ┣ functions
 ┃ ┣ ScrollToTop.js
 ┃ ┣ storeFunction.js
 ┃ ┗ userFunction.js
 ┣ pages
 ┃ ┣ admin
 ┃ ┃ ┗ AdminPage.js
 ┃ ┣ store
 ┃ ┃ ┣ PaymentPage.js
 ┃ ┃ ┣ ProductDetail.js
 ┃ ┃ ┣ ProductList.js
 ┃ ┃ ┣ ShoppingBasket.js
 ┃ ┃ ┣ StoreMain.js
 ┃ ┃ ┗ StoreMyPage.js
 ┃ ┣ user
 ┃ ┃ ┣ Login.js
 ┃ ┃ ┣ MyPage.js
 ┃ ┃ ┗ Signup.js
 ┃ ┗ Main.js
 ┣ redux
 ┃ ┣ actions
 ┃ ┃ ┣ storeAction.js
 ┃ ┃ ┗ userAction.js
 ┃ ┣ reducers
 ┃ ┃ ┣ reducerIndex.js
 ┃ ┃ ┣ storeReducer.js
 ┃ ┃ ┗ userReducer.js
 ┃ ┗ store.js
 ┣ unused
 ┃ ┣ Login.js
 ┃ ┣ RequestEmailVerify.js
 ┃ ┣ RequestOtherVerify.js
 ┃ ┣ RequestPasswordVerify.js
 ┃ ┣ RequestPasswordVerifyV2.js
 ┃ ┗ RequestTermsAgreement.js
 ┣ App.css
 ┣ App.js
 ┣ index.css
 ┣ index.js
 ┗ ResetCSS.css
```
