const ModifyNumber = (modifyTargets: number) => {
    if(modifyTargets < 10){
        return "0" + String(modifyTargets);
    } else {
        return String(modifyTargets);
    }
}

export function getNowDate(){
    const Dates = new Date();

    const Years = String(Dates.getFullYear());
    const Month = ModifyNumber(Dates.getMonth() + 1);
    const DateNumber = ModifyNumber(Dates.getDate());

    return [Years, Month, DateNumber];
};