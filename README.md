# Todo-list Web App

## Description

A Todo-list web application using JavaScript, HTML and CSS

Created from a webpack template (https://github.com/Blakem07/webpack-template.git)

## Key Features

- Multiple Projects: Create and manage multiple projects to organize your todos.
- Dynamic Todos: Add todos with various properties like due date, priority, and notes.
- UI Interactions: View, edit, expand, and delete todos. Priorities are color-coded for easy management.
- Persistence: Uses localStorage to save and load todos even after the page is refreshed.

## Technologies Used

- JavaScript (ES6+)
- Webpack
- localStorage API

The project is modularized to separate the application logic from the UI logic, making the code clean and easy to maintain. I’ve also used date-fns to help with date formatting and manipulation.

## Installation Instructions

1. Clone this repo:

   git clone git@github.com:Blakem07/todo-list.git

2. Install dependencies:

   npm install
   npm init -y
   npm install --save-dev webpack webpack-cli
   npm install --save-dev html-webpack-plugin
   npm install --save-dev style-loader css-loader
   npm install --save-dev webpack-dev-server

   npm install datesfn

## Usage

    To rebundle - npx webpack
    To run on live server - npx webpack serve
