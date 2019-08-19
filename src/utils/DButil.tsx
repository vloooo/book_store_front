import { MAIN_URL, TOKEN } from '../constants';


interface Params {
    url: string,
    method: string,
    body?: string | any
}


const req = (params: Params) => {
    const headers: any = {};

    headers['Content-Type'] = 'application/json';

    if (localStorage.getItem(TOKEN)) {
        headers['Authorization'] = localStorage.getItem(TOKEN);
    }

    const fetchHead = { headers: headers };



    return fetch(
        params.url,
        {
            headers: headers,
            ...params
        })
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};


export function getBooks(filter: any = false, name?: string, page: number = 1) {
    let additional = '?page=' + page;

    if (filter) {
        additional += "&filter=" + filter;
        if (filter === "author")
            additional += "&name=" + name;
    }
    return req({
        url: MAIN_URL + 'index' + additional,
        method: 'GET'
    });
}


export function delUser(pk: any) {
    return req({
        url: MAIN_URL + 'del_user/' + pk + '/',
        method: 'DELETE'
    });
}

export function delBook(pk: any) {
    return req({
        url: MAIN_URL + 'books/' + pk + '/',
        method: 'DELETE'
    });
}

export function getBook(pk: any) {
    return req({
        url: MAIN_URL + 'books/' + pk + '/',
        method: 'GET'
    });
}

// export function getAdminBooks() {
//     return req({
//         url: MAIN_URL + 'books/',
//         method: 'GET'
//     });
// }

export function getAdminUsers(page: number = 1) {
    let additional = '?page=' + page;

    return req({
        url: MAIN_URL + 'users' + additional,
        method: 'GET'
    });
}

export function getUser() {
    return req({
        url: MAIN_URL + 'user/',
        method: 'GET'
    });
}

export function getCart() {
    return req({
        url: MAIN_URL + 'cart/',
        method: 'GET'
    });
}

export function getArchive() {
    return req({
        url: MAIN_URL + 'archive/',
        method: 'GET'
    });
}

export function setLogout() {
    return req({
        url: MAIN_URL + 'logout/',
        method: 'POST',
    });
}

export function setLogin(body: any) {
    return req({
        url: MAIN_URL + 'login/',
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function setRegister(body: any) {
    return req({
        url: MAIN_URL + 'signup/',
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function editUser(body: any) {
    return req({
        url: MAIN_URL + 'edit_user/',
        method: 'PUT',
        body: JSON.stringify(body)
    });
}

export function closeOrder(body: any) {
    return req({
        url: MAIN_URL + 'close_order/',
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function toCart(pk: any) {
    return req({
        url: MAIN_URL + 'to_cart/' + pk,
        method: 'POST',
    });
}

const reqForm = (params: Params, image?: any) => {
    var formData = new FormData();

    for (var name in params.body) {

        if (name != 'id' && name != 'image' && params.body[name] !== undefined) {
            formData.append(name, params.body[name]);
        }
    }

    if (image)
        formData.append('image', image[0])

    const headers: any = {};

    if (localStorage.getItem(TOKEN)) {
        headers['Authorization'] = localStorage.getItem(TOKEN);
    }

    return fetch(params.url, {
        method: params.method,
        body: formData,
        headers: headers
    }).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function editBook(body: any, method: string, image?: any) {
    let adds = method === "POST" ? "" : body.id + '/'
    return reqForm({
        url: MAIN_URL + 'books/' + adds,
        method: method,
        body: body,
    },
        image
    );
}

