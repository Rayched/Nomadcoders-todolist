import { useRecoilValue } from "recoil";
import { ToDoSelectors } from "../modules/Atoms";
import styled from "styled-components";

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;

const ToDoItem = styled.li`
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 10px;
    text-align: center;
    margin: 5px 0px;
    padding: 3px;
`;


function ToDoItems(){
    const ToDos = useRecoilValue(ToDoSelectors);

    return (
        <ItemList>
            <ul>
                {
                    ToDos?.map((todo) => {
                        return (
                            <ToDoItem>
                                {todo.ToDo} / {todo.Category}
                                <button>진행</button>
                                <button>완료</button>
                            </ToDoItem>
                        );
                    })
                }
            </ul>
        </ItemList>
    );
};

export default ToDoItems;