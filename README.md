# DevNotes

A RESTful Blog API built with Node.js, TypeScript, Express, and Zod.

## Tech Stack

- Node.js
- TypeScript
- Express
- Zod

## Features

- Create posts
- Get all posts
- Get a post by ID
- Update a post
- Partially update a post
- Delete a post
- Request validation with Zod
- In-memory data storage

## Architecture

```text
Postman
   ↓
Express Route
   ↓
Validation Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
In-Memory Repository