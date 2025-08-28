import { jwtDecode } from "jwt-decode"
import { useRefreshTokenMutation } from "../services/InjectetdAuthApi";

export const checktokenExpiry = () => {
    const accessToken = localStorage.getItem("accessToken") && localStorage.getItem("accessToken");

    if (!accessToken) return "404"; //if token not exist then return
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    
    return currentTime > decoded.exp; //true if token expired
}


// export const RefreshToken = async () => {
//     const refreshToken = localStorage.getItem("refreshToken") && localStorage.getItem("refreshToken")
//     if (!refreshToken) return true; //if refresh token not exist then return

//     const decoded = jwtDecode(refreshToken);
//     const currentTime = Date.now() / 1000;

//     if (currentTime < decoded.exp) {
//         const newAccessToken = await useRefreshTokenMutation(refreshToken);
//         localStorage.setItem("accessToken", newAccessToken); //new accesstoken
//         return true
//     }
//     return false //token not expired
// }


