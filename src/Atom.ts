import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface I_Category {
    categoriesId: string;
    categoriesNm: string;
};

export interface I_ToDoData {
    ToDoId: string;
    ToDoNm: string;
    Category: string;
};

const {persistAtom: ToDosPersist} = recoilPersist({
    key: "ToDosSave",
    storage: localStorage
});

const {persistAtom: CategoryPersist} = recoilPersist({
    key: "CustomCategorySave",
    storage: localStorage
});

export const BasicCategory: I_Category[] = [
    {categoriesId: "ToDo", categoriesNm: "일정 등록"},
    {categoriesId: "Doing", categoriesNm: "일정 진행"},
    {categoriesId: "Done", categoriesNm: "일정 완료"}
];

export const NowCategories = atom<I_Category>({
    key: "NowCategoryAtom",
    default: BasicCategory[0]
});

export const CustomCategories = atom<I_Category[]>({
    key: "CustomCategoryAtom",
    default: [],
    effects_UNSTABLE: [CategoryPersist]
});

export const ToDos_Atom = atom<I_ToDoData[]>({
    key: "ToDosAtom",
    default: [],
    effects_UNSTABLE: [ToDosPersist]
});

export const ToDoSelector = selector({
    key: "ToDos_Selector",
    get: ({get}) => {
        const ToDosData = get(ToDos_Atom);
        const NowCategory = get(NowCategories).categoriesId;

        return ToDosData.filter((todoData) => todoData.Category === NowCategory);
    },
    set: ({set}, ModifyData) => {
        set(ToDos_Atom, ModifyData);
    }
});

export const AllCategories = selector({
    key: "AllCategorySelector",
    get: ({get}) => {
        const Customs = get(CustomCategories);
        
        const AllCategory = BasicCategory.concat(Customs);

        return AllCategory;
    },
});

export const ThemeAtoms = atom({
    key: "ThemeAtom",
    default: false
});