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
    sessionStorage.setItem("userId", JSON.stringify(jwt.userId));
    sessionStorage.setItem("token", JSON.stringify(jwt.token));
};

const isLoggedIn = () => {
    const userId = JSON.parse(sessionStorage.getItem('userId'));
    const token = JSON.parse(sessionStorage.getItem('token'));

    return (userId !== null && token !== null);
};

const getToken = () => JSON.parse(sessionStorage.getItem('token'));

export { login, isLoggedIn, getToken }