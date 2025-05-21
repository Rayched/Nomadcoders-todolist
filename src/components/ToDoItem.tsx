import styled from "styled-components";
import { AllCategories, CustomCategories, I_ToDoData, NowCategories, ToDos_Atom, ToDoSelector } from "../Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

interface I_ToDoItemProps {
    todoId: string;
    isShowCategoryBtn: boolean;
    setShowCategoryBtn: Function;
}

interface I_EditModeProps {
    isShow: boolean;
}

interface I_Forms {
    category?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 18em;
    padding: 5px;
    margin: 5px 0px;
    background: rgb(220, 221, 225);
    border: 2px solid rgb(220, 221, 225);
    border-radius: 15px;
`;

const ToDoDatas = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ToDoText = styled.div<I_EditModeProps>`
    width: ${(props) => props.isShow ? "12em" : "100%"};
    padding: 0px 5px;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
`;

const DeleteBtn = styled.button<I_EditModeProps>`
    display: ${(props) => props.isShow ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 28px;
    background-color: rgb(255, 107, 129);
    border: 0px;
    border-radius: 30px;
`;

const Logos = styled.svg`
    width: 70%;
    height: 70%;
`;

const CategoryBox = styled.div<I_EditModeProps>`
    display: ${(props) => props.isShow ? "flex" : "none"};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

const CategoryForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
`;

const CategorySelect = styled.select``;
const EditCategoryBtn = styled.button``;

function ToDoItem({todoId, isShowCategoryBtn, setShowCategoryBtn}: I_ToDoItemProps){
    const originToDos = useRecoilValue(ToDos_Atom);
    const [GetToDos, setToDos] = useRecoilState(ToDoSelector);
    const Idx = GetToDos.findIndex((data) => data.ToDoId === todoId);

    const ToDoData = GetToDos[Idx];

    const {register, handleSubmit} = useForm();

    const Customs = useRecoilValue(CustomCategories);
    const NowCategorys = useRecoilValue(NowCategories);
    const AllCategory = useRecoilValue(AllCategories);

    const ToDoDelete = () => {
        const isDelete = window.confirm(`'${ToDoData.ToDoNm}' 일정을 삭제하겠습니까?`)

        if(isDelete){
            const targetIdx = originToDos.findIndex((data) => data.ToDoId === todoId);

            const EditToDos: I_ToDoData[] = [
                ...originToDos.slice(0, targetIdx),
                ...originToDos.slice(targetIdx + 1)
            ];

            setToDos(EditToDos);
            alert("일정 삭제 완료");
        } else {
            alert("일정 삭제 취소");
            return;
        }
    };

    const ChangeCategory = ({category}: I_Forms) => {
        const CategoryInfo = AllCategory.find((data) => data.categoriesNm == category);
        const targetIdx = originToDos.findIndex((data) => data.ToDoId === todoId);

        const EditToDo: I_ToDoData = {
            ToDoId: originToDos[targetIdx].ToDoId,
            ToDoNm: originToDos[targetIdx].ToDoNm,
            Category: String(CategoryInfo?.categoriesId)
        };

        setToDos(() => [
            ...originToDos.slice(0, targetIdx),
            EditToDo,
            ...originToDos.slice(targetIdx + 1)
        ]);

        setShowCategoryBtn(false);
    }

    return (
        <Container key={ToDoData.ToDoId}>
            <ToDoDatas>
                <ToDoText isShow={isShowCategoryBtn}>{ToDoData.ToDoNm}</ToDoText>
                <DeleteBtn isShow={isShowCategoryBtn} onClick={ToDoDelete}>
                    <Logos xmlns="http://www.w3.org/2000/Logos" height="10" width="7.5" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </Logos>
                </DeleteBtn>
            </ToDoDatas>
            <CategoryBox isShow={isShowCategoryBtn}>
                <div>카테고리 변경</div>
                <CategoryForm onSubmit={handleSubmit(ChangeCategory)}>
                    <CategorySelect {...register("category")}>
                        <optgroup label="기본 카테고리">
                            {
                                AllCategory.map((data, idx) => {
                                    if(idx <= 2 && data.categoriesId !== NowCategorys.categoriesId){
                                        return <option key={data.categoriesId}>{data.categoriesNm}</option>
                                    } else {
                                        return;
                                    }
                                })
                            }
                        </optgroup>
                        <optgroup className="customs" label="커스텀 카테고리">
                            {
                                AllCategory.map((data, idx) => {
                                    if(idx > 2 && data.categoriesId !== NowCategorys.categoriesId){
                                        return <option key={data.categoriesId}>{data.categoriesNm}</option>
                                    } else {
                                        return;
                                    }
                                })
                            }
                        </optgroup>
                    </CategorySelect>
                    <EditCategoryBtn>변경</EditCategoryBtn>
                </CategoryForm>
            </CategoryBox>
        </Container>
    );
};

export default ToDoItem;