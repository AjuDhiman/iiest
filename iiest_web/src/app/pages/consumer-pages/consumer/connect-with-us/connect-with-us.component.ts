import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-connect-with-us',
  templateUrl: './connect-with-us.component.html',
  styleUrls: ['./connect-with-us.component.scss'],
})
export class ConnectWithUsComponent implements OnInit {
  consumer = JSON.parse(localStorage.getItem('consumer') || '{}');

  @Input() senderType: 'shop' | 'agent' = 'shop';
  @Input() boId: string = '';
  @Input() senderId: string = '';
  @Input() shopId: string | null = '';

  @ViewChild('chatBox') chatBox!: ElementRef;
  userInput = '';
  messages: any[] = [];
  selectedFile: File | null = null;
  faArrowLeft = faArrowLeft;

  constructor(
    private getDataService: GetdataService,
    private registerService: RegisterService,
    private cdRef: ChangeDetectorRef,
            private router: Router,
    
  ) {}

  ngOnInit(): void {
    console.log('senderType==>', this.senderType);
    if (!this.shopId) {
      this.shopId = this.registerService.getShopId();
    }

    if (!this.senderId || !this.boId) {
      const consumer = JSON.parse(localStorage.getItem('consumer') || '{}');
      this.senderId = consumer._id;
      this.boId = consumer.iiest_member_id;
      this.senderType = 'shop';
    }
    if (this.shopId) {
      this.getDataService.getMessagesBySender(this.shopId).subscribe({
        next: (res: any) => {
          this.messages = res.messages || [];
          this.cdRef.detectChanges(); // manually trigger change detection
          this.scrollToBottom(); // now safe to scroll
        },
        error: (err) => {
          console.error('Failed to load sender messages:', err);
        },
      });
    }

    // this.getDataService.getMessagesByBoId(this.boId).subscribe({
    //   next: (res: any) => {
    //     this.messages = res.messages || [];
    //   },
    //   error: (err) => {
    //     console.error('Failed to load messages:', err);
    //   }
    // });

    this.messages.push({
      senderType: this.senderType === 'shop' ? 'agent' : 'shop',
      message: 'Hi there! How can I help you today?',
      timestamp: new Date(),
    });
    this.cdRef.detectChanges();
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatBox) {
          this.chatBox.nativeElement.scrollTop =
            this.chatBox.nativeElement.scrollHeight;
        }
      }, 100); // wait for DOM to render
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const msgPayload = {
      shopId: this.shopId,
      boId: this.boId,
      senderId: this.senderId,
      senderType: this.senderType,
      message: this.userInput,
    };

    this.messages.push({ ...msgPayload, timestamp: new Date() });
    this.cdRef.detectChanges();
    this.scrollToBottom();

    this.getDataService.saveChatMessage(msgPayload).subscribe({
      next: (res: any) => console.log('Message saved to DB:', res),
      error: (err: any) => console.error('Failed to save message:', err),
    });

    setTimeout(() => {
      this.messages.push({
        senderType: this.senderType === 'shop' ? 'agent' : 'shop',
        message: `Thanks for your message: "${msgPayload.message}"`,
        timestamp: new Date(),
      });
      this.cdRef.detectChanges();
      this.scrollToBottom();
    }, 1000);

    this.userInput = '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadChatFile();
    }
  }

  uploadChatFile() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('boId', this.boId);
    formData.append('senderId', this.senderId);
    formData.append('senderType', this.senderType);
    formData.append('file', this.selectedFile);
    formData.append('message', this.userInput);
    if (this.shopId) {
      formData.append('shopId', this.shopId);
    }
    console.log('formdata=>');
    this.getDataService.saveChatMessage(formData).subscribe({
      next: (res: any) => {
        this.messages.push({
          senderType: this.senderType,
          message: '📎 File uploaded: ' + this.selectedFile?.name,
          file: res.data?.file,
          timestamp: new Date(),
        });
        this.selectedFile = null;
        this.cdRef.detectChanges();
        this.scrollToBottom();
      },

      error: (err: any) => {
        console.error('File upload failed:', err);
        this.selectedFile = null;
      },
    });
  }
    goBack() {
      this.router.navigate(['/consumer-dashboard']);
    }
}
