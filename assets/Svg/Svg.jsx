import { StyleSheet } from 'react-native';
import Svg, { Path, Circle, Polyline, G, Rect } from 'react-native-svg';
// import styles from "../../App.scss";

export const Home = ({ fill, stroke }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" viewBox="0 0 512 512">
            <Path
                d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
                fill={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                stroke={stroke} />
            <Path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
                fill={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                stroke={stroke} />
        </Svg>
    )
}

export const MyFeed = ({ width, height, fill }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={{ width: width, height: height }} className="icons" viewBox="0 0 640 512">
            <Path
                d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"
                fill={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                stroke="none" />
        </Svg>
    )
}

export const PickPicker = ({ fill, stroke }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.icons, { width: 10 }]} className="icons" viewBox="0 0 320 512">
            <Path
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                fill={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                stroke={stroke} />
        </Svg>
    )
}

export const CrossReturn = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 384 512" style={{ width: 25, height: 25 }}>
            <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill='#ff4655' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    )
}

export const Trash = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 448 512" style={{ width: 20, height: 20 }}>
            <Path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" fill='#ff4655' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    )
}

export const Actus = ({ fill, stroke }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" viewBox="0 0 512 512">
            <Path
                d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
                fill={fill} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"
                stroke={stroke} />
        </Svg>
    )
}

export const Media = ({ fill, stroke, fill2, stroke2 }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" viewBox="0 0 512 512">
            <Path
                d="M238.23 342.43l89.09-74.13a16 16 0 000-24.6l-89.09-74.13A16 16 0 00212 181.86v148.28a16 16 0 0026.23 12.29z" fill={fill2} stroke={stroke2} />
            <Path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill={fill} stroke={stroke} strokeMiterlimit="10" strokeWidth="32" />
        </Svg>
    )
}

export const Marker = ({ fill, stroke }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" viewBox="0 0 512 512">
            <Path
                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                fill={fill} stroke={stroke} strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="32" />
            <Circle cx="256" cy="192" r="48" fill={fill} stroke={stroke}
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
        </Svg>
    )
}

export const Gear = ({ fill, stroke }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" viewBox="0 0 512 512">
            <Path
                d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                fill={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                stroke={stroke} />
        </Svg>
    )
}

export const Masjid = () => {
    return (
        <Svg id="indicatorTop" viewBox="0 0 640 512" style={{ width: 25, height: 25 }}>
            <Path
                d="M400 0c5 0 9.8 2.4 12.8 6.4c34.7 46.3 78.1 74.9 133.5 111.5l0 0 0 0c5.2 3.4 10.5 7 16 10.6c28.9 19.2 45.7 51.7 45.7 86.1c0 28.6-11.3 54.5-29.8 73.4H221.8c-18.4-19-29.8-44.9-29.8-73.4c0-34.4 16.7-66.9 45.7-86.1c5.4-3.6 10.8-7.1 16-10.6l0 0 0 0C309.1 81.3 352.5 52.7 387.2 6.4c3-4 7.8-6.4 12.8-6.4zM288 512V440c0-13.3-10.7-24-24-24s-24 10.7-24 24v72H192c-17.7 0-32-14.3-32-32V352c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32H560V440c0-13.3-10.7-24-24-24s-24 10.7-24 24v72H448V454c0-19-8.4-37-23-49.2L400 384l-25 20.8C360.4 417 352 435 352 454v58H288zM70.4 5.2c5.7-4.3 13.5-4.3 19.2 0l16 12C139.8 42.9 160 83.2 160 126v2H0v-2C0 83.2 20.2 42.9 54.4 17.2l16-12zM0 160H160V296.6c-19.1 11.1-32 31.7-32 55.4V480c0 9.6 2.1 18.6 5.8 26.8c-6.6 3.4-14 5.2-21.8 5.2H48c-26.5 0-48-21.5-48-48V176 160z"
                fill="#04bf94" stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const LogSuccess = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" id="loginSuccess" viewBox="0 0 15 13">
            <Polyline points="2 6.5 6 10.5 13 2.5"></Polyline>
        </Svg>
    )
}

export const LogFail = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" style={styles.icons} className="icons" id="loginFail" viewBox="0 0 15 15">
            <Polyline points="0 0 15 15"></Polyline>
            <Polyline points="0 16 16 0"></Polyline>
        </Svg>
    )
}

export const Bell = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: 25, height: 25 }}>
            <Path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" fill="#04bf94" stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const CircleTime = () => {
    return (
        <Svg>
            <Circle cx="70" cy="70" r="70"></Circle>
            <Circle cx="70" cy="70" r="70" className="dd"></Circle>
        </Svg>
    )
}

export const Pin = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: 25, height: 25 }}>
            <Path fill="none" stroke="#04bf94" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M256 96V56M256 456v-40" />
            <Path d="M256 112a144 144 0 10144 144 144 144 0 00-144-144z" fill="none" stroke="#04bf94" strokeMiterlimit="10" strokeWidth="32" />
            <Path fill="none" stroke="#04bf94" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 256h40M56 256h40" />
        </Svg>
    )
}

export const Back = ({ rotate, fill }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 320 512" style={{ width: 30, height: 30, transform: [{ rotate: rotate }] }}>
            <Path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill={fill} stroke={fill} strokeMiterlimit="10" strokeWidth="32" />
        </Svg>
    )
}

export const User = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 448 512" style={{ width: 25, height: 25 }}>
            <Path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" fill="#04bf94" stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const Logout = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: 25, height: 25 }}>
            <Path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" fill="#04bf94" stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const Annonce = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 384 512" style={{ width: 25, height: 25 }}>
            <Path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" fill="#04bf94" stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const Edit = ({ fill }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: 20, height: 20 }}>
            <Path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" fill={fill} stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const Eye = ({ fill, margin }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 576 512" style={{ width: 20, height: 20, marginRight: margin }}>
            <Path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" fill={fill} stroke="none" strokeMiterlimit="10" strokeWidth="1" />
        </Svg>
    )
}

export const BarEye = ({ fill, margin }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 52 38" style={{ width: 20, height: 20, marginRight: margin }}>
            <Path d="M30.9429 23.638C30.3516 24.2625 29.6385 24.7633 28.8462 25.1107C28.0539 25.4581 27.1986 25.6449 26.3314 25.6599C25.4641 25.675 24.6026 25.518 23.7984 25.1983C22.9941 24.8787 22.2635 24.4029 21.6502 23.7994C21.0368 23.1959 20.5533 22.477 20.2285 21.6856C19.9036 20.8942 19.7441 20.0465 19.7594 19.1931C19.7747 18.3397 19.9645 17.4981 20.3175 16.7185C20.6705 15.9389 21.1795 15.2372 21.8141 14.6554M39.1675 31.7309C35.4871 34.4914 31.0056 36.0207 26.3785 36.0951C11.3074 36.0951 2.69531 19.1467 2.69531 19.1467C5.37343 14.2357 9.08792 9.94501 13.5896 6.56251L39.1675 31.7309ZM21.8572 2.70675C23.3392 2.36541 24.8565 2.19478 26.3785 2.1983C41.4497 2.1983 50.0618 19.1467 50.0618 19.1467C48.7548 21.5526 47.1962 23.8176 45.4112 25.9049L21.8572 2.70675Z" fill="none" stroke={fill} strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const Feedback = ({ width, height, fill }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: width, height: height }}>
            <Path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" fill={fill} stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const Attrb = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 496 512" style={{ width: 25, height: 25 }}>
            <Path d="M314.9 194.4v101.4h-28.3v120.5h-77.1V295.9h-28.3V194.4c0-4.4 1.6-8.2 4.6-11.3 3.1-3.1 6.9-4.7 11.3-4.7H299c4.1 0 7.8 1.6 11.1 4.7 3.1 3.2 4.8 6.9 4.8 11.3zm-101.5-63.7c0-23.3 11.5-35 34.5-35s34.5 11.7 34.5 35c0 23-11.5 34.5-34.5 34.5s-34.5-11.5-34.5-34.5zM247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3z" fill='#04bf94' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const Legal = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: 25, height: 25 }}>
            <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" fill='#04bf94' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const Confid = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 512 512" style={{ width: 25, height: 25 }}>
            <Path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" fill='#04bf94' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const UsingCond = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 576 512" style={{ width: 25, height: 25 }}>
            <Path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" fill='#04bf94' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

export const UserManage = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" class="icons" viewBox="0 0 640 512" style={{ width: 25, height: 25 }}>
            <Path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" fill='#04bf94' stroke='none' strokeMiterlimit="10" strokeWidth="5" />
        </Svg>
    );
};

const styles = StyleSheet.create({
    icons: {
        // backgroundColor: 'red'
        // width: 10
        transform: "scale(0.7)"
    },

});