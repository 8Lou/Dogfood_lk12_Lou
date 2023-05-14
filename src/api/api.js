class Api {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
        this.baseUserUrl = config.baseUserUrl;
    }
    getProducts() {
        return fetch(`${this.baseUrl}`, {
            headers: this.headers,
        }).then(res => res.json());
    }
    getProductsByID(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            headers: this.headers,
        }).then(res => res.json());
    }
    searchProducts(search) {
        return fetch(`${this.baseUrl}/search?query=${search}`, {
            headers: this.headers,
        }).then(res => res.json());
    }
    getUserInfo() {
        return fetch(`${this.baseUserUrl}/me`, {
            headers: this.headers,
        }).then(res => res.json());
    }
    swithLike(productID, wasLiked) {
        return fetch(`${this.baseUrl}/likes/${productID}`, {
            method: wasLiked ? "DELETE" : "PUT",
            headers: this.headers,
        }).then(res => res.json());
    }
}

const config = {
    headers: {
        "Content-Type": "application/json",
        "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao"
    },
    baseUrl: "https://api.react-learning.ru/products",
    baseUserUrl: "https://api.react-learning.ru/users"
}

export const api = new Api(config);