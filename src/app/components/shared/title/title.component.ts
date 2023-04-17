import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
//@Input() title: string;
// No componente [title]="'Evento'"
 public title: string = ''

  @Input()
  set text(name: string) {
    this.title = name
  }
  get name(): string {
    return this.title
  }

}
