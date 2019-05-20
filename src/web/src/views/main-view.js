import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { store } from '../redux/store';
import i18n from '../i18n/en';

class MainView extends LitElement {
    static get properties() {
        return {
            i18n: { type: Object },
            user: { type: String }
        }
    }

    stateChanged(state) {
        this.user = state.user;
    }

    constructor() {
        super();
        this.i18n = i18n.login;
    }

    render() {
        return html`
            <vaadin-login-form
                    no-forgot-password
                    opened
                    .i18n="${this.i18n}">
            </vaadin-login-form>
        `;
    }
}

customElements.define('main-view', MainView);
