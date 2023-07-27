import { EventEmitter } from 'events';
import * as path from 'path';
import puppeteer from 'puppeteer';

interface options {
    headless?: boolean;
    clientName?: string;
    userDataDir?: string;
    puppeteer?: puppeteer.LaunchOptions & puppeteer.BrowserLaunchArgumentOptions;
    userAgent?: string;
}

export class PowerBI extends EventEmitter {
    private headless: boolean = this.options?.headless ?? true;
    private userDataDir: string = this.options?.userDataDir ?? './.power-bi';
    private userAgent: string = this.options?.userAgent ?? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) PowerBI/2.87.821.0 Chrome/87.0.4280.141 Electron/11.2.1 Safari/537.36';

    public browser: puppeteer.Browser | undefined;
    public client: puppeteer.Page | undefined;
    public clientName: string = this.options?.clientName ?? 'client';
    public isAuthenticated: boolean = false;

    constructor(private options?: options) {
        super();
    }

    public async init(): Promise<this> {
        this.browser = await puppeteer.launch({
            ...this.options?.puppeteer,
            headless: this.headless,
            userDataDir: path.resolve(this.userDataDir + '\\' + `${this.options?.clientName ?? 'client'}`),
            args: this.options?.puppeteer?.args ?? ['--disable-dev-shm-usage', '--no-sandbox']
        });
        this.client = (await this.browser.pages())[0];

        await this.client.setUserAgent(this.userAgent);

        await this.client.goto('https://app.powerbi.com/');

        await this.client.waitForTimeout(1000 * 2);

        const hasPowerBITeamsAppInstallationInfo = await this.client.evaluate(() => {
            return localStorage.getItem('PowerBITeamsAppInstallationInfo') !== null;
        });

        if (hasPowerBITeamsAppInstallationInfo)
            await this.getAccessToken();

        this.emit('ready', undefined);

        return this;
    }

    public async getAccessToken(): Promise<{ accessToken: string, expiresOn: Date } | undefined> {

        if (!this.client) {
            throw new Error('Session not initialized');
        }

        await this.client.reload();

        await this.client.waitForTimeout(1000 * 1);

        const powerBIAccess = await this.client.evaluate(() => {
            return { accessToken: eval(`powerBIAccessToken`), expiresOn: eval(`powerBIAccessTokenExpiry`) };
        }).then((data) => data).catch(() => undefined);

        if (powerBIAccess) {
            this.isAuthenticated = true;
            this.emit('authenticated', powerBIAccess);
        }

        return powerBIAccess;
    }

    public async login(email: string, password: string, auth2?: string): Promise<void> {
        if (!this.client) {
            throw new Error('Session not initialized');
        }

        const page = this.client;
        page.goto('https://app.powerbi.com/singleSignOn?ru=https%3A%2F%2Fapp.powerbi.com%2F%3FnoSignUpCheck%3D1');

        try {
            await page.waitForNavigation();
            const hasAuth = await this.getAccessToken();

            if (!hasAuth) {
                await page.waitForSelector('input#email', { visible: true });
                await page.type('input#email', email);

                await page.waitForSelector('button#submitBtn', { visible: true });
                await page.click('button#submitBtn');

                await page.waitForNavigation();

                await page.waitForTimeout(1000 * 2);

                await page.waitForSelector('input[type="password"]', { visible: true });
                await page.type('input[type="password"]', password);

                await page.waitForSelector('input[type="submit"]', { visible: true });
                await page.click('input[type="submit"]');

                await page.waitForNavigation();

                if (auth2) {
                    await page.waitForSelector('input[type="tel"]', { visible: true });
                    await page.type('input[type="tel"]', auth2);

                    await page.waitForSelector('input[type="submit"]', { visible: true });
                    await page.click('input[type="submit"]');

                    await page.waitForNavigation();
                }

                await page.goto('https://app.powerbi.com/');

                await page.waitForTimeout(1000);

                await this.getAccessToken();
            }

        } catch (err) {
            this.emit('error', { err, screenshot: await page.screenshot(), });
            throw err;
        }

    }

    public async close(): Promise<void> {
        await this.client?.close();
        await this.browser?.close();
    }

    on(eventName: 'ready' | 'authenticated' | 'error', listener: (...args: any[]) => void) {
        return super.on(eventName, listener);
    }
}
