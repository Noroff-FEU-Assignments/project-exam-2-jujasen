
export default function getAuth() {
    const auth = localStorage.getItem("auth");

    if (auth === null) {
        return [];
    }
    else {
        return JSON.parse(auth);
    }
}