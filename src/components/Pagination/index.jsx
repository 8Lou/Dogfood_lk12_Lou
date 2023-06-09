import Number from "./Number"
import "./style.css"

const Pagination = ({ num }) => {
    let items = [];
    for (let i = 0; i < num.max; i++) {
        items.push(<Number
            val={i + 1}
            onClick={() => { num.step(i + 1) }}
            active={num.current === i + 1}
            key={"pag_" + i}
        />)
    }
    return <div className="pagination">
        <Number start onClick={() => { num.step(1) }} />
        <Number prev onClick={num.prev} />
        {items}
        <Number next onClick={num.next} />
        <Number end onClick={() => { num.step(num.max) }} />
    </div>
}

export default Pagination;