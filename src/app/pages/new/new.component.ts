import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  serieForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.serieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      channel: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  get title() { return this.serieForm.get('title')!; }
  get channel() { return this.serieForm.get('channel')!; }
  get rating() { return this.serieForm.get('rating')!; }

  onSubmit(): void {
    if (this.serieForm.invalid) return;

    this.submitting = true;
    this.errorMessage = null;

    const payload = {
      title: this.title.value,
      channel: this.channel.value,
      rating: Number(this.rating.value)
    };

    this.seriesService.create(payload).subscribe({
      next: (response) => {
        const id = response.id || response._id || JSON.stringify(response);
        this.successMessage = `Serie creada correctamente. ID devuelto: ${id}`;
        this.submitting = false;
        // Redirigir a /home tras 2 segundos
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Error al crear la serie. Inténtalo de nuevo.';
        this.submitting = false;
        console.error(err);
      }
    });
  }
}
