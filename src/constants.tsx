export const BASE_PHOTO_URL = "http://127.0.0.1:8000"

export const MAIN_URL = BASE_PHOTO_URL + '/api/';

export const TOKEN = 'token';

export const GUEST = {
    user: {
        username: "guest",
        email: "",
        is_staff: false,
        is_active: false
    },
    gender: "",
    birthday: ""
};

export const DEFAULT_BOOK = {
    id: 2,
    title: "",
    amount: 0,
    price: "",
    available: false,
};

export const DEFAULT_DATA = {
    results: [DEFAULT_BOOK]
};
export const EMPTY_PHOTO = BASE_PHOTO_URL + "/static/images/1.png"