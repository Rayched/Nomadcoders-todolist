import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDark, ToDoAtoms } from "../modules/Atoms";
import ToDoForm from "./ToDoForm";
import ToDoItems from "./ToDoItem";

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

const CategoryItems = styled.div`
    display: flex;
    margin: 0px 5px;
    padding: 3px;
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
`;

const ToDoWrapper = styled.div``;

const ToDoList = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;

function Home(){
    const [Darks, setDark] = useRecoilState(isDark);
    const ToDos = useRecoilValue(ToDoAtoms);

    const ChangeThemes = () => setDark(!Darks);
    return (
        <MainWrapper>
            <Headers>
                <Titles>To Do List</Titles>
                <NavBars>
                    <button onClick={ChangeThemes}>{Darks ? "Light" : "Dark"}</button>
                </NavBars>
            </Headers>
            <CategoryBars>
                <CategoryItems>일정 등록</CategoryItems>
                <CategoryItems>일정 진행</CategoryItems>
                <CategoryItems>일정 완료</CategoryItems>
            </CategoryBars>
            <ToDoWrapper>
                <ToDoForm />
                <ToDoList>
                    <ul>
                        {
                            ToDos?.map((todos) => {
                                return <ToDoItems ID={todos.ID} ToDo={todos.ToDo} Category={todos.Category}/>
                            })
                        }
                    </ul>
                </ToDoList>
            </ToDoWrapper>
        </MainWrapper>
    );
};

export default Home;