import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDark, ToDoAtoms, ToDoSelectors } from "../modules/Atoms";
import ToDoForm from "./ToDoForm";
import ToDoItems from "./ToDoItem";
import { useEffect, useState } from "react";
import { inherits } from "util";
import { updatePropertySignature } from "typescript";
import ToDoItem from "./ToDoItem";

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
    color: ${(props) => props.name === props.nowTabs ? props.theme.itemTextColor: "inherits"};
    background-color: ${
        (props) => props.name === props.nowTabs ? 
        props.theme.itemBorderColor : props.theme.itemBgColor
    };

    border: 2px solid ${
        (props) => props.name === props.nowTabs ? 
        props.theme.itemBgColor : props.theme.itemBorderColor};
`;

const ToDoWrapper = styled.div``;

const ToDoList = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;

function Home(){
    const [Darks, setDark] = useRecoilState(isDark);
    const [ToDo, Doing, Done] = useRecoilValue(ToDoSelectors);

    const [Tabs, setTabs] = useState("ToDo");

    const TabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        if(Tabs === name){
            return;
        } else {
            setTabs(name);
        }
    }

    const ChangeThemes = () => setDark(!Darks);

    useEffect(() => console.log(Tabs));
    
    return (
        <MainWrapper>
            <Headers>
                <Titles>To Do List</Titles>
                <NavBars>
                    <button onClick={ChangeThemes}>{Darks ? "Light" : "Dark"}</button>
                </NavBars>
            </Headers>
            <CategoryBars>
                <CategoryItems name="ToDo" onClick={TabChange} nowTabs={Tabs}>일정 등록</CategoryItems>
                <CategoryItems name="Doing" onClick={TabChange} nowTabs={Tabs}>일정 진행</CategoryItems>
                <CategoryItems name="Done" onClick={TabChange} nowTabs={Tabs}>일정 완료</CategoryItems>
            </CategoryBars>
            <ToDoWrapper>
                <ToDoForm />
                <ToDoList>
                    <ul>
                        {Tabs === "ToDo" ? ToDo.map((todo) => <ToDoItem ID={todo.ID} ToDo={todo.ToDo} Category={todo.Category} />): null}
                        {Tabs === "Doing" ? Doing.map((todo) => <ToDoItem ID={todo.ID} ToDo={todo.ToDo} Category={todo.Category} />): null}
                        {Tabs === "Done" ? Done.map((todo) => <ToDoItem ID={todo.ID} ToDo={todo.ToDo} Category={todo.Category} />): null}
                    </ul>
                </ToDoList>
            </ToDoWrapper>
        </MainWrapper>
    );
};

export default Home;