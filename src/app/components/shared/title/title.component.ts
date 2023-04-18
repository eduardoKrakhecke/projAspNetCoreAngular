import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
//@Input() title: string;
// No componente [title]="'Evento'"
  public title: string = ''
  public subtitle: string = ''
  public iconClass: string = ''
  public btnListar: boolean = false;

  constructor(private router: Router) {
  }

  @Input()
  set text(name: string) {
    this.title = name
  }

  get name(): string {
    return this.title
  }

  @Input()
  set textSubtitle(txtSubtitle: string) {
    this.subtitle = txtSubtitle
  }

  get txtSubtitle(): string {
    return this.subtitle
  }

  @Input()
  set textIconClass(txtIconClass: string) {
    this.iconClass = txtIconClass
  }

  get txtIconClass(): string {
    return this.iconClass
  }

  @Input()
  set buttonList(btnList: boolean) {
    this.btnListar = btnList
  }

  get btnList(): boolean {
    return this.btnListar
  }

  listar(): void {
    this.router.navigate([`/${this.title.toLocaleLowerCase()}/lista`])
  }






}
