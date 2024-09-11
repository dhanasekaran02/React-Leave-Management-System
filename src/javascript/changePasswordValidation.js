export function currentPassword(curPwd,loggedPwd){
    if(curPwd != loggedPwd){
        return [false,"Enter the current password"];
    }
    else if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(curPwd)){
        return [false,"<ul><li>Password Contains At least 8 characters</li><li>It should contain special character and Capital letter</li></ul>"];
    }
    else{
        return [true];
    }
}

export function newPassword(newPwd,oldPwd){
    if(newPwd === ""){
        return [false,'Enter new password'];
    }
    else if(newPwd== oldPwd){
        return [false,'Don\'t enter old password'];
    }
    else if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(newPwd)){
        return [false,"Password Contains At least 8 characters It should contain special character and Capital letter"];
    }
    else{
        return [true];
    }
}

export function confirmNewPassword(confnewPwd,newPwd){
    if(confnewPwd === ""){
        return [false,'Enter new password'];
    }
    else if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(confnewPwd)){
        return [false,"Password Contains At least 8 characters</li><li>It should contain special character and Capital letter"];
    }
    else if(confnewPwd != newPwd){
        return [false,'Password doesn\'t match with new password'];
    }
    else{
        return [true];
    }
}