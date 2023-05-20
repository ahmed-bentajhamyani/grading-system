<p align="center">
	<img src="https://user-images.githubusercontent.com/101653735/202849820-dfeaabcf-4dd9-4452-a847-5a767462fd9d.png" >
</p>

# ML Project : Arabic Automated short answers grading system

Arabic Automated short answers grading system for **Moroccan history**, the idea behind this system is to give the adequate grade to the students according to their answers, the system should be in Arabic, and you should prepare your own dataset.

- Scraping data from several sources: Arabic websites, Datasets, books, etc.
- Establishment of Arabic Natural language processing pipeline.
- Word embedding and encoding.
- Model Training based on classical machine learning algorithms.
- Evaluation of the models then the choice of the best one
- Model deployment and consumption via spa web application.

**Tools :** FastAPI, GraphQL, Angular, Tailwindcss, Docker, Github, Scrapy, NLTK, Word2Vec.

## Table of contents
[Backend of our Application](#backend-of-our-application)
* [FastAPI](#fastapi)
* [GraphQL](#graphql)
* [Docker](#docker)

[Frontend of our Application](#frontend-of-our-application)
* [Angular](#angular)
* [GraphQL](#graphql)
* [Docker](#docker)

[Testing the Application](#testing-the-application)
* [Home Page](#home-page)
* [Question Page](#question-page)
* [Result Page](#result-page)

[Creators](#creators)

## Backend of our Application

### FastAPI

For the backend we choose **FastAPI** framework ****because it’s fast to learn and to use.

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/d54468fd-2ef0-42bf-bfe5-8afe5809d66e" >
</p>

First we create a virtual environment :

```
python -m venv venv
```

We have to activate the new virtual environment by executing the command :

```
venv/Scripts/Activate.ps1
```

Concerning the python libraries we used, this is the `requirements.txt` file of our backend application :

```
anyio==3.6.2
click==8.1.3
colorama==0.4.6
fastapi==0.95.1
gensim==4.3.1
graphql-core==3.2.3
h11==0.14.0
httptools==0.5.0
idna==3.4
joblib==1.2.0
nltk==3.8.1
numpy==1.24.3
pandas==2.0.1
pydantic==1.10.7
python-dateutil==2.8.2
python-dotenv==1.0.0
pytz==2023.3
PyYAML==6.0
regex==2023.5.5
scikit-learn==1.2.2
scipy==1.10.1
six==1.16.0
smart-open==6.3.0
sniffio==1.3.0
starlette==0.26.1
strawberry-graphql==0.177.1
threadpoolctl==3.1.0
tqdm==4.65.0
typing_extensions==4.5.0
tzdata==2023.3
uvicorn==0.22.0
watchfiles==0.19.0
websockets==11.0.3
```

### GraphQL

To send request from the frontend to backend we used **GraphQL** a query language for APIs and a runtime for fulfilling those queries with the existing data.

We implemented it in our application with the library ************Strawberry.************ It’s a new **GraphQL** library for Python 3, inspired by dataclasses.

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/1f22922e-4d1c-45d4-b640-2f0a0c262875" >
</p>

### Docker

To build and run our application we used **Docker.**

We create a `Dockerfile` and `docker-compose.yml` file.

The `Dockerfile` contains the following code :

```
FROM python

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY ./requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the project files to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 8000
```

The `docker-compose.yml` contains the following code :

```
version: '3.10'
services:
  app:
    build: .
    command: uvicorn main:app --host 0.0.0.0
    ports:
      - "8000:8000"
```

To build and run the application in **************Docker************** we used the following command :

```
docker-compose up
```

<p align="center">
	<img width="784" alt="1" src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/945ef6e1-eda8-4d27-90ea-21449c38d967">
</p>

## Frontend of our Application

### Angular

For the frontend we choose **Angular** and ************************TailwindCSS************************ framework.

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/928f4b48-d7cb-4085-817d-6b8c9925a92b" >
</p>

### GraphQL

To use **************GraphQL************** in the client side we needed also to download a library called `apollo-angular` so we did using this command :

```
ng add apollo-angular
```

 We needed to set the URL of our GraphQL Server in the `src/app/graphql.module.ts` file :

```
const uri = 'http://localhost:8000'; // <-- the URL of our GraphQL server
```

### Docker

To build and run our frontend application we created a `Dockerfile` containing the following code :

```
# Build stage
FROM node:18.13.0-alpine as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build --prod

# Prod stage
FROM nginx:alpine
COPY --from=build /app/dist/answers-grading-system-frontend /usr/share/nginx/html
```

To build the application in **Docker** we use the following command :

```
docker build --tag answers-grading-system-frontend .
```

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/b25dfdbf-2cc8-4ad5-a154-da48f5682c50">
</p>

To run it we used :

```
docker run -d -p 4200:80 --name answers-grading-system-frontend answers-grading-system-frontend
```

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/863902ae-ae4e-41b9-a757-80468e01fb14">
</p>

## Testing the Application

### Home Page

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/addc9069-e54d-430c-886c-1b4457fcdd68" >
</p>

### Question Page

By clicking on the button **ابدأ الاختبار** the test will begin :

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/e1245bcb-83b7-4bf6-bd7a-cb51f93ac28d" >
</p>


### Result Page

By clicking on the button **عرض النتيجة** the grades given by the models we trained will showed with the correct answers :

<p align="center">
	<img src="https://github.com/ahmed-bentajhamyani/answers-grading-system-application/assets/101653735/de0a49c4-c2b2-4598-bb8b-e1bfcc7bff54" >
</p>


## Class Diagram

To provide all the dependencies, spring uses the `pom.xml` file, which allows a better management of these independences and helps to simplify the process of configuring and setting up a Spring-based application.

To effectively convey the dynamic nature of our application, we created a general class diagram. This diagram represents the abstraction of the application’s functionality, allowing for a better understanding of the various interactions between classes. To organize NFTs, you can group them into collections and then categorize each collection. This allows you to interact with either individual NFTs or entire collection

## Creators

- [BENTAJ HAMYANI Ahmed](https://github.com/ahmed-bentajhamyani)
- [EL METIOUI Fouad](https://github.com/FouadElMetioui)
