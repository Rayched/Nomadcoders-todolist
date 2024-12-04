import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CategoryAtom, DefaultCategory, I_Categories, isDarkThemes, SelectCategorys, ToDoSelectors } from "./modules/Atoms";
import AddToDo from "./Components/AddToDo";
import ToDoItem from "./Components/ToDoItem";

interface I_CategoryBtn {
    Selected?: string;
}

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Headers = styled.header`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    text-align: center;
    margin: 5px 0px;
`;

const Titles = styled.div`
    text-align: center;
    font-size: 26px;
    padding: 15px 0px;
`;

const CategoryBars = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 5px;
    padding: 10px 20px;
    border: 3px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 15px;
`;

const CategoryTabs = styled.button<I_CategoryBtn>`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0px 5px;
    padding: 3px;
    width: 12vh;
    font-weight: bold;
    font-size: 15px;
    color: ${(props) => props.Selected === props.value ? props.theme.itemTextColor : "inherit"};
    background-color: ${(props) => props.Selected === props.value ? props.theme.itemBorderColor : props.theme.itemBgColor};
    border: 2px solid ${(props) => props.Selected === props.value ? props.theme.itemBorderColor : props.theme.itemBgColor};
    border-radius: 14px;
`;

const AddCategoryBtn = styled.button`
    color: ${(props) => props.theme.itemTextColor};
    border: 3px solid ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.itemBorderColor};
    font-size: 15px;
    border-radius: 25px;

    &:hover {
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.itemBgColor};
    }
`;

const ToDoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
    margin-top: 5px;
`;

const ToDoItems = styled.ul`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;

const Footers = styled.footer`
    display: flex;
    justify-content: center;
`;

const ThemeBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 90%;
    left: 88%;
    width: 6vh;
    height: 6vh;
    border-radius: 25px;
    color: ${(props) => props.theme.itemTextColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    background-color: ${(props) => props.theme.itemBorderColor};
    font-size: 15px;
`;

function Home(){
    const [Darks, setDark] = useRecoilState(isDarkThemes);
    const [nowCategorys, setCategorys] = useRecoilState(SelectCategorys);
    const [Categories, setNewCategory] = useRecoilState(CategoryAtom);
    const ToDos = useRecoilValue(ToDoSelectors);

    //카테고리 탭 전환용 event listener
    const TabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {value}} = event;
        
        if(value === nowCategorys){
            return;
        } else {
            setCategorys(value as I_Categories["key"]);
        }
    };

    //테마 전환용 event listener
    const ChangeThemes = () => setDark(!Darks);

    //커스텀 카테고리 추가 event listener
    const AddNewCategory = () => {
        const Names = prompt("추가하실 카테고리의 이름을 입력해주세요.");

        if(Names !== ""&& Names !== null && Names !== undefined){
           setNewCategory((oldCategory) => {
                return [
                    ...oldCategory,
                    {key: String(Names), value: String(Names)}
                ];
           });
        } else {
            alert("카테고리 이름을 입력하지 않았습니다!");
            return;
        };
    }

    return (
        <MainWrapper key="ToDoList">
            <Headers>
                <Titles>To Do List</Titles>
            </Headers>
            <CategoryBars>
                {
                   Categories.map((todo) => {
                        return (
                            <CategoryTabs  Selected={nowCategorys} value={todo.key} onClick={TabChange}>
                                {todo.value !== todo.key ? `일정 ${todo.value}` : `${todo.value}`}
                            </CategoryTabs>
                        );
                    })
                }
                <AddCategoryBtn onClick={AddNewCategory}>+</AddCategoryBtn>
            </CategoryBars>
            <ToDoWrapper>
                <AddToDo />
                <ToDoItems>
                    {
                        ToDos.map((todo) => {
                            return (
                                <ToDoItem ID={todo.ID} ToDo={todo.ToDo} Category={todo.Category}/>
                            );
                        })
                    }
                </ToDoItems>
            </ToDoWrapper>
            <Footers>
                <ThemeBtn onClick={ChangeThemes}>{Darks ? "Light" : "Dark"}</ThemeBtn>
            </Footers>
        </MainWrapper>
    );
};

/**
 * <CategoryBars>
                <CategoryItems value={Categorys.ToDo} onClick={TabChange} nowTabs={nowCategorys}>일정 등록</CategoryItems>
                <CategoryItems value={Categorys.Doing} onClick={TabChange} nowTabs={nowCategorys}>일정 진행</CategoryItems>
                <CategoryItems value={Categorys.Done} onClick={TabChange} nowTabs={nowCategorys}>일정 완료</CategoryItems>
            </CategoryBars>
 */

export default Home;