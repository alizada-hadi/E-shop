
const user = JSON.parse(localStorage.getItem('user'))


const default_config = {
    headers : {
        'Content-type' : "application/json",
        Authorization : `Bearer ${user ? user.token : ""}`
    }
}

const file_config = {
    headers : {
        'Content-type' : "multipart/form-data",
        Authorization : `Bearer ${user ? user.token : ""}`
    }
}

const config = {
    default_config, 
    file_config
}

export default config