import { Observable } from "rxjs";

export default class PWAServise {
    constructor() {}
    checkInstall() {
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        }
        var _window_navigator: any = window.navigator;
        const isInStandaloneMode = ()=>('standalone' in _window_navigator)&&(_window_navigator.standalone);
        if (isIos() && !isInStandaloneMode()) return true;
        var result = false;
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            result = true;
        } else if (_window_navigator.standalone || isStandalone) {
            result = true;
        }
        return result;
    }
    onInstall() {
        return new Observable((subscribe)=>{
            var actual = false;
            setInterval(()=>{
                const isIos = () => {
                    const userAgent = window.navigator.userAgent.toLowerCase();
                    return /iphone|ipad|ipod/.test(userAgent);
                }
                var _window_navigator: any = window.navigator;
                const isInStandaloneMode = ()=>('standalone' in _window_navigator)&&(_window_navigator.standalone);
                if (isIos() && !isInStandaloneMode() && !actual) {
                    actual = true;
                    subscribe.next();
                }
            }, 1500);
        });
    }
}