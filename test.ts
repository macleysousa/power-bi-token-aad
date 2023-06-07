import { PowerBI } from './index'

const auth = new PowerBI({
    clientName: 'suporte',
    headless: false
})

auth.init();

auth.on('ready', () => {
    console.log('ready')

    console.log(auth.isAuthenticated);
    if (!auth.isAuthenticated)
        auth.login('suporte@hardylingerie.onmicrosoft.com', 'HardyL741')
})

auth.on('authenticated', (accessToken) => {
    console.log('authenticated', accessToken)

    //auth.close();
});
