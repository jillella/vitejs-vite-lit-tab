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
      text-align: center;
      border: none;
      background-color: transparent;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      outline: none;
      border-bottom: 2px solid #ccc;
      color: #555;
      transition: 0.3s;
    }
    nav > ::slotted([slot="tab"][selected]) {
      border-color: #ff5308;
    }
    ::slotted([slot="panel"]) {
      display: none;
    }

    ::slotted([slot="panel"][selected]) {
      display: block;
    }
  `;

  private _tabs: Element[] = [];
  private _panels: Element[] = [];

  firstUpdated() {
    this._tabs = Array.from(this.querySelectorAll('[slot=tab]'));
    this._panels = Array.from(this.querySelectorAll('[slot=panel]'));
    this.selectTab(0);
  }

  selectTab(tabIndex: number): void {
    this._tabs.forEach((tab) => tab.removeAttribute('selected'));
    this._tabs[tabIndex].setAttribute('selected', '');
    this._panels.forEach((panel) => panel.removeAttribute('selected'));
    this._panels[tabIndex].setAttribute('selected', '');
  }

  handleSelect(e: Event): void {
    const index = this._tabs.indexOf(e.target as Element);
    this.selectTab(index);
  }

  render() {
    return html`
      <nav>
        <slot name="tab" @click=${(e: Event) => this.handleSelect(e)}></slot>
      </nav>
      <slot name="panel"></slot>
    `;
  }
}
