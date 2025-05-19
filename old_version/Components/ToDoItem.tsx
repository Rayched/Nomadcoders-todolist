import styled from "styled-components";
import { CategoryAtom, DefaultCategory, I_Categories, I_ToDo, SelectCategorys, ToDoAtoms } from "../modules/Atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { prependOnceListener } from "process";

interface I_CategoryBtn {
    BtnName?: string;
    NowTabs?: string;
};

const ItemWrapper = styled.li`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 10px;
    margin: 5px 0px;
    padding: 5px;

    .Btns {
        display: flex;
        flex-direction: row;
    }
`;

const ToDoText = styled.div`
    display: flex;
    justify-content: left;
    padding: 5px;
`;

const BtnsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: end;
    padding: 5px 0px;
`;

const CategoryBtn = styled.button<I_CategoryBtn>`
    margin-left: 3px;
    display: ${(props) => props.value === props.NowTabs ? "none" : "flex"};
    font-weight: bold;
    color: ${(props) => props.theme.itemTextColor};
    background-color: ${(props) => props.theme.itemBorderColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 14px;
`;

const DeleteBtn = styled(CategoryBtn)`
    display: flex;
    color: white;
    background-color:#ef5777;
    border: 2px solid #ef5777;
`;

function ToDoItem({ID, ToDo, Category}: I_ToDo){
    const setToDos = useSetRecoilState(ToDoAtoms);
    const Categories = useRecoilValue(CategoryAtom);
    const nowCategories = useRecoilValue(SelectCategorys);

    const ChangeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {value}} = event;

        setToDos((oldToDos) => {
            const TargetIndex = oldToDos?.findIndex((todo) => todo.ID === ID);
            const newToDo: I_ToDo = {
                ID, ToDo, Category: value as I_Categories["key"]
            };

            return [
                ...oldToDos.slice(0, TargetIndex), 
                newToDo,
                ...oldToDos.slice(TargetIndex + 1)
            ];
        });
    };

    const ToDo_Delete = () => {
        const isDelete = window.confirm("일정을 삭제 하시겠습니까?");
        
        if(isDelete){
            setToDos((oldToDos) => {
                const TargetIndex = oldToDos.findIndex((todo) => ID === todo.ID);
                const BeforeTarget = oldToDos.slice(0, TargetIndex);
                const AfterTarget = oldToDos.slice(TargetIndex + 1);
                return [...BeforeTarget, ...AfterTarget]
            });
            alert("일정이 삭제됐습니다.");
        } else {
            return;
        }
    };

    return (
        <ItemWrapper>
            <ToDoText>{ToDo}</ToDoText>
            <BtnsBox>
                {
                    Categories.map((todo) => {
                        return (
                            <CategoryBtn NowTabs={nowCategories} value={todo.key} onClick={ChangeCategory}>
                                {todo.value}
                            </CategoryBtn>
                        );
                    })
                }
                <DeleteBtn onClick={ToDo_Delete}>삭제</DeleteBtn>
            </BtnsBox>
        </ItemWrapper>
    );
};

export default ToDoItem;