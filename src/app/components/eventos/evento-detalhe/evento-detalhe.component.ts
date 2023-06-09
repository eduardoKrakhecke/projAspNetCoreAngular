import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from "@angular/forms";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {ActivatedRoute, Router} from "@angular/router";
import {EventosService} from "@app/services/eventos/eventos.service";
import {Evento} from "@app/models/evento.model";
import {Lote} from "@app/models/lote.model";
import {LotesService} from "@app/services/lotes/lotes.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup;
  evento = {} as Evento;
  eventoId: number;
  estadoSalvar = 'post' as any;
  loteAtual = {id: 0, nome: '', indice: 0}

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put'
  }

  get lotes(): FormArray {
  return this.form.get('lotes') as FormArray
  }

  get f(): any {
    return this.form.controls
  }

  get bsConfig(): any {
     return {
       isAnimated: true,
       adaptivePosition: true,
       dateInputFormat: 'DD/MM/YYYY',
       containerClass: 'theme-default'
     }
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private loteService: LotesService,
    private eventoService: EventosService) {
    this.localeService.use('pt-br')
  }

  loadEvento(): void {
    //this.spinner.show()
    this.eventoId  =  Number(this.activateRouter?.snapshot?.paramMap?.get('id'))
    if(this.eventoId != null && this.eventoId !== 0) {
      this.estadoSalvar = 'put'
     this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento)=> {
          this.evento = {...evento} //Object.assign({}, evento)
          this.form.patchValue(this.evento)
          this.evento.lotes.forEach(lote => {
            this.lotes.push(this.criarLote(lote))
          })
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
          (eventoResponse)=> {
            alert("Evento salvo com sucesso")
              this.router.navigate([`eventos/detalhe/${eventoResponse.id}`])
          },
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

  salvarLote(): void {
    console.log(this.form.controls)
   if(this.form.controls?.['lotes'].valid) {
      this.loteService.saveLote(this.eventoId, this.form.value.lotes).subscribe(
        ()=> {
          alert("Lote salvo com sucesso!")
          //this.lotes.reset()
        },
        (error)=> {
          console.log(error)
        },
        ()=> {}
      )
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
      lotes: this.fb.array([])
    });
  }

  adionarLote(): void {
    this.lotes.push(
      this.criarLote({id: 0} as Lote)
    )
  }

  criarLote(lote: Lote): FormGroup {
   return  this.fb.group({
     id: [lote.id],
     nome: [lote.nome, Validators.required],
     preco: [lote.preco, Validators.required],
     quantidade: [lote.quantidade, Validators.required],
     dataInicio: [lote.dataInicio],
     dataFim: [lote.dataFim]
   })
  }

  mudarValorData(value: Date, i: number, campo: string): void {
    this.lotes.value[i][campo] = value
  }

  retornaTituloLote(value: string): string {
   return  value === null || value === '' ? 'Nome do lote' : value
  }

  removerLote(template: TemplateRef<any>, indice: number): void {
     this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
     this.loteAtual.id = this.lotes.get(indice + '.id')?.value
     this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value
     this.loteAtual.indice = indice
     this.lotes.removeAt(indice);
  }

  confirmDeleteLote(): void {
    this.modalRef.hide()
    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
      ()=> {
        this.lotes.removeAt(this.loteAtual.id)
      },
      (error)=> {
        console.log(error)
      },
      ()=> {}
    )
  }

  declineDeleteLote(): void {
    this.modalRef.hide()
  }

  public resetForm(): void {
    this.form.reset();
  }

}
