import { jwtDecode } from "jwt-decode"

export const CheckTokenExpiry = () => {
    const accessToken = localStorage.getItem("accessToken") && localStorage.getItem("accessToken");
console.log("accessToken ",accessToken);

    if (!accessToken) return false;
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (currentTime > decoded.exp) {
        return true
    }

    
    return(null)

}
export default CheckTokenExpiry

