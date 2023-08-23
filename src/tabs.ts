import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './tabs.scss?inline';

export interface TabProps {
  selectedIndex?: number;
  tabDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  variant: 'line' | 'contained';
}

@customElement('studs-tabs')
export class StudsTabs extends LitElement {
  static styles = unsafeCSS(style);
  private _tabs: Element[] = [];
  private _panels: Element[] = [];

  @property({ type: Number }) selectedIndex?: TabProps["selectedIndex"];
  @property({ type: String }) tabDirection?: TabProps["tabDirection"];
  @property({ type: String }) variant?: TabProps["variant"];


  firstUpdated() {
    this._tabs = Array.from(this.querySelectorAll('[slot=tab]'));
    this._panels = Array.from(this.querySelectorAll('[slot=panel]'));
    this.selectTab(this.selectedIndex || 0);
  }

  selectTab(tabIndex: number): void {
    this._tabs.forEach((tab) => this.toggleSelected(tab, false));
    this._panels.forEach((panel) => this.toggleSelected(panel, false));
    this.toggleSelected(this._tabs[tabIndex], true);
    this.toggleSelected(this._panels[tabIndex], true);
  }

  toggleSelected(element: Element, isSelected: boolean): void {
    if (isSelected) {
      element.setAttribute('selected', '');
    } else {
      element.removeAttribute('selected');
    }
  }

  handleSelect = (e: Event): void => {
    const index = this._tabs.indexOf(e.target as Element);
    this.selectTab(index);
  }

  render() {
    return html`
      <nav style="flex-direction: ${this.tabDirection || 'row'}">
        <slot name="tab" @click=${this.handleSelect}></slot>
      </nav>
      <slot name="panel"></slot>
    `;
  }
}