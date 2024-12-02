/**
 * 테마 체크 용 isDark
 */

import { atom, selector } from "recoil";

export const enum Categorys {
    ToDo = "ToDo",
    Doing = "Doing",
    Done = "Done"
};

export interface I_ToDo {
    ID?: string;
    ToDo?: string;
    Category?: "ToDo"|"Doing"|"Done";
};

export const isDark = atom({
    key: "isDarks",
    default: false
});

export const ToDoAtoms = atom<I_ToDo[]>({
    key: "ToDoOrigin",
    default: []
});

export const ToDoSelectors = selector({
    key: "ToDoSelector",
    get: ({get}) => {

    }
});