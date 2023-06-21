import {useState} from "react";

const usePagination = (data, count) => {
    const [page, setPage] = useState(1);
    // сколько страниц будет на сайте и элементов на странице
    // el => 15 el/page => pages = 4
    const max = Math.ceil(data.length / count);

    // функция принимает в себя номер активной страницы
    const step = (num) => {
        setPage(num);
    }

    const prev = () => {
        // не должно быть <= 0
        const prevPage = Math.max(page - 1, 1)
        setPage(prevPage)
    }

    const next = () => {
        // не должно быть > max
        const nextPage = Math.min(page + 1, max)
        setPage(nextPage)
    }

    const setDataPerPage = () => {
        let start = (page - 1) * count;
        let end = start + count;
        return data.slice(start, end);
    }

    return {page, max, step, prev, next, setDataPerPage}
}

export default usePagination;