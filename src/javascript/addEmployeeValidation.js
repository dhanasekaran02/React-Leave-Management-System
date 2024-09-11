//first name
export function firstName(fname){
    if(fname.trim() === ""){
        return [false,"Enter Firstname"];
    }
    else if(!/^[a-zA-Z" "]+$/.test(fname.trim())){
        return [false,"Invalid FirstName"];
    }
    else{
        return [true]
    }
};

//last name
export function lastName(lname){
    if(lname.trim() === ""){
        return [false,"Enter lastname"];
    }
    else if(!/^[a-zA-Z]+$/.test(lname)){
        return [false,"Invalid Lastname"];
    }
    else{
        return [true]
    }
};

//DOB
export function dateOfBirth(date){
    if(date.trim() === ""){
        return [false,"Select a date"];
    }
    const pDate = new Date(date);
    console.log(pDate);
    const current_date = new Date();

    if(pDate>=current_date){
        return [false,"Choose past date"];
    }
    else{
        return [true];
    }
};

//phone number
export function phoneNumber(phone){
    if(phone.trim() === ""){
        return [false,"Enter Phone number"];
    }
    else if(!/^[0-9]{10}$/.test(phone)){
        return [false,"Invaild phonenumber"];
    }
    else{
        return [true];
    }
};

//designation
export function Designation(desig){
    if(desig.trim() === ""){
        return [false,"Select designation"];
    }
    else{
        return [true];
    }
};

//department name
export function departmentName(dept_name){
    if(dept_name.trim() === ""){
        return [false,"Enter Department name"];
    }
    else if(!/^[a-zA-Z]+$/.test(dept_name)){
        return [false,"Invalid department name"];
    }
    else{
        return [true];
    }
}
//company mail
export function companyMail(mail){
    if(mail.trim() === ''){
        return [false,"Enter Emailid"];
    }
    else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail)){
        return [false,"Invalid Emailid"];
    }
    else{
        return [true];
    }
};

//password
export function passwordEmployee(pwd){
    if(pwd.trim() === ''){
        return [false,"Enter Password"];
    }
    else if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(pwd)){
        return [false,"Invalid Password"];
    }
    else{
        return [true];
    }
};

//department head
export function departmentHead(dept_head){
    if(dept_head.trim() === ""){
        return [false,"Select Department head"];
    }
    else{
        return [true];
    }
};