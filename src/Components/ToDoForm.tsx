import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { A_ToDos, Categorys, I_ToDo } from "../modules/Atoms";
import { useEffect } from "react";

interface I_ToDoText {
    toDoText?: string;
}

function ToDoForm(){
    const {register, setValue, handleSubmit} = useForm<I_ToDoText>();
    const [ToDo, setToDo] = useRecoilState(A_ToDos);

    const saveToDos = ({toDoText}: I_ToDoText) => {
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
    };

    console.log(ToDo);

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
        </form>
    );
};

export default ToDoForm;