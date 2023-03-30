async function logIn(event) {
    try {

        event.preventDefault(event)
        
        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const res = await axios.post("http://54.172.170.232:3000/userApp/login", loginDetails)
        
            alert(res.data.message)
            localStorage.setItem('token', res.data.token)
            window.location.href = "../ExpenseTracker/index.html"
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    }
}

function forgotPassword () {
    window.location.href = "../ForgotPassword/index.html"
}