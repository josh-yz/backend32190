let socket = io();

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };


socket.on('connect', () => {
    console.log('conectado al servidor');
})

//(emit) le permite emitir eventos personalizados en el servidor y el cliente
socket.emit('products');
socket.on('products-list', (payload) => {
    const { productos } = payload;
    const html = productos.map((product) => {
        return `
              <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.thumbnail}</td>
              </tr>
              `;
    }).join('');
    document.getElementById("data").innerHTML = html;
})
function clearText() {
    document.getElementById("title").value = '';
    document.getElementById("price").value = '';
    document.getElementById("thumbnail").value = ''
}
function addProduct(event) {
    event.preventDefault()
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    socket.emit("product-new", product);
    clearText();
}

socket.emit('messages');
socket.on("messeges-list", (payload) => {
    const { messeges } = payload;
    const html = messeges.map((msg) => {
        return `<div>
               <p style="color:blue;font-weight:600;">${msg.email}</p>
               <p style="color:brown;margin-bottom: 0px;
               margin-top: -15px;
               font-size: 12px;">${msg.date}</p>
               <p style="color:green;font-style: italic;">${msg.text}</p>
              </div>`;
    }).join('');
    document.getElementById("messages").innerHTML = html;
});
function addMessage(event) {
    event.preventDefault()
    const email= document.getElementById("email").value;

    if(!validateEmail(email)){
        alert('Email no valido!!');
        document.getElementById("email").focus()
        return
    }

    const message = {
        email: email,
        text: document.getElementById("text").value,
        date: new Date().toLocaleString(),
    };
    socket.emit("message-new", message);
    document.getElementById("text").value =''
    document.getElementById("text").focus()
    return;
}

socket.on('disconnect', () => {
    console.log('Perdimos comunicacion con el servidor');
})

