import styled from "styled-components";
import { AllCategories, BasicCategory, CustomCategories, I_Category, I_ToDoData, NowCategories, ToDos_Atom, ToDoSelector } from "../Atom";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddToDo from "./AddToDo";
import { getNowDate } from "../modules/getNowDate";
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";

interface I_CategoryItem {
    categoryId: string;
    nowCategory: string;
};

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 70%;
    max-width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`;

const Title = styled.div``;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 5px;
`;

const CategoryItem = styled.div<I_CategoryItem>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    margin: 0px 3px;
    border: 2px solid black;
    font-weight: ${(props) => props.categoryId === props.nowCategory ? "bold" : "none"};
`;

const ToDoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ToDoList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const EditToDoBtn = styled.button``;

export function Home(){
    const [Show, setShow] = useState(false);
    const [EditMode, setEditMode] = useState(false);

    const CategoryData = BasicCategory;

    const [NowCategory, setNowCategory] = useRecoilState(NowCategories);
    const AllCategory = useRecoilValue(AllCategories);
    const [Customs, setCustoms] = useRecoilState(CustomCategories);

    const ToDos = useRecoilValue(ToDoSelector);

    const onChange = (Id: string) => {
        if(NowCategory.categoriesId === Id){
            return;
        } else {
            const Idx = AllCategory.findIndex((data) => data.categoriesId === Id);
            const TargetCategory = AllCategory[Idx];

            setNowCategory(() => {
                const DataFormat: I_Category = {
                    categoriesId: TargetCategory.categoriesId,
                    categoriesNm: TargetCategory.categoriesNm
                };
                return DataFormat;
            });
        }
    }

    //커스텀 카테고리를 추가 및 삭제하는 function's
    const AddNewCategory = () => {
        const DataInput = window.prompt("새로 추가할 카테고리의 이름을 입력해주세요.");
        if(DataInput !== null){
            const NewCategory: I_Category = {
                categoriesId: getNowDate().join("") + DataInput.split(" ").join(""),
                categoriesNm: DataInput
            };
            setCustoms((oldData) => [...oldData, NewCategory]);
            setNowCategory(NewCategory);
            setShow(false);
        } else {
            alert("카테고리의 이름을 입력하지 않았습니다!");
        }
    };

    const DeleteCustomCategory = () => {};

    return (
        <Wrapper>
            <Container>
                <Header>
                    <Title>To Do List</Title>
                </Header>
                <CategoryBox key="BasicCategory">
                    {
                        CategoryData.map((data) => {
                            return (
                                <CategoryItem 
                                    key={data.categoriesId} 
                                    categoryId={data.categoriesId} 
                                    nowCategory={NowCategory.categoriesId}
                                    onClick={() => onChange(data.categoriesId)}
                                >{data.categoriesNm}</CategoryItem>
                            );
                        })
                    }
                </CategoryBox>
                <CategoryBox key="CustomCategory">
                    {
                        Customs.map((data) => {
                            return (
                                <CategoryItem
                                    key={data.categoriesId}
                                    categoryId={data.categoriesId}
                                    nowCategory={NowCategory.categoriesId}
                                    onClick={() => onChange(data.categoriesId)}
                                >{data.categoriesNm}</CategoryItem>
                            );
                        })
                    }
                    {Show ? null : <button onClick={() => setShow(true)}>편집</button>}
                    {Show ? <button onClick={AddNewCategory}>추가</button> : null}
                    {Show ? <button onClick={() => setShow(false)}>삭제</button> : null}
                </CategoryBox>
                <ToDoBox>
                    <AddToDo />
                    <ToDoList>
                        <EditToDoBtn onClick={() => setEditMode((prev) => !prev)}>일정 편집</EditToDoBtn>
                        {
                            ToDos.map((data) => {
                                return (
                                    <ToDoItem 
                                        todoId={data.ToDoId}
                                        isShowCategoryBtn={EditMode}
                                        setShowCategoryBtn={setEditMode}
                                    />
                                );
                            })
                        }
                    </ToDoList>
                </ToDoBox>
            </Container>
        </Wrapper>
    );
}

/**
 * 커스텀 카테고리 관련
 * 
 * 처음 랜더링될 때, localStorage에 저장된 Custom Category가 없으면
 * '편집'이라고 써있는 버튼만 나오고
 * 이 상태에서 편집 버튼을 클릭하면
 * '편집' 버튼이 사라지고
 * 대신 '추가'/'삭제' 버튼이 나오게 해보자.
 * 
 * 추가 버튼을 클릭하면, 카테고리 이름을 쓰는 알림창이 나오고
 * 이름을 입력하면, 해당 이름의 커스텀 카테고리가 나오게 해보자.
 * 
 * {Id => 카테고리 생성 일 + 텍스트, Nm => 사용자가 입력한 텍스트}
 */