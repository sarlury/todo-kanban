import { Component, computed, inject } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading/loading-service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  imports: []
})
export class Loading {
 private loadingService = inject(LoadingService);
 loading$ = computed(() => this.loadingService.loading$);
}
