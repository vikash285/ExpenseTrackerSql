async function signUp(event) {
    try {
        event.preventDefault()

       const signUpDeatils = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
       }
       console.log(signUpDeatils)

       const res = await axios.post("http://54.172.170.232:3000/userApp/signUp", signUpDeatils)
       if (res.status === 201 ) {
           window.location.href = "../Login/login.html"
       } else {
           throw new Error('Failed to Login')
       }
       
    } catch (err) {
       document.body.innerHTML += `<div style="color:red;">${err}</div>`
    }
}