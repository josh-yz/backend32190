const API = 'http://localhost:8080'


async function login(event) {
    event.preventDefault()
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;

    let response = await fetch(`${API}/api/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

        window.location.href = "home";
    


    return;
}

