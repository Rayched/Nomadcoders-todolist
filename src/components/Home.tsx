import styled from "styled-components";
import { AllCategories, BasicCategory, CustomCategories, I_Category, I_ToDoData, NowCategories, ThemeAtoms, ToDos_Atom, ToDoSelector } from "../Atom";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddToDo from "./AddToDo";
import { getNowDate } from "../modules/getNowDate";
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";

interface I_CategoryItem {
    categoryId: string;
    nowCategory: string;
    isFocus: boolean;
};

interface I_EditToDoBtn {
    isToDos: boolean;
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: ${(props) => props.theme.bgColor};
`;

const Container = styled.div`
    width: 90%;
    max-width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    width: 100%;
    height: 8%;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
`;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 98%;
    padding: 5px;
    margin-bottom: 5px;
    background-color: ${(props) => props.theme.itemBoxColor};
    border: 2px solid ${(props) => props.theme.itemColor};
    border-radius: 15px;
`;

const BasicCategorys = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
    margin: 5px 0px;
`;

const CustomCategorys = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    margin: 2px 0px;
`;

const CategoryItem = styled.div<I_CategoryItem>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    padding: 5px;
    margin: 0px 3px;
    border: 2px solid ${(props) => props.theme.itemColor};
    border-radius: 10px;
    font-weight: bold;
    color: ${(props) => props.categoryId === props.nowCategory ? props.theme.itemsFocusTextColor : props.theme.textColor};
    background-color: ${(props) => 
        props.categoryId === props.nowCategory 
        ? props.theme.itemFocusColor : props.theme.itemColor
    };
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
    align-items: center;
    padding: 3px;
    width: 20em;
    margin-top: 10px;
`;

const EditToDoBtn = styled.button<I_EditToDoBtn>`
    display: ${(props) => props.isToDos ? "none" : "block"};
    width: 10em;
    border: 2px solid black;
    border-radius: 13px;
    font-size: 17px;
    font-weight: bold;
    color: black;
    background-color: ${(props) => props.theme.itemFocusColor};
`;

export function Home(){
    const [Show, setShow] = useState(false);
    const [EditMode, setEditMode] = useState(false);

    const isDarks = useRecoilValue(ThemeAtoms);

    const CategoryData = BasicCategory;

    const [NowCategory, setNowCategory] = useRecoilState(NowCategories);
    const AllCategory = useRecoilValue(AllCategories);
    const [Customs, setCustoms] = useRecoilState(CustomCategories);

    const originToDos = useRecoilValue(ToDos_Atom);
    const [ToDos, setToDos] = useRecoilState(ToDoSelector);

    const ToDosLength = ToDos.length;

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

    const DeleteCategory = (targetId: string) => {
        const Idx = Customs.findIndex((data) => data.categoriesId === targetId);

        const isDelete = window.confirm(`'${Customs[Idx].categoriesNm}' 카테고리를 삭제하겠습니까?\n(해당 카테고리의 모든 일정도 같이 삭제됩니다.)`);

        if(isDelete){
            const ModifyToDos = originToDos.filter((data) => data.Category !== targetId);
            setToDos([...ModifyToDos]);
            setCustoms((oldCategorys) => [
                ...oldCategorys.slice(0, Idx),
                ...oldCategorys.slice(Idx + 1)
            ]);
            alert("카테고리 삭제 완료");
            setShow(false);
        } else {
            alert("카테고리 삭제 취소");
        }
    };

    return (
        <Wrapper>
            <Container>
                <Header>
                    <Title>To Do List</Title>
                </Header>
                <CategoryBox>
                    <BasicCategorys>
                        {
                            CategoryData.map((data) => {
                                return (
                                    <CategoryItem 
                                        key={data.categoriesId} 
                                        categoryId={data.categoriesId} 
                                        nowCategory={NowCategory.categoriesId}
                                        isFocus={isDarks}
                                        onClick={() => onChange(data.categoriesId)}
                                    >{data.categoriesNm}</CategoryItem>
                                );
                            })
                        }
                    </BasicCategorys>
                    <CustomCategorys>
                        {
                            Customs.map((data) => {
                                return (
                                    <CategoryItem
                                        key={data.categoriesId}
                                        categoryId={data.categoriesId}
                                        nowCategory={NowCategory.categoriesId}
                                        isFocus={isDarks}
                                        onClick={() => onChange(data.categoriesId)}
                                    >
                                        {data.categoriesNm}
                                        {Show ? <button onClick={() => DeleteCategory(data.categoriesId)}>삭제</button> : null}
                                    </CategoryItem>
                                );
                            })
                        }
                        {Show ? null : <button onClick={() => setShow(true)}>카테고리 편집</button>}
                        {Show ? <button onClick={AddNewCategory}>추가</button> : null}
                    </CustomCategorys>
                </CategoryBox>
                <ToDoBox>
                    <AddToDo />
                    <EditToDoBtn 
                        isToDos={ToDosLength === 0}
                        onClick={() => setEditMode((prev) => !prev)}
                    >일정 편집</EditToDoBtn>
                    <ToDoList> 
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