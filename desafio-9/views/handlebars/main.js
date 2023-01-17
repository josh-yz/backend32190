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
    const { messeges ,compression} = payload;
    
    const data = denormalize(messeges);

    const html = data.messages.map((msg) => {
        return `<div>
        <strong style="color: blue;">${msg.author.email}</strong>
        <strong style="color: brown;">[${msg.author.timestamp}]:</strong>
        <em style="color: green">${msg.text}</em>
        <strong style="color: red;">${msg.author.nombre} ${msg.author.apellido} :(${msg.author.alias}):</strong>
    
              </div>`;
    }).join('');

    document.getElementById('compression').innerHTML = `<p style="color: blue;" class="text-center">  Centro de mensajes Compresión : ${compression} % </p>`;
    document.getElementById("messages").innerHTML = html;
});

function denormalize(data) {
    const authorSchema = new normalizr.schema.Entity("author", {}, { idAttribute: 'email' });
    const messageSchema = new normalizr.schema.Entity("message", {
        author: authorSchema,
    });
    const messagesSchema = new normalizr.schema.Entity("messages", {
        messages: [messageSchema],
    });
    return normalizr.denormalize(data.result, messagesSchema, data.entities);
}
function addMessage(event) {
    event.preventDefault()
    const email= document.getElementById("email").value;

    if(!validateEmail(email)){
        alert('Email no valido!!');
        document.getElementById("email").focus()
        return
    }

    const message = {
        author: {
            nombre : document.getElementById("nombre").value,
            apellido : document.getElementById("apellido").value,
            edad : document.getElementById("edad").value,
            alias : document.getElementById("alias").value,
            avatar : document.getElementById("avatar").value,
            email: email,
            timestamp: new Date().toLocaleString(),
        },
        text: document.getElementById("text").value,
    };
    socket.emit("message-new", message);
    document.getElementById("text").value =''
    document.getElementById("text").focus()
    return;
}

socket.on('disconnect', () => {
    console.log('Perdimos comunicacion con el servidor');
})

