

import { normalize, denormalize, schema } from 'normalizr';

const porcentaje = (num1, num2) => {
    return Math.trunc(100 - ((num2 * 100) / num1));
};



class MessageDTO {
    constructor({author,text,id}) {
        this.author = author,
        this.text = text,
        this.id = id
    }
}

function normalizeMsg(newArray){

    const mensajes = {
        id: '100',
        messages: newArray
    }

    const authorSchema = new schema.Entity("author", {},
        { idAttribute: 'email' }
    );
    const messageSchema = new schema.Entity("message",
        { author: authorSchema, }
    );
    const messagesSchema = new schema.Entity("messages",
        { messages: [messageSchema], }
    );
    const normalizedMessage = normalize(mensajes, messagesSchema);

    const originalLength = JSON.stringify(newArray).length;
    const NormalizadoLength = JSON.stringify(normalizedMessage).length;
    let compression = porcentaje(originalLength, NormalizadoLength);
    return { normalizedMessage, compression };
}

export default {
     getMessageDTO(data) {
        if (Array.isArray(data)) {
            return normalizeMsg(data.map(e => new MessageDTO(e)))
        } else {
            return new MessageDTO(data)
        }
    }
    
}



