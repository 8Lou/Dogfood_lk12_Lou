export const getEnding = (num) => {
    const str = String(num)
    if (str.length > 1) {
        const lastSymbols = str[str.length - 2] + str[str.length - 1]
        if (![11, 12, 13, 14].includes(Number(lastSymbols))) {
            const lastSymbol = str[str.length - 1]
            if (Number(lastSymbol) === 1) {
                return ""
            } else if ([2, 3, 4].includes(Number(lastSymbol))) {
                return "а"
            } else {
                return "ов"
            }
        } else {
            return "ов"
        }
    } else {
        const lastSymbol = str[str.length - 1]
        if (Number(lastSymbol) === 1) {
            return ""
        } else if ([2, 3, 4].includes(Number(lastSymbol))) {
            return "а"
        } else {
            return "ов"
        }
    }
}

export const getRate = (product) => {
    if (product.reviews) {
        const rate = product.reviews.reduce((avg, review, i, arr) => {
            if (i !== arr.length - 1) {
                return avg += review.rating
            } else {
                return (avg += review.rating) / arr.length
            }
        }, 0)
        return Math.floor(rate)
    }
}

export const filterFavoriteProd = (products, userID) => {
    const fav = products.filter(product => product.likes.includes(userID))
    return fav
}
    export const INITIAL_VALUE_RATING = 1;