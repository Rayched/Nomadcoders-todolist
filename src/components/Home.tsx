import styled from "styled-components";
import { BasicCategory, I_Category, NowCategories, ToDos_Atom, ToDoSelector } from "../Atom";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AddToDo from "./AddToDo";
import { getNowDate } from "../modules/getNowDate";
import { useEffect } from "react";

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
`;

const ToDoItems = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export function Home(){
    const CategoryData = BasicCategory;
    const ToDos = useRecoilValue(ToDoSelector);
    const [NowCategory, setNowCategory] = useRecoilState(NowCategories);

    const onChange = (Id: string) => {
        if(NowCategory.categoriesId === Id){
            return;
        } else {
            const Idx = CategoryData.findIndex((data) => data.categoriesId === Id);
            setNowCategory(() => {
                const DataFormat: I_Category = {
                    categoriesId: CategoryData[Idx].categoriesId,
                    categoriesNm: CategoryData[Idx].categoriesNm
                };
                return DataFormat;
            });
        }
    }

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
                    <button>편집</button>
                </CategoryBox>
                <ToDoBox>
                    <AddToDo />
                    <ToDoItems>
                        <div className="ItemsTitle">일정 목록</div>
                        <ul>
                            {
                                ToDos.map((data) => {
                                    return (
                                        <li key={data.ToDoId}>
                                            {data.ToDoNm}
                                            <select className="categorySwitch">
                                                <option>카테고리 선택</option>
                                                <optgroup className="categories">
                                                    {data.Category === CategoryData[0].categoriesId ? null : <option key={CategoryData[0].categoriesId}>{CategoryData[0].categoriesNm}</option>}
                                                    {data.Category === CategoryData[1].categoriesId ? null : <option key={CategoryData[1].categoriesId}>{CategoryData[1].categoriesNm}</option>}
                                                    {data.Category === CategoryData[2].categoriesId ? null : <option key={CategoryData[2].categoriesId}>{CategoryData[2].categoriesNm}</option>}
                                                </optgroup>
                                            </select>
                                            <button onClick={() => window.confirm(`'${data.ToDoNm}' 일정을 삭제하겠습니까?`)}>삭제</button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </ToDoItems>
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