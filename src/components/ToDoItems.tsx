import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { BasicCategory, I_ToDoData, NowCategories, ToDos_Atom, ToDoSelector } from "../Atom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getNowDate } from "../modules/getNowDate";

interface I_TargetData {
    Id: string;
    Category: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const EditBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
`;

const ToDoBtn = styled.button``;

const ToDoItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0px;
    padding: 5px;
    border: 2px solid black;
`;

const ToDo_Text = styled.div``;

function ToDoItems(){
    const [ShowBtn, setShowBtn] = useState(false);
    const [ToDos, setToDos] = useRecoilState(ToDos_Atom);

    const NowCategory = useRecoilValue(NowCategories);
    const ToDoDatas = useRecoilValue(ToDoSelector);

    const CategoriesData = BasicCategory.filter((data) => data.categoriesId !== NowCategory.categoriesId);

    const ChangeCategory = ({Id, Category}: I_TargetData) => {
        const Idx = ToDos.findIndex((data) => Id === data.ToDoId);
        setToDos((oldToDos) => {
            const TargetData = oldToDos[Idx];

            const ModifyData: I_ToDoData = {
                ToDoId: TargetData.ToDoId,
                ToDoNm: TargetData.ToDoNm,
                Category: Category
            };

            return [
                ...oldToDos.slice(0, Idx),
                ModifyData,
                ...oldToDos.slice(Idx + 1)
            ];
        });
        setShowBtn(false);
    };

    const ModifyToDos = (targetId: string) => {
        const newData = window.prompt("새 일정을 입력해주세요.");

        if(newData === null){
            alert("수정 취소");
        } else {
            const Idx = ToDos.findIndex((data) => data.ToDoId === targetId);
            const FullDate = getNowDate().join("");
            
            const ModifyData: I_ToDoData = {
                ToDoId: FullDate + newData.split(" ").join(""),
                ToDoNm: newData,
                Category: NowCategory.categoriesId
            };

            setToDos((oldToDo) => [
                ...oldToDo.slice(0, Idx),
                ModifyData,
                ...oldToDo.slice(Idx + 1)
            ]);
            setShowBtn(false);
        };
    };

    const ToDoDelete = (targetId: string) => {
        const Idx = ToDos.findIndex((data) => targetId === data.ToDoId);
        const isDelete = window.confirm(`'${ToDos[Idx].ToDoNm}' 일정을 삭제하겠습니까?`);

        if(isDelete){
            setToDos((oldToDo) => [
                ...oldToDo.slice(0, Idx),
                ...oldToDo.slice(Idx + 1)
            ]);
            alert("해당 일정을 삭제했습니다.");
        } else {
            alert("일정 삭제를 취소했습니다.");
            return;
        }
        setShowBtn(false);
    };

    return (
        <Container>
            <ToDoBtn onClick={() => setShowBtn((prev) => !prev)}>일정 편집</ToDoBtn>
            <ul>
                {
                    ToDoDatas.map((todoData) => {
                        return (
                            <ToDoItem key={todoData.ToDoId}>
                                <ToDo_Text>{todoData.ToDoNm}</ToDo_Text>
                                {
                                    !(ShowBtn) ? null
                                    : (
                                        <>
                                            <EditBox className="ChangeBtns">
                                                <div>카테고리 변경</div>
                                                <BtnBox>
                                                {
                                                    CategoriesData.map((data) => {
                                                        return (
                                                            <ToDoBtn 
                                                                key={data.categoriesId} 
                                                                onClick={() => ChangeCategory({Id: todoData.ToDoId, Category: data.categoriesId})}
                                                            >{data.categoriesNm.split(" ")[1]}</ToDoBtn>
                                                        );
                                                    })
                                                }
                                                </BtnBox>                                            
                                            </EditBox>
                                            <EditBox className="EditBtns">
                                                <div>일정 편집</div>
                                                <BtnBox>
                                                    <ToDoBtn onClick={() => ModifyToDos(todoData.ToDoId)}>수정</ToDoBtn>
                                                    <ToDoBtn onClick={() => ToDoDelete(todoData.ToDoId)}>삭제</ToDoBtn>
                                                </BtnBox>
                                            </EditBox>
                                        </>
                                    )
                                }
                            </ToDoItem>
                        );
                    })
                }
            </ul>
        </Container>
    );
};

export default ToDoItems;