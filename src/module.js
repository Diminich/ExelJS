console.log('module');

async function start() {
    return await Promise.resolve('Async worked');
}

start().then(console.log);