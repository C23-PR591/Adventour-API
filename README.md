<h1 align="center">Backend - AdvenTour</h1>
<p align="center">Capstone Project | Product Based | AdvenTour</p>

# API Documentation

## Endpoint Routes

| Route                          | HTTP Method | Description                                   |
| ------------------------------ | ----------- | --------------------------------------------- |
| /auth/signup                   | POST        | Registration new user                         |
| /auth/signin                   | POST        | Login user                                    |
| /auth/user                     | GET         | Get profile user                              |
| /gunung                        | GET         | Get all moutains                              |
| /gunung/jawa-barat             | GET         | Get all moutains at West Java                 |
| /gunung/jawa-tengah            | GET         | Get all moutains at Central Java              |
| /gunung/jawa-timur             | GET         | Get all moutains at East Java                 |
| /gunung/:id                    | GET         | Get moutain by id                             |
| /gunung/gunung/search?keyword= | GET         | Get data moutain from keyword that user input |
| /feedback                      | POST        | User give feedback                            |
| /feedback                      | GET         | Get all feedbacks                             |
| /feedback/:gunungId            | GET         | Get all feedbacks from moutain                |
| /recommendation                | GET         | Get all moutain from model Machine Learning   |
