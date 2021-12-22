import { createI18n } from 'vue-i18n';

export default createI18n({
    locale: 'br',
    fallbackLocale: 'br',
    messages: {
        br: require('./br.json'),
    },
});
