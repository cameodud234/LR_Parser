# LR_Parser

## Technologies
Project is created with:
* Node.js version: 14

## General Info

The actions Shift and Reduce of Bottom-up parsing are defined in Ch.4 of the textbook Concepts of Programming Languages, Addison Wesley, 10th edition. The grammar is given as:
1.	E = E + T
2.	E = T
3.	T = T * F
4.	T = F
5.	F = ( E )
6.	F = id


<img width="342" alt="image" src="https://user-images.githubusercontent.com/30845397/181936411-983ee13a-304c-4ed8-8c18-04a50c9c0856.png">


## Setup
To run this project, install Node.js from https://nodejs.dev.

After run the following command:

```
$ node main.js
```

Successful result should output “accept”, otherwise, it is an error.
