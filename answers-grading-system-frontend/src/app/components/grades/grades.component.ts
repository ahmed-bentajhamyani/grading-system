import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Grade } from 'src/app/models/grade';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent {
  questions: any;
  answers: any;
  grade: any;
  grades: any;
  corr_answers: any;

  constructor(private apollo: Apollo, private service: ServiceService) { }

  ngOnInit() {
    this.getQuestions();
    this.getGrades();
    this.getCorrAnswers();
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

  getAnswers() {
    this.answers = this.service.getAnswers();
  }

  getGrades() {
    this.grades = []
    this.getAnswers();
    for (let answer of Object.values(this.answers)) {
      this.getGrade(answer);
    }
  }

  getGrade(answer: any) {
    this.apollo
      .mutate({
        mutation: gql`
      mutation($questionId: Int!, $answer: String!) {
        recoverAnswer(questionId: $questionId, answer: $answer) {
          questionId
          answer
          grade
        }
      }
    `,
        variables: {
          questionId: answer.question_id,
          answer: answer.answer
        },
      })
      .subscribe(({ data }) => {
        this.grade = data;
        this.grade = this.grade.recoverAnswer;
        const newGrade: Grade = {
          question_id: this.grade.questionId,
          answer: this.grade.answer,
          grade: this.grade.grade
        };
        this.grades.push(newGrade);
      });
  }

  getCorrAnswers() {
    this.apollo
      .watchQuery({
        query: gql`
          query { 
            corrAnswers{ 
              questionId 
              answer 
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.corr_answers = result.data?.corrAnswers;
      });
  }

  resetGrades() {
    // this.service.clearAnswers();
  }
}
