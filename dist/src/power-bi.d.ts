/// <reference types="node" />
import { EventEmitter } from 'events';
import puppeteer from 'puppeteer';
interface options {
    headless?: boolean;
    clientName?: string;
    userDataDir?: string;
    puppeteer?: puppeteer.LaunchOptions & puppeteer.BrowserLaunchArgumentOptions;
    userAgent?: string;
}
export declare class PowerBI extends EventEmitter {
    private options?;
    private headless;
    private userDataDir;
    private userAgent;
    browser: puppeteer.Browser | undefined;
    client: puppeteer.Page | undefined;
    clientName: string;
    isAuthenticated: boolean;
    constructor(options?: options | undefined);
    init(): Promise<this>;
    getAccessToken(): Promise<{
        accessToken: string;
        expiresOn: Date;
    } | undefined>;
    login(email: string, password: string, auth2?: string): Promise<void>;
    on(eventName: 'ready' | 'authenticated', listener: (...args: any[]) => void): this;
    close(): Promise<void>;
}
export {};
