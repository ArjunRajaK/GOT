import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent {
  @Input() width!: string;
  @Input() height!: string;
}
