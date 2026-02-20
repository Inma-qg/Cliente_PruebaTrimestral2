import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService, Serie } from '../../services/series.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  series: Serie[] = [];
  loading = true;
  error: string | null = null;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.seriesService.getAll().subscribe({
      next: (response) => {
        
        this.series = Array.isArray(response) ? response : (response.results || response.data || []);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las series. Inténtalo de nuevo.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
