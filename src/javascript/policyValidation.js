//policyName
export function policyName(pName){
    if(pName.trim() === ""){
        return [false,"Enter Policy Name"];
    }
    else if(!/^[a-zA-Z\s]+$/.test(pName)){
        return [false,"Invalid Policy Name"];
    }
    else{
        return[true];
    }
};

//policyDate
export function policyDate(date){
    const pDate = new Date(date);
    const current_date = new Date();
    if(pDate<current_date){
        return [false,"Don't select past dates"];
    }
    else if(date.trim()===""){
        return [false,"Select a date"];
    }
    else{
        return[true];
    }
};

//Description
export function policyDescription(pDescription){
    if(pDescription.trim() === ""){
        return [false,"Enter the policy description"];
    }
    else if(!/^[a-zA-Z0-9.,;-\s]+$/.test(pDescription)){
        return [false,"Invalid policy description"];
    }
    else{
        return[true];
    }
};