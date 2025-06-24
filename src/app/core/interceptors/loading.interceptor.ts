import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req', req.method)
    return next.handle(req).pipe(
      tap((event) => {
        console.log('event', event)
        if (event instanceof HttpResponse) {
            
            this.messageService.add({
              severity: 'success',
              summary: 'Berhasil',
              detail: 'Data berhasil diproses.',
              life: 3000
            });
        }
      }),

      catchError((error: HttpErrorResponse) => {
        let msg = 'Terjadi kesalahan.';

        if (error.status === 0) {
          msg = 'Tidak dapat terhubung ke server.';
        } else if (error.status === 404) {
          msg = 'Data tidak ditemukan (404).';
        } else if (error.status === 500) {
          msg = 'Kesalahan server (500).';
        } else if (error.error?.message) {
          msg = error.error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Gagal',
          detail: msg,
          life: 5000
        });

        return throwError(() => error);
      })
    );
  }
}
