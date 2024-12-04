/**
 * 테마 체크 용 isDark
 */

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface I_ToDo {
    ID?: string;
    ToDo?: string;
    Category?: I_Categories["key"];
};

export interface I_Categories {
    key: string;
    value: string;
}

const {persistAtom: saveToDos} = recoilPersist({
    key: "ToDosLocal",
    storage: localStorage
});

const {persistAtom: saveCategories} = recoilPersist({
    key: "CategoryLocal",
    storage: localStorage
});

export const DefaultCategory: I_Categories[] = [
    { key: "ToDo", value: "등록"},
    { key: "Doing", value: "진행"},
    { key: "Done", value: "완료"}
];

export const isDarkThemes = atom({
    key: "isDarkThemes",
    default: false
});

export const SelectCategorys = atom({
    key: "SelectedCategorys",
    default: DefaultCategory[0].key
});

export const CategoryAtom = atom<I_Categories[]>({
    key: "CategoriesBackup",
    default: DefaultCategory,
    effects_UNSTABLE: [saveCategories]
});

export const ToDoAtoms = atom<I_ToDo[]>({
    key: "ToDoOrigin",
    default: [],
    effects_UNSTABLE: [saveToDos]
});

export const ToDoSelectors = selector({
    key: "ToDoSelector",
    get: ({get}) => {
        const originToDos = get(ToDoAtoms);
        const selectedCategory = get(SelectCategorys);
        return originToDos.filter((todo) => todo.Category === selectedCategory);
    }
});