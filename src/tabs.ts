import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('studs-tabs')
export class StudsTabs extends LitElement {
  static styles = css`
    nav {
      display: flex;
    }
    nav > ::slotted([slot="tab"]) {
      padding: 1rem 2rem;
      flex: 1 1 auto;
      color: var(--color-darkGrey);
      border-bottom: 2px solid lightgrey;
      text-align: center;
    }
    nav > ::slotted([slot="tab"][selected]) {
      border-color: black;
    }
    ::slotted([slot="panel"]) {
      display: none;
    }

    ::slotted([slot="panel"][selected]) {
      display: block;
    }
  `;

  constructor() {
    super();
    this._tabs = Array.from(this.querySelectorAll('[slot=tab]'));
    this._panels = Array.from(this.querySelectorAll('[slot=panel]'));
    this.selectTab(0);
  }

  selectTab(tabIndex) {
    this._tabs.forEach((tab) => tab.removeAttribute('selected'));
    this._tabs[tabIndex].setAttribute('selected', '');
    this._panels.forEach((panel) => panel.removeAttribute('selected'));
    this._panels[tabIndex].setAttribute('selected', '');
  }

  handleSelect(e) {
    const index = this._tabs.indexOf(e.target);
    this.selectTab(index);
  }

  render() {
    return html`
      <nav>
        <slot name="tab" @click=${(e) => this.handleSelect(e)}></slot>
      </nav>
      <slot name="panel"></slot>
    `;
  }
}
