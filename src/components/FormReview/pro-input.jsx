import { useState } from "react";
import { PencilSquare, XSquare, CheckSquare } from "react-bootstrap-icons";
import { Form } from "react-hook-form";
import { Button } from "../Button/Button";

const Input = ({ val, isActive, upd, changeActive, name }) => {
    const [inp, setInput] = useState(val);
    return <>
        {!isActive
            ? <>{name !== "avatar" && val} <Button onClick={() => changeActive(true)}><PencilSquare /></Button></>
            : <>
                <Form value={inp} onChange={(e) => setInput(e.target.value)} />
                <Button variant="danger" onClick={() => changeActive(false)}><XSquare /></Button>
                <Button variant="success" onClick={() => {
                    changeActive(false)
                    upd(name, inp)
                }}><CheckSquare /></Button>
            </>
        }
    </>
}

export default Input;