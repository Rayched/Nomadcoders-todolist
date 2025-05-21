//Theme Setting

interface I_Themes {
    bgColor: string;
    textColor: string;
    itemColor: string;
    itemBoxColor: string;
    itemFocusColor: string;
    itemFocusTextColor: string;
};

export const LightColors: I_Themes = {
    bgColor: "white",
    textColor: "black",
    itemColor: "rgb(223, 228, 234)",
    itemBoxColor: "rgb(213, 214, 215)",
    itemFocusColor: "rgb(164, 176, 190)",
    itemFocusTextColor: "white"
};

export const DarkColors: I_Themes = {
    bgColor: "rgb(47, 54, 64)",
    textColor: "white",
    itemColor: "rgb(87, 96, 111)",
    itemBoxColor: "rgb(53, 59, 72)",
    itemFocusColor: "rgb(164, 176, 190)",
    itemFocusTextColor: "black"
};