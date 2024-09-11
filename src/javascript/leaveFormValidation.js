let start,end;
//Leave type
export function leaveTypeValid(value){
    const leave_type =  value
    if(leave_type.trim() === ""){
        return [false,"Select the Leave Type"];
    }
    else{
        return [true];
    }
};

//Start Date
export function startDate(value){
    const start_date = value;
    const current_date = new Date();
    const selected_date = new Date(start_date);
    if(selected_date<current_date){
        return [false,"Select future dates"];
    }
    else if(start_date.trim() === ""){
        return [false,"Select a date"];
    }
    else{
        start = selected_date;
        return [true];
    }

};

//end Date
export function endDate(value){
    const end_date = value;
    const current_date = new Date();
    const selected_date = new Date(end_date);
    if(end_date<current_date){
        return [false,"Select future date"];
    }
    else if(end_date.trim() === ""){
        return [false,"Select date"];
    }
    else{
        end = end_date;
        console.log("this is the start and end date in js :",start,end)
        return [true];
    }
};

//calculate days
export function calculateDay(){
    let start_date = start;
    let end_date = end;
    let sDate = new Date(start_date);
    let eDate = new Date(end_date);
    let smonth = sDate.getMonth() + 1;
    let emonth = eDate.getMonth() +1;
    let current_date = new Date();
    let date = Math.abs(eDate.getDate()-sDate.getDate()+1);
    if(sDate>=current_date && eDate>=sDate){
        if(emonth-smonth === 1 && eDate.getDate() > sDate.getDate()){
            const month = emonth - smonth;
            date = month * (30) + date;
            return [true,date]
        }
        else if(emonth-smonth > 1){
            const month = emonth - smonth;
            date = month * (30) + date;
            return [true,date]
        }
        return [true,date]
    }
    else{
        return [false,"End date should be higher than start date"]
    }
};

//manager
export function managerValid(value){
    const manag = value;
    if(manag.trim() === ""){
        return [false,"Select a manager"];
    }
    else{
        return [true];
    }
};

//suggestion
export function suggest(value){
    const Suggest = value;
    if(Suggest.trim() === ""){
        return [false,"Suggest an employee"];
    }
    else{
        return [true];
    }
};

export function reasonToLeave(value){
    const Reason = value;
    if(Reason.trim() === ""){
        return [false,"Enter the reason to take leave"];
    }
    else{
        return [true];
    }
};

export function leaveName(leave_name){
    if(leave_name.trim() === ""){
        return [false,"Enter a leave name"];
    }
    else if(!/^[a-zA-Z\s]+$/.test(leave_name)){
        return [false,"Invalid leave Name"];
    }
    else{
        return [true];
    }
};

//holiday name
export function holidayName(hName){
    if(hName.trim() === ""){
        return [false,"Enter the holiday name"];
    }
    else if(!/^[a-zA-Z\s]+$/.test(hName)){
        return [false,"Invalid holiday name"];
    }
    else{
        return[true];
    }
};

//holiday date
export function holidayDate(hDate){
    const current_date = new Date();
    const selected_date = new Date(hDate);
    console.log(hDate);
    console.log(selected_date);

    if(selected_date<current_date){
        return [false,"Don't select past dates"];
    }
    else if(hDate === ""){
        return [false,"Select a date"];
    }
    else{
        return [true];
    }
};

export function holidayDescription(hDescrip){
    if(hDescrip.trim() === ""){
        return [false,"Enter the description"];
    }
    else if(!/^[a-zA-Z\s]+$/.test(hDescrip)){
        return [false,"Invalid description"];
    }
    else{
        return [true];
    }
};