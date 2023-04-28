import {Component, inject, OnInit} from '@angular/core';
import {OpenAiService} from '../open-ai.service';
import {Payload} from '../models/payload';
import {API_URL} from '../tokens';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // providers: [
  //   {
  //     provide: API_URL,
  //     useValue: 'https://example.com'
  //   }
  // ]
})
export class MainComponent implements OnInit {
  completions: string[] = [];
  isLoading = false;

  apiUrl = inject(API_URL);

  constructor(
    private openAIService: OpenAiService
  ) { }

  ngOnInit(): void {
    console.log(this.apiUrl)
    this.openAIService.getModels().subscribe(console.log)
  }

  search(prompt: string) {
    this.isLoading = true;
    const payload: Payload = {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100
    }
    this.openAIService.getCompletions(payload).subscribe({
      next: value => {
        this.completions = value;
        this.isLoading = false
      },
      error: err => console.error(err),
      complete: () => this.isLoading = false
    })
  }
}
