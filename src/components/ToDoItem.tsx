import styled from "styled-components";
import { AllCategories, CustomCategories, I_ToDoData, NowCategories, ToDos_Atom, ToDoSelector } from "../Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

interface I_ToDoItemProps {
    todoId: string;
    isShowCategoryBtn: boolean;
    setShowCategoryBtn: Function;
}

interface I_CategoryBox {
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
    padding: 5px;
    margin: 5px 0px;
    border: 2px solid black;
`;

const ToDoDatas = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ToDoText = styled.span`
    padding: 0px 5px;
`;

const DeleteBtn = styled.button``;

const CategoryBox = styled.div<I_CategoryBox>`
    display: ${(props) => props.isShow ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
`;

const CategoryForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
                <ToDoText>{ToDoData.ToDoNm}</ToDoText>
                <DeleteBtn onClick={ToDoDelete}>삭제</DeleteBtn>
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