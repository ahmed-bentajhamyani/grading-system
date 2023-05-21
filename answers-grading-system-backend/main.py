from fastapi import FastAPI
import strawberry
from strawberry.asgi import GraphQL
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from static.models.all_models import predict

# https://www.tutorialspoint.com/fastapi/fastapi_using_graphql.htm tuto


@strawberry.type
class Question:
    question_id: int
    question: str


@strawberry.type
class Answer:
    question_id: int
    answer: str


@strawberry.type
class Grade:
    question_id: int
    answer: str
    grade: int


@strawberry.type
class Mutation:
    @strawberry.mutation
    def recover_answer(self, question_id: int, answer: str) -> Grade:
        grade = predict(question_id, answer)
        new_answer = Grade(question_id=question_id, answer=answer, grade=grade)
        return new_answer


@strawberry.type
class Query:
    @strawberry.field
    def questions(self) -> List[Question]:
        return [
            Question(
                question_id=1,
                question="ما هي الفترة التي حكم فيها سلالة الأدارسة المغرب؟",
            ),
            Question(
                question_id=2,
                question="ما هي المدينة التي بناها الإدريسيون وأصبحت عاصمة السلالة بعد وليلي؟",
            ),
            Question(question_id=3, question="من هم المرابطون؟"),
            Question(
                question_id=4, question="ما هي العوامل التي ساعدت في نمو المرابطين؟"
            ),
            Question(question_id=5, question="من هم الموحدون المغاربة؟"),
            Question(
                question_id=6, question="ما هي مدة حكم السلطان أحمد المنصور الذهبي؟"
            ),
            Question(
                question_id=7,
                question="ما هو سبب نفى الملك محمد الخامس من طرف السلطات الفرنسية؟",
            ),
            Question(
                question_id=8, question="في أي قرن تم الفتح الإسلامي لبلاد المغرب؟"
            ),
            Question(
                question_id=9,
                question="من تولى الحكم بعد وفاة السلطان عبد الملك الأول؟",
            ),
            Question(question_id=10, question="متى اعتمد علم بلاد المغرب بشكل رسمي؟"),
        ]

    @strawberry.field
    def corr_answers(self) -> List[Answer]:
        return [
            Answer(
                question_id=1,
                answer="حكمت سلالة الأدارسة المغرب من 789 إلى 974 ميلادية.",
            ),
            Answer(
                question_id=2,
                answer="بعد وليلي، بنى الإدريسيون مدينة فاس وأصبحت عاصمة السلالة.",
            ),
            Answer(
                question_id=3,
                answer="المرابطون هم سلالة جديدة في الحكم والاستحواذ على أجزاء من المنطقة المغاربية، حكموا في جميع أنحاء المغرب العربي والأندلس وعينوا مراكش عاصمة لهم.",
            ),
            Answer(
                question_id=4,
                answer="ساعدت العوامل الدينية والعسكرية في نمو المرابطين، حيث كانوا ينتمون إلى الصوفية القادرية وكانوا يعتبرون أنفسهم حماة للإسلام والمسلمين، كما أنهم كانوا يتمتعون بالقوة العسكرية الكبيرة والقدرة على السيطرة على المنطقة.",
            ),
            Answer(
                question_id=5,
                answer="الموحدون المغاربة هم حركة دينية وسياسية نشأت في المغرب في القرن الثاني عشر الميلادي.",
            ),
            Answer(
                question_id=6,
                answer="حكم السلطان أحمد المنصور الذهبي لحوالي الربع قرن.",
            ),
            Answer(
                question_id=7,
                answer="سبب نفى الملك محمد الخامس من طرف السلطات الفرنسية هو امتناعه عن توقيع الظهائر والمصادقة على قرارات الإقامة العامة واتجاهه العلني نحو اتخاذ موقف مساند لسياسة حزب الاستقلال.",
            ),
            Answer(
                question_id=8,
                answer="تم الفتح الإسلامي لبلاد المغرب في القرن السابع، في عام 647 م.",
            ),
            Answer(
                question_id=9,
                answer="بعد وفاة السلطان عبد الملك الأول تولى الحكم أخوه السلطان أحمد المنصور.",
            ),
            Answer(question_id=10, answer="اعتمد علم بلاد المغرب بشكل رسمي سنة 1915م."),
        ]


schema = strawberry.Schema(query=Query, mutation=Mutation)

graphql_app = GraphQL(schema)
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/", graphql_app)
app.add_websocket_route("/", graphql_app)
