import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { I_ToDo, SelectCategorys, ToDoAtoms } from "../modules/Atoms";
import styled from "styled-components";

interface I_ToDoText {
    toDoText?: string;
}

interface I_ToDoBtn {
    todoInput?: string;
}

const ToDoForm = styled.form`
    display: flex;
    align-items: center;
    margin: 5px 0px;
`;

const ToDoInput = styled.input`
    display: block;
    color: ${(props) => props.theme.textColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    width: 220px;
    height: 30px;
    font-weight: bold;
    text-align: center;
`;

const ToDoBtn = styled.button<I_ToDoBtn>`
    display: ${({todoInput}) => todoInput === "" ? "none" : "inline-block"};
    margin-left: 3px;
    width: 25px;
    height: 25px;
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 20px;
`;

function AddToDo(){
    const {watch, register, setValue, handleSubmit, setFocus} = useForm<I_ToDoText>();
    const setToDo = useSetRecoilState(ToDoAtoms);
    const nowCategorys = useRecoilValue(SelectCategorys);
    const Inputs = watch("toDoText");

    const saveToDos = ({toDoText}: I_ToDoText) => {
        if(toDoText === ""){
            setFocus("toDoText");
            return;
        } else {
            const ToDoConvert: I_ToDo = {
                ID: Date(),
                ToDo: toDoText,
                Category: nowCategorys,
            };
    
            setToDo((oldToDos) => [
                ...oldToDos,
                ToDoConvert
            ]);
            setValue("toDoText", "");
        }
    };

    return (
        <ToDoForm onSubmit={handleSubmit(saveToDos)}>
            <ToDoInput 
                {...register(
                    "toDoText",
                    {required: "일정을 입력하지 않았습니다."}
                )}
                type="text" 
                placeholder="일정을 입력해주세요."
            />
            <ToDoBtn todoInput={Inputs}>+</ToDoBtn>
        </ToDoForm>
    );
};

export default AddToDo;