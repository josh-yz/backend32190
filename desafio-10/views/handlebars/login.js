const API = 'http://localhost:8080'


async function login(event) {
    event.preventDefault()
    const name= document.getElementById("user").value;

    let response = await fetch(`${API}/api/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    });
    if(response.status == 200){
        window.location.href = "home";
    }


    return;
}

