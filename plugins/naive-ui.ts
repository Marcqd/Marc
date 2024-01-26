import {defineNuxtPlugin} from "#app";
import {setup} from "@css-render/vue3-ssr";
import naive, {createDiscreteApi} from "naive-ui";
export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const {collect} = setup(nuxtApp.vueApp);
        nuxtApp.ssrContext!.renderMeta = () => {
            return {
                headTags: collect(),
            };
        };
    }
    nuxtApp.vueApp.use(naive);
    if(process.client){
        const {message, notification, dialog, loadingBar} = createDiscreteApi(
            ['message', 'dialog', 'notification', 'loadingBar']
        )
        return {
            provide: {message, notification, dialog, loadingBar}
        }
    }
});