import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MontagemService, Montagem } from '../montagem.service';

@Component({
  selector: 'app-new-montage-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-montage-form.component.html',
  styleUrls: ['./new-montage-form.component.css']
})
export class NewMontageFormComponent {
  @Output() closeModal = new EventEmitter<void>();

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

  constructor(private montagemService: MontagemService) {}

  onClose() {
    this.closeModal.emit();
  }

  onCreate() {
    if (!this.titulo || this.totalPecas === null) {
      alert('Por favor, preencha os campos obrigatórios (Título e Total de Peças).');
      return;
    }

    const novaMontagem: Montagem = {
      nome: this.titulo,
      descricao: this.descricao,
      url_imagem: this.urlImagem,
      progresso_atual: this.pecasMontadas, 
      progresso_total: this.totalPecas,  
      status: this.status
    };

    this.montagemService.createMontagem(novaMontagem).subscribe({
      next: (response) => {
        alert('Montagem criada com sucesso!');
        this.closeModal.emit();
      },
      error: (err) => {
        console.error('Erro ao criar montagem:', err);
        alert('Erro ao criar montagem.');
      }
    });
  }

  onCancel() {
    this.onClose();
  }
}
