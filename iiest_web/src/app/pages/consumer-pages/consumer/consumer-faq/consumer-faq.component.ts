import { Component } from '@angular/core';

@Component({
  selector: 'app-consumer-faq',
  templateUrl: './consumer-faq.component.html',
  styleUrls: ['./consumer-faq.component.scss']
})
export class ConsumerFaqComponent {
  faqs = [
    {
      question: 'How can I apply for the new license?',
      answer: 'You can click on the license button as per your requirement, and a chart window will appear for you to place an order. The regulatory advisor team will contact you to assist with your requirement.',
      open: false
    },
    {
      question: 'How does this platform help me?',
      answer: 'It helps you decode all the regulations applicable to your shop as per law without anybody’s help. This will help you to complete all mandatory regulations step by step with a benefit of 6 months duration. You can not only track your renewals of all regulations 3 months before the expiration date but also plan your budget.',
      open: false
    },
    {
      question: 'What is a circular button I can get that will help my food business?',
      answer: 'You can get the latest regulations and order information via video explained by food and law experts.',
      open: false
    },
    {
      question: 'When can I call the regulatory advisors for assistance?',
      answer: 'You can reach the advisor team from Mon-Sat 10 a.m to 6.30 p.m for any assistance. Or you can call your appointed regulatory advisor from the notification window.',
      open: false
    },
    {
      question: 'If I need an expert to visit my outlet, what do I have to do?',
      answer: 'You can book an appointment from the platform via the Expert Consultation button. The Regulatory advisor team will contact you to understand your requirement and send you the right expert.',
      open: false
    },
    {
      question: 'What is the Local officer button?',
      answer: 'It gives you the name of the Food Inspector of your local area. This helps you to identify the right person visiting your shop and helps you to avoid a fraud person trying to pose as a food officer.',
      open: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
