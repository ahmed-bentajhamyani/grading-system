import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { Grade } from 'src/app/models/grade';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questions: any;
  grade: any;
  answers: Answer[] = [];
  grades: Grade[] = [];

  constructor(private apollo: Apollo, private service: ServiceService) { }

  ngOnInit() {
    this.getQuestions();
    this.grades = []
  }

  getQuestions() {
    this.apollo
      .watchQuery({
        query: gql`
          query { 
            questions{ 
              questionId 
              question 
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.questions = result.data?.questions;
        console.log(this.questions)
      });
  }

  onValueChange(question_id: any, event: Event) {
    const newAnswer: Answer = {
      question_id: question_id,
      answer: (event.target as any).value
    };
    this.answers.push(newAnswer);
  }

  sendAnswers() {
    this.service.setAnswers(this.answers);
    this.answers = []
  }
}
