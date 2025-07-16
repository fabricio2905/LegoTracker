import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewMontageFormComponent } from '../new-montage-form/new-montage-form.component';
import { EditMontageFormComponent } from '../edit-montage-form/edit-montage-form.component';
import { MontagemService, Montagem } from '../montagem.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NewMontageFormComponent, EditMontageFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showNewMontageModal: boolean = false;
  showEditMontageModal: boolean = false;
  montageToEdit: Montagem | null = null;

  selectedStatus: string = 'Todos os status';
  statusOptions: string[] = [
    'Todos os status',
    'Pendente',
    'Em andamento',
    'Pausado',
    'Finalizado',
    'Desistido'
  ];

  montagens: Montagem[] = [];
  displayMontagens: Montagem[] = [];

  constructor(
    private montagemService: MontagemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMontagens();
  }

  loadMontagens() {
    this.montagemService.getMontagens().subscribe({
      next: (data) => {
        this.montagens = [...data];
        this.filterMontagens();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar montagens:', err);
        alert('Erro ao carregar montagens. Verifique o console.');
      }
    });
  }

  filterMontagens() {
    if (this.selectedStatus === 'Todos os status') {
      this.displayMontagens = [...this.montagens];
    } else {
      this.displayMontagens = this.montagens.filter(
        (montagem) => montagem.status === this.selectedStatus
      );
    }
    this.cdr.detectChanges();
  }

  onNovaMontagem() {
    this.showNewMontageModal = true;
  }

  onStatusChange() {
    this.filterMontagens();
  }

  onCardStatusChange(montagem: Montagem) {
    if (montagem.id === undefined) {
      alert('Erro: ID da montagem não encontrado para atualização de status.');
      return;
    }

    const index = this.montagens.findIndex(m => m.id === montagem.id);
    if (index !== -1) {
      this.montagens[index] = { ...montagem }; 
      this.filterMontagens(); 
      this.cdr.detectChanges(); 
    }
  }

  onEdit(montagemId: number | undefined) {
    if (montagemId === undefined) {
      alert('Erro: ID da montagem não encontrado para edição.');
      return;
    }
    this.montageToEdit = this.montagens.find(m => m.id === montagemId) || null;
    if (this.montageToEdit) {
      this.showEditMontageModal = true;
    }
  }

  onMontageEdited(updatedMontage: Montagem) {
    const index = this.montagens.findIndex(m => m.id === updatedMontage.id);
    if (index !== -1) {
      this.montagens[index] = updatedMontage; 
      this.filterMontagens(); 
      this.cdr.detectChanges(); 
    }
    this.onCloseEditMontageModal(); 
  }


  onDelete(montagemId: number | undefined) {
    if (montagemId === undefined) {
      alert('Erro: ID da montagem não encontrado para exclusão.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir esta montagem?')) {
      this.montagens = this.montagens.filter(montagem => montagem.id !== montagemId);
      this.filterMontagens();
      this.cdr.detectChanges();

      alert('Montagem excluída com sucesso!');
    }
  }

  onCloseNewMontageModal() {
    this.showNewMontageModal = false;
    this.loadMontagens();
  }

  onCloseEditMontageModal() {
    this.showEditMontageModal = false;
    this.montageToEdit = null;
  }

  getProgressoPorcentagem(progressoAtual: number, progressoTotal: number): number {
    if (progressoTotal === 0) return 0;
    return (progressoAtual / progressoTotal) * 100;
  }

  getCorStatus(status: string): string {
    switch (status) {
      case 'Em andamento':
        return '#ff9800';
      case 'Finalizado':
        return '#4caf50';
      case 'Pendente':
        return '#2196f3';
      case 'Pausado':
        return '#ffc107';
      case 'Desistido':
        return '#f44336';
      default:
        return '#607d8b';
    }
  }
}
