import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Montagem } from '../montagem.service';
@Component({
  selector: 'app-edit-montage-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-montage-form.component.html',
  styleUrls: ['./edit-montage-form.component.css']
})
export class EditMontageFormComponent implements OnInit {
  @Input() montage: Montagem | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() montageUpdated = new EventEmitter<Montagem>(); 

  titulo: string = '';
  descricao: string = '';
  urlImagem: string = '';
  totalPecas: number | null = null;
  pecasMontadas: number = 0;
  status: string = 'Pendente';

  statusOptions: string[] = [
    'Pendente',
    'Em andamento',
    'Pausado',
    'Finalizado',
    'Desistido'
  ];

  ngOnInit() {
    if (this.montage) {
      this.titulo = this.montage.nome;
      this.descricao = this.montage.descricao || '';
      this.urlImagem = this.montage.url_imagem || '';
      this.totalPecas = this.montage.progresso_total;
      this.pecasMontadas = this.montage.progresso_atual;
      this.status = this.montage.status;
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onUpdate() {
    if (!this.montage || !this.montage.id) {
      alert('Erro: Montagem não encontrada para atualização.');
      return;
    }
    if (!this.titulo || this.totalPecas === null) {
      alert('Por favor, preencha os campos obrigatórios (Título e Total de Peças).');
      return;
    }

    const montagemAtualizada: Montagem = {
      id: this.montage.id, 
      nome: this.titulo,
      descricao: this.descricao,
      url_imagem: this.urlImagem,
      progresso_atual: this.pecasMontadas,
      progresso_total: this.totalPecas,
      status: this.status
    };

    this.montageUpdated.emit(montagemAtualizada); 
    alert('Montagem atualizada com sucesso!');
    this.closeModal.emit(); 
  }

  onCancel() {
    this.onClose();
  }
}
