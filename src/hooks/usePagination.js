import {useState} from "react";

const usePagination = (data, count) => {
    const [page, setPage] = useState(1);
    const max = Math.ceil(data.length / count);

    const step = (num) => {
        setPage(num);
    }

    const prev = () => {
        const prevPage = Math.max(page - 1, 1)
        setPage(prevPage)
    }

    const next = () => {
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