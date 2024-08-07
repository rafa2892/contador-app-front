import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserAuth } from '../security/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/login';  // URL de tu backend
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(user:UserAuth): Observable<boolean> {

    console.log("usuario :  Servicio", user.usuario);
    console.log("pass : Servicio", user.clave);

    return this.http.post<{ token: string }>(`${this.apiUrl}`, user)
      .pipe(

        map(response => {
          // Guardar el token en el almacenamiento local (o en otro lugar seguro)
          localStorage.setItem('authToken', response.token);
          this.loggedIn = true;
          return true;
        }),

        catchError(() => {
          this.loggedIn = false;
          return of(false);
        })
      );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    // Aquí podrías verificar el token si es necesario
    return !!localStorage.getItem('authToken');
  }

  // Opcional: Método para obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
