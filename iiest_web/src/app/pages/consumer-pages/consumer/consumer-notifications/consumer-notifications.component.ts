import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consumer-notifications',
  templateUrl: './consumer-notifications.component.html',
  styleUrls: ['./consumer-notifications.component.scss']
})
export class ConsumerNotificationsComponent {
  public driveVideoUrl: string = 'https://drive.google.com/file/d/1isI_YuozFcDhLjV4IVgfmVCFVnrILZFx/view?usp=drive_link';
  public trustedVideoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {
    this.trustedVideoUrl = this.getEmbedUrl(this.driveVideoUrl);
  }

  getEmbedUrl(url: string): SafeResourceUrl | null {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
    }
    return null;
  }
}
