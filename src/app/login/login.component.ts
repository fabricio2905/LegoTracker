    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { Router } from '@angular/router'; 

    @Component({
      selector: 'app-login', 
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css'],
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    export class LoginComponent {
      username: string = '';
      password: string = '';

      constructor(private router: Router) {}

      onLogin() {
        if (this.username === 'admin' && this.password === '123456') {
          alert('Login bem-sucedido!');
          this.router.navigate(['/home']);
        } else {
          alert('Erro: Usuário ou senha inválidos.');
        }
      }
    }
    