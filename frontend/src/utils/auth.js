const login = async (email, password) => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { 
            "Accept": "application/json", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "email": email,
            "password": password
        })
    });
    const jwt = await res.json();
    setTokenInfo(jwt);
}

const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
}

const setTokenInfo = (jwt) => {
    sessionStorage.setItem("userId", JSON.stringify(jwt.userId));
    sessionStorage.setItem("userRole", JSON.stringify(jwt.role));
    sessionStorage.setItem("token", JSON.stringify(jwt.token));
}

const isLoggedIn = () => {
    const userId = JSON.parse(sessionStorage.getItem("userId"));
    const userRole = JSON.parse(sessionStorage.getItem("userRole"));
    const token = JSON.parse(sessionStorage.getItem("token"));

    return (userId !== null && userRole != null && token !== null);
}

const getUserId = () => JSON.parse(sessionStorage.getItem("userId"))

const getUserRole = () => JSON.parse(sessionStorage.getItem("userRole"))

const getToken = () => JSON.parse(sessionStorage.getItem("token"))

export { login, logout, setTokenInfo, isLoggedIn, getUserId, getUserRole, getToken }