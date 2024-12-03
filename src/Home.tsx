import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categorys, isDarkThemes, SelectCategorys, ToDoSelectors } from "./modules/Atoms";
import AddToDo from "./Components/AddToDo";
import ToDoItem from "./Components/ToDoItem";

interface I_CategoryBtn {
    nowTabs: string;
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
`;

const Titles = styled.div`
    text-align: center;
    font-size: 26px;
    padding: 10px 0px;
`;

const NavBars = styled.div``;

const CategoryBars = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 5px;
    padding: 10px;
    border: 3px solid ${(props) => props.theme.itemBorderColor};
`;

const CategoryItems = styled.button<I_CategoryBtn>`
    display: flex;
    margin: 0px 5px;
    padding: 3px;

    color: ${(props) => props.nowTabs === props.value ? props.theme.itemTextColor : "inherit"};
    background-color: ${(props) => props.nowTabs === props.value ? props.theme.itemBorderColor : props.theme.itemBgColor};
    border: 2px solid ${(props) => props.nowTabs === props.value ? props.theme.itemBgColor : props.theme.itemBorderColor};
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

function Home(){
    const [Darks, setDark] = useRecoilState(isDarkThemes);
    const [nowCategorys, setCategorys] = useRecoilState(SelectCategorys);
    const ToDos = useRecoilValue(ToDoSelectors);

    const TabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {value}} = event;
        
        if(value === nowCategorys){
            return;
        } else {
            setCategorys(value as Categorys);
        }
    }

    const ChangeThemes = () => setDark(!Darks);

    return (
        <MainWrapper key="ToDoList">
            <Headers>
                <Titles>To Do List</Titles>
                <NavBars>
                    <button onClick={ChangeThemes}>{Darks ? "Light" : "Dark"}</button>
                </NavBars>
            </Headers>
            <CategoryBars>
                <CategoryItems value={Categorys.ToDo} onClick={TabChange} nowTabs={nowCategorys}>일정 등록</CategoryItems>
                <CategoryItems value={Categorys.Doing} onClick={TabChange} nowTabs={nowCategorys}>일정 진행</CategoryItems>
                <CategoryItems value={Categorys.Done} onClick={TabChange} nowTabs={nowCategorys}>일정 완료</CategoryItems>
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
        </MainWrapper>
    );
};

export default Home;