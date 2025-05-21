import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_ToDoData, NowCategories, ToDos_Atom } from "../Atom";
import { getNowDate } from "../modules/getNowDate";
import { useEffect } from "react";

interface I_ToDoForm {
    ToDoText?: string;
};

const ToDoForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    height: 1.5em;
    margin-top: 5px;
    margin-bottom: 4px;
    background-color: rgb(242, 239, 239);
    border: 2.3px solid rgb(50, 50, 50);
    border-radius: 18px;
    padding: 3px;
`;

const ToDoInput = styled.input`
    display: block;
    width: 20em;
    background-color: inherit;
    border-radius: 15px;
    padding: 3px;
    font-weight: bold;
    border: 0px;
    &:focus {
        outline: none;
    }
`;

const AddToDoBtn = styled.button`
    width: 2em;
    height: 2em;
    background-color: inherit;
    border: 0px;
    border-radius: 10px;
`;

const Logos = styled.svg`
    width: 100%;
    height: 100%;
`;

export default function AddToDo(){
    const {register, handleSubmit, setValue} = useForm();
    const NowCategory = useRecoilValue(NowCategories);
    const setToDos = useSetRecoilState(ToDos_Atom);

    const FullDate = getNowDate().join("");

    const onValid = ({ToDoText}: I_ToDoForm) => {
        const NewToDo: I_ToDoData = {
            ToDoId: FullDate + ToDoText?.split(" ").join(""),
            ToDoNm: String(ToDoText),
            Category: NowCategory.categoriesId
        };
        setToDos((oldToDos) => [...oldToDos, NewToDo]);
        setValue("ToDoText", "");
    }

    return (
        <ToDoForm onSubmit={handleSubmit(onValid)}>
            <ToDoInput 
                type="text" 
                placeholder="일정을 입력해주세요." 
                autoComplete="off"
                {...register(
                    "ToDoText", 
                    {required: "일정을 입력하지 않았습니다."}
                )}
            />
            <AddToDoBtn>
                <Logos xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                </Logos>
            </AddToDoBtn>
        </ToDoForm>
    );
};