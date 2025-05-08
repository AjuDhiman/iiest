import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faDownload,
  faFileWord,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consumer-food-doc',
  templateUrl: './consumer-food-doc.component.html',
  styleUrls: ['./consumer-food-doc.component.scss'],
})
export class ConsumerFoodDocComponent {
  faFileWord: IconDefinition = faFileWord;
  faDownload: IconDefinition = faDownload;
  faArrowLeft = faArrowLeft;

  constructor(private router: Router) {}
  wordFiles = [
    {
      name: 'Incoming Material Inspection',
      url: 'assets/pdf-assets/IncomingMaterialInspection.docx',
      icon: 'assets/pdf-icon.png',
      type: 'word',
    },
    {
      name: 'Personal Hygiene Monitoring',
      url: 'assets/pdf-assets/Personal Hygiene Monitoring.docx',
      icon: 'assets/pdf-icon.png',
      type: 'word',
    },
    {
      name: 'Stock Monitoring Record',
      url: 'assets/pdf-assets/Stock Monitoring Record.docx',
      icon: 'assets/pdf-icon.png',
      type: 'word',
    },
    {
      name: 'Take AwayFood Inspection',
      url: 'assets/pdf-assets/Take AwayFood_Inspection.docx',
      icon: 'assets/pdf-icon.png',
      type: 'word',
    },
    {
      name: 'Thawing Temp.',
      url: 'assets/pdf-assets/Thawing Temp..docx',
      icon: 'assets/pdf-icon.png',
      type: 'word',
    },
  ];

  downloadFile(fileUrl: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop()!;
    link.click();
  }
  goBack() {
    this.router.navigate(['/consumer-dashboard']);
  }
}
