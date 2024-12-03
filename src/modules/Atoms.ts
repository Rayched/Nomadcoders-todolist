/**
 * 테마 체크 용 isDark
 */

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const enum Categorys {
    ToDo = "ToDo",
    Doing = "Doing",
    Done = "Done"
};

export interface I_ToDo {
    ID?: string;
    ToDo?: string;
    Category?: Categorys;
};

interface I_Categories {
    categoryNm: string;
    categoryValue: string;
};

//커스텀 카테고리 등록을 위한 새로운 카테고리 배열
const Categories: I_Categories[] = [
    {categoryNm: "ToDo", categoryValue: "일정 등록"}, 
    {categoryNm: "Doing", categoryValue: "일정 진행"}, 
    {categoryNm: "Done", categoryValue: "일정 완료"}
];

/**
 * 사용자로 부터 커스텀 카테고리를 입력 받고
 * Array.push()와 같은 배열에 요소를 추가하는 메서드를 이용해서
 * 입력 값을 categoryNm, categoryValue 속성에 전달하면
 * 새로운 커스텀 카테고리를 추가할 수 있지 않을까..?
 * 아직 생각만 한거고, 실제로 적용하지는 않았다.
 * 이게 될지는 모르겠다...
 */

export const isDarkThemes = atom({
    key: "isDarkThemes",
    default: false
});

export const SelectCategorys = atom({
    key: "SelectedCategorys",
    default: Categorys.ToDo
});

const {persistAtom} = recoilPersist({
    key: "ToDoLocal",
    storage: localStorage
})

export const ToDoAtoms = atom<I_ToDo[]>({
    key: "ToDoOrigin",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const ToDoSelectors = selector({
    key: "ToDoSelector",
    get: ({get}) => {
        const originToDos = get(ToDoAtoms);
        const selectedCategory = get(SelectCategorys);
        return originToDos.filter((todo) => todo.Category === selectedCategory);
    }
});