import { jwtDecode } from "jwt-decode"

export const checktokenExpiry = () => {
    const accessToken = localStorage.getItem("accessToken") && localStorage.getItem("accessToken");

    if (!accessToken) return true;
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (currentTime > decoded.exp) {
        return true
    }

    
    return(null)

}
export default CheckTokenExpiray

