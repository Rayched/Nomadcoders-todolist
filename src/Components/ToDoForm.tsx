import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Categorys, I_ToDo, ToDoAtoms } from "../modules/Atoms";
import styled from "styled-components";

interface I_ToDoText {
    toDoText?: string;
}

interface I_ToDoBtn {
    todoInput?: string;
}

const ToDoBtn = styled.button<I_ToDoBtn>`
    display: ${({todoInput}) => todoInput === "" ? "none" : "inline-block"};
`;

function ToDoForm(){
    const {watch, register, setValue, handleSubmit, setFocus} = useForm<I_ToDoText>();
    const setToDo = useSetRecoilState(ToDoAtoms);
    const Inputs = watch("toDoText");

    const saveToDos = ({toDoText}: I_ToDoText) => {
        if(toDoText === ""){
            setFocus("toDoText");
            return;
        } else {
            const ToDoConvert: I_ToDo = {
                ID: Date(),
                ToDo: toDoText,
                Category: Categorys.ToDo
            };
    
            setToDo((oldToDos) => [
                ...oldToDos,
                ToDoConvert
            ]);
            setValue("toDoText", "");
        }
    };

    return (
        <form onSubmit={handleSubmit(saveToDos)}>
            <input 
                {...register(
                    "toDoText",
                    {required: "일정을 입력하지 않았습니다."}
                )}
                type="text" 
                placeholder="일정을 입력해주세요."
            />
            <ToDoBtn todoInput={Inputs}>등록</ToDoBtn>
        </form>
    );
};

export default ToDoForm;