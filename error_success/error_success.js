// error 401 --> Unauthorized

// if i will return json, i need to use {Key : "Value"}


/////////////////////////////handle Error///////////////////////////////

const idNotFound = { message : "Id Not Found, Please enter a valid ID" };
const notCreating = { message : "The document was not executed, please try again" };
const updateError = { message : "Id Not Found"};
const errorUserNameOrPassword = {message : "Error invalid UserName or invalid Password"};
const duplicatedUserName = {message : "username exist or check fields or shorter than 8 characters"};
const noTitle = { message : "you should one of { title or tags } and it must have a value" };
const NoTodo = { message : "This Todo does not exist for this user" };

/////////////////////////////handle Success///////////////////////////////

const deleteDone = { message : "Delete one row successfully" };
const updateDone = { message : "Update one row successfully"};
const loginSuccess = {message : "User logged in successfully"}

module.exports = {
    deleteDone,
    updateDone,
    loginSuccess,
    updateError,
    errorUserNameOrPassword,
    duplicatedUserName,
    notCreating,
    idNotFound,
    noTitle,
    NoTodo
}



