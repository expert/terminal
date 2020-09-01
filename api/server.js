const io = require('socket.io')();
const mockup = require('./mockup');

const sendResponse = (socket, id, message) => {
    const chunks = message.split('\n');
    let i = 0, sendChunks, body = '';
    function send() {
        if (i !== chunks.length) {
            sendChunks = setTimeout(() => {
                body += chunks[i] + '\n';
                console.log('must send biody');
                socket.emit('command_response', {id, body});
                ++i;
                send();
            }, 50);
        } else {
            clearTimeout(sendChunks)
        }
    }
    send();
};

io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);

    socket.on('hello!', () => {
        console.log(`hello from ${socket.id}`);
    });
    socket.on('command', (data) => {
        console.log(`got command from ${socket.id}`, data);
        const {id, command} = data;
        const body = mockup[command] ? mockup[command] : `zsh: command not found: ${command}`;
        sendResponse(socket, id, body);
    });

    socket.on('create!', () => {
        console.log(`create from ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    });
});

io.listen(3001);

setInterval(() => {
    io.emit('message', new Date().toISOString());
}, 1000);