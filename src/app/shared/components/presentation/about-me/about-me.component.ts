import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextTypping } from './text-typping';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  @ViewChild('about_me_info_with_dimensions', { static: true }) containerInfoHidden!: ElementRef;
  @ViewChild('about_me_info_without_dimensions', { static: true }) containerInfo!: ElementRef;

  spans: TextTypping[];
  isTyppingNow: boolean;
  textContent: string[];

  constructor() {
    this.spans = [
      { isTypping: false, isWaitting: true, text: '' },
      { isTypping: false, isWaitting: true, text: '' },
      { isTypping: false, isWaitting: true, text: '' },
      { isTypping: false, isWaitting: true, text: '' },
      { isTypping: false, isWaitting: true, text: '' },
    ];
    this.isTyppingNow = false;
    this.textContent = [
      'Hard work, perseverance, frustration tolerance and a pinch of ambition, are the ingredients of the recipe I have followed to build my profile as a ',
      'Full Stack Developer',
      '.',
      "Yes, a lot of Full Stack, but do you know how to design? First of all, I love all the fellow designers I've had. Maybe that's why sometimes I like to design and spend hours and hours with Figma. Self-love, Who knows.",
      'I try to keep my profile in balance, developing projects from scratch. Starting with the design of the interface and the subsequent development of the application both frontend and backend.',
    ];
  }
  ngOnInit() {
    this.TypeWriter();
  }
  ngAfterViewInit() {
    this.resizeContainerInfo();
  }

  resizeContainerInfo() {
    const { height } = this.containerInfoHidden.nativeElement.getBoundingClientRect();
    this.containerInfo.nativeElement.style.height = `${height}px`;
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async cursorWaitting(span: TextTypping) {
    while (span.isWaitting) {
      span.isTypping = false;
      await this.delay(400);
      span.isTypping = true;
      await this.delay(400);
    }
    span.isTypping = false;
  }
  async TypeWriter() {
    this.isTyppingNow = true;
    for (let i = 0; i < this.spans.length; i++) {
      for (let j = 0; j < this.textContent[i].length; j++) {
        this.spans[i].isTypping = true;
        const char = this.textContent[i].split('')[j];
        this.spans[i].text += char;
        switch (char) {
          case '.':
          case '?':
            this.spans[i].isWaitting = true;
            this.cursorWaitting(this.spans[i]);
            await this.delay(500);
            this.spans[i].isWaitting = false;
            this.spans[i].isTypping = false;
            break;
          case ',':
            this.spans[i].isWaitting = true;
            this.cursorWaitting(this.spans[i]);
            await this.delay(800);
            this.spans[i].isWaitting = false;
            this.spans[i].isTypping = false;
            break;
          default:
            await this.delay(50);
            this.spans[i].isTypping = false;
        }
      }
    }
    this.spans[this.spans.length - 1].isWaitting = true;
    this.cursorWaitting(this.spans[this.spans.length - 1]);
    await this.delay(2000);
    this.isTyppingNow = false;
    this.spans[this.spans.length - 1].isWaitting = false;
  }
  @HostListener('window:resize')
  onResize() {
    this.resizeContainerInfo();
  }
}
