import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {ActivatedRoute} from "@angular/router";
import {EventosService} from "@app/services/eventos/eventos.service";
import {Evento} from "@app/models/evento.model";

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post' as any;

  get f(): any {
    return this.form.controls
  }

  get bsConfig(): any {
     return {
       isAnimated: true,
       adaptivePosition: true,
       dateInputFormat: 'DD/MM/YYYY hh:mm a',
       containerClass: 'theme-default'
     }
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventosService) {
    this.localeService.use('pt-br')
  }

  loadEvento(): void {
    //this.spinner.show()
    const eventoIdParam =  this.router?.snapshot?.paramMap?.get('id')
    if(eventoIdParam != null) {
      this.estadoSalvar = 'put'
     this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento)=> {
          this.evento = {...evento} //Object.assign({}, evento)
          this.form.patchValue(this.evento)
        },
        (error: any)=> {
          alert("erro ao tentar carregar")
          //this.spinner.hide()
          console.log(error)
        },
        ()=> {} //this.spinner.hide()
     )
    }
  }


  ngOnInit(): void {
    this.loadEvento()
    this.validation();
  }

  saveEvento(): void {
    if(this.form.valid) {
      if(this.estadoSalvar === 'post') {
        this.evento = {...this.form.value}
        this.eventoService['post'](this.evento).subscribe(
          ()=> alert("Evento salvo com sucesso"),
          (error)=> {
            console.log(error)
          },
          ()=> {}
        )
      } else {
        this.evento = {id: this.evento.id,...this.form.value}
        this.eventoService.put(this.evento).subscribe(
          ()=> alert("Evento atualizado com sucesso"),
          (error)=> {
            console.log(error)
          },
          ()=> {}
        )
      }
    }

  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imageURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

}
