//To Do List Light/Dark 테마 설정

interface I_themes {
    textColor: string;
    bgColor: string;
    itemTextColor: string;
    itemBgColor: string;
    itemBorderColor: string;
}

export const LightTheme: I_themes = {
    textColor: "black",
    bgColor: "white",
    itemTextColor: "black",
    itemBgColor: "#9AECDB",
    itemBorderColor: "#58B19F"
};

export const DarkTheme: I_themes = {
    textColor: "white",
    bgColor: "#2c2c54",
    itemTextColor: "white",
    itemBgColor: "#474787",
    itemBorderColor: "#3B3B98"
};
