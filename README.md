# Langchain.js Experiment

This project is an experiment using **Langchain.js** to build various AI-driven tools, including chat interfaces, question-answer systems based on PDFs and YouTube videos, search functionality over arrays of objects, and function-calling for tasks like calculating math expressions or generating images using DALL-E.

## Introduction

This repository contains several Node.js scripts that demonstrate various capabilities using Langchain.js. The project is purely backend and operates via command-line tools, focusing on:

- **Chat Interface**: Real-time question-answering through a command-line chat tool.
- **PDF-Based Q&A**: Command-line tool to extract and answer questions from PDF documents.
- **YouTube Video Q&A**: Command-line tool to process and answer questions from YouTube video.
- **Array-Based Search**: Command-line search tool for querying an array of objects.
- **Function Calling**: Command-line tool to perform tasks like math calculations or generating images using DALL-E.

## Prerequisites

Ensure you have the following installed:

- Node.js (>= 20.x.x)
- OpenAI API key

## Configuration

To configure the project, follow these steps:

1.  Create a `.env` file in the root directory of the project.
2.  Add your OpenAI API key to the `.env` file as shown below:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Installation

Clone the repository:

```
git clone git@github.com:jaypatel1210/Langchain-Experiment-NodeJS.git
cd langchainjs-experiment
```

Install the dependencies:

```
npm install
```

## Usage

### Chat Interface

Run the chat interface for real-time question answering:

```
node chat.js
```

### Question Answering [PDF | YouTube]

Extract and answer questions from a PDF or YouTube video

```
node question-answer.js "What is docker?"
node question-answer.js "How to connect PS5 controller?"
```

### Array-Based Search

Perform a search over an array of objects:

```
node search.js "I want to watch an action movie"
```

### Function Calling

Calculate a math expression or generate an image using DALL-E:

```
node function-calling.js "calculate 3 + 5 - 10"
node function-calling.js "generate image of house in snow"
```
