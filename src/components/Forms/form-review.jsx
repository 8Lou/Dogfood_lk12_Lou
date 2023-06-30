import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchSetReview } from "../../storage/slices/singleProductSlice";
import Form from "./form";
import { Button } from "../Button/Button";
import { FormInput } from "./form-input";
import { Rating } from "../Rating/Rating";
import { INITIAL_VALUE_RATING } from "../../utils/Utils";

export const FormReview = ({ title = 'Отзыв о товаре', productID, setGoods, addReview }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
    const dispatch = useDispatch();
    const [rating, setRating] = useState(INITIAL_VALUE_RATING)

    const sendReviewGoods = (goods) => {
        addReview({ ...goods, rating })
    }

    const textReview = register('text', {
        required: {
            value: true
        }
    })

    return (
        <Form title={title} handleFormSubmit={handleSubmit(sendReviewGoods)}>

            <Rating rating={rating} isEditable setRating={setRating} />

            <FormInput
                {...textReview}
                id="text"
                typeinput="textarea"
                placeholder="Напишите свой отзыв"
            />
            {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}

            <Button type="submit" color="yellow">Отправить отзыв</Button>
        </Form>
    )
}