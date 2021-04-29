export default function saveAuth (data) {
    localStorage.setItem('auth', JSON.stringify(data));
};