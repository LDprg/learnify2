import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'learnify2',
    webDir: 'build',
    bundledWebRuntime: false,
    server: {
        allowNavigation: []
    },
    plugins: {
        CapacitorCookies: {
            enabled: true,
        },
        CapacitorHttp: {
            enabled: true
        }
    }
};

export default config;