import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';

class MainView extends LitElement {
    render() {
        return html`
            <vaadin-email-field
                    placeholder="User">
            </vaadin-email-field>
            <vaadin-password-field
                    placeholder="Password">
            </vaadin-password-field>
            <vaadin-button>
                Login
            </vaadin-button>
            <vaadin-login-overlay opened no-forgot-password></vaadin-login-overlay>
        `;
    }
}

customElements.define('main-view', MainView);
