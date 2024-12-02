import styled from "styled-components";
import { Categorys, I_ToDo, ToDoAtoms } from "../modules/Atoms";
import { useSetRecoilState } from "recoil";


const Items = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 10px;
    margin: 5px 0px;
    padding: 5px;
`;

const CategoryBtn = styled.button`
    margin-left: 3px;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
`;

function ToDoItem({ID, ToDo, Category}: I_ToDo){
    const setToDos = useSetRecoilState(ToDoAtoms);

    const ChangeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;

        setToDos((oldToDos) => {
            const TargetIndex = oldToDos?.findIndex((todo) => todo.ID === ID);
            const newToDo: I_ToDo = {
                ID, ToDo, Category: name as any
            };

            return [
                ...oldToDos.slice(0, TargetIndex), 
                newToDo,
                ...oldToDos.slice(TargetIndex + 1)
            ];
        });
        console.log(name);
    };

    return (
        <div>
            <Items>
                {ToDo} / {Category}
                {Category === "ToDo" ? null : <CategoryBtn name="ToDo" onClick={ChangeCategory}>등록</CategoryBtn>}
                {Category === "Doing" ? null : <CategoryBtn name="Doing" onClick={ChangeCategory}>진행</CategoryBtn>}
                {Category === "Done" ? null : <CategoryBtn name="Done" onClick={ChangeCategory}>완료</CategoryBtn>}
            </Items>
        </div>
    );
};

export default ToDoItem;