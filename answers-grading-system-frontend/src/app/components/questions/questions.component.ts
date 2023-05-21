import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { Answers } from 'src/app/models/answers';
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
  Answers: Answers = {
    1: { question_id: 1, answer: "" },
    2: { question_id: 2, answer: "" },
    3: { question_id: 3, answer: "" },
    4: { question_id: 4, answer: "" },
    5: { question_id: 5, answer: "" },
    6: { question_id: 6, answer: "" },
    7: { question_id: 7, answer: "" },
    8: { question_id: 8, answer: "" },
    9: { question_id: 9, answer: "" },
    10: { question_id: 10, answer: "" }
  }

  constructor(private apollo: Apollo, private service: ServiceService) { }

  ngOnInit() {
    this.getQuestions();
    this.reserAnswers();
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
      });
  }

  onValueChange(question_id: any, event: Event) {
    this.Answers[question_id as keyof typeof this.Answers].answer = (event.target as any).value;
  }

  sendAnswers() {
    this.service.setAnswers(this.Answers);
    this.reserAnswers();
  }

  reserAnswers() {
    this.Answers = {
      1: { question_id: 1, answer: "" },
      2: { question_id: 2, answer: "" },
      3: { question_id: 3, answer: "" },
      4: { question_id: 4, answer: "" },
      5: { question_id: 5, answer: "" },
      6: { question_id: 6, answer: "" },
      7: { question_id: 7, answer: "" },
      8: { question_id: 8, answer: "" },
      9: { question_id: 9, answer: "" },
      10: { question_id: 10, answer: "" }
    }
  }
}
