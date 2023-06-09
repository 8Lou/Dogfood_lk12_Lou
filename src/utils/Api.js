const res = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
    this.baseUserUrl = config.baseUserUrl;
  }
    getProducts() {
    return fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
  }
  getSingleProduct(id) {
    return fetch(`${this.baseUrl}/products/${id}`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
  }
    
  updSingleProduct(id, body) {
      return fetch(`${this.baseUrl}/products/${id}`, {
          method: "PATCH",
          headers: this.headers(true),
          body: JSON.stringify(body),
      }).then(res => res.json())
  }
  delSingleProduct(id) {
      return fetch(`${this.baseUrl}/products/${id}`, {
          method: "DELETE",
          headers: this.headers(),
      }).then(res => res.json())
  }
  getUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: "GET",
      headers: this.headers(),
    }).then((res) => res.json());
  }
  
  searchProducts(search) {
    return fetch(`${this.baseUrl}/search?query=${search}`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  getUserInfo() {
    return fetch(`${this.baseUserUrl}/me`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  updUserInfo(body, changeImg = false) {
    return fetch(`${this.baseUserUrl}/me${changeImg ? "/avatar" : ""}`, {
      method: "PATCH",
      headers: this.headers(true),
      body: JSON.stringify(body)
    }).then((res) => res.json());
  }

  swithLike(productID, wasLiked) {
    return fetch(`${this.baseUrl}/likes/${productID}`, {
      method: wasLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then((res) => res.json());
  }
  setReview(productID, body) {
        return fetch(`${this.baseUrl}/products/review/${productID}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
  delReview(productID, reviewId) {
        return fetch(`${this.baseUrl}/products/review/${productID}/${reviewId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(res => res.json())
    }
  getReview(id) {
        return fetch(`${this.baseUrl}/products/review/${id}`, {
            headers: this.headers,
        }).then(res => res.json())
    }
}

const config = {
  headers: {
    "Content-Type": "application/json",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao"
  },
  baseUrl: "https://api.react-learning.ru",
  baseUserUrl: "https://api.react-learning.ru/users",
};

export default Api;