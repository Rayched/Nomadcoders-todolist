import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_ToDoData, NowCategories, ToDos_Atom } from "../Atom";
import { getNowDate } from "../modules/getNowDate";
import { useEffect } from "react";

interface I_ToDoForm {
    ToDoText?: string;
};

const ToDoForm = styled.form``;

const ToDoInput = styled.input``;

const AddToDoBtn = styled.button``;

export default function AddToDo(){
    const {register, handleSubmit, setValue} = useForm();
    const NowCategory = useRecoilValue(NowCategories);
    const setToDos = useSetRecoilState(ToDos_Atom);

    const FullDate = getNowDate().join("");

    const onValid = ({ToDoText}: I_ToDoForm) => {
        const NewToDo: I_ToDoData = {
            ToDoId: FullDate + ToDoText,
            ToDoNm: String(ToDoText),
            Category: NowCategory.categoriesId
        };
        setToDos((oldToDos) => [...oldToDos, NewToDo]);
        setValue("ToDoText", "");
    }

    useEffect(() => console.log(FullDate));

    return (
        <ToDoForm onSubmit={handleSubmit(onValid)}>
            <ToDoInput type="text" placeholder="일정을 입력해주세요." {...register("ToDoText", {required: "일정을 입력하지 않았습니다."})} />
            <AddToDoBtn>추가</AddToDoBtn>
        </ToDoForm>
    );
};