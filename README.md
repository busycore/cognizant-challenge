

## Description

A code created to attend to a challenge by Cognizant. Created with NestJS

## Api Documentation

Visit the swagger api http://localhost:3000/api/


## Requirements

```
nodejs >=12.13.1
```

## Installation

```bash
$ git clone 
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Endpoints

# http://localhost:3000/bitmap
Request :
JSON Body :
```
{
	"An":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
}
```
Response :
JSON :
```
[
  {
    "value": 0,
    "occurences": 4
  },
  {
    "value": 4,
    "occurences": 3
  },
  {
    "value": 8,
    "occurences": 4
  },
  {
    "value": 13,
    "occurences": 2
  },
  {
    "value": 1,
    "occurences": 0
  },
  [..]
  {
    "value": 15,
    "occurences": 0
  }
]
```

# http://localhost:3000/races/upload

Request :
Content-Type: multipart/form-data;
name: "file"

Example of "file"
```
Hora;Super-Heroi;No Volta;Tempo Volta;Velocidade média da volta
23:49:08.277;038–Superman;1;1:02.852;44,275
23:49:10.858;033–Flash;1;1:04.352;43,243
23:49:11.075;002–Mercúrio;1;1:04.108;43,408
23:49:12.667;023–Sonic;1;1:04.414;43,202
23:49:30.976;015–PAPALÉGUA;1;1:18.456;35,47
23:50:11.447;038–Superman;2;1:03.170;44,053
```

Response
```
[
  {
    "id": "038",
    "name": "Superman",
    "position": 1,
    "voltas": 4,
    "total_race_time": "23:52:17.003",
    "better_time": "1:02.769",
    "average_speed": "44,321"
  },
  {
    "id": "033",
    "name": "Flash",
    "position": 3,
    "voltas": 4,
    "total_race_time": "23:52:22.586",
    "better_time": "1:03.716",
    "average_speed": "43,474"
  },
  {
    "id": "002",
    "name": "Mercúrio",
    "position": 2,
    "voltas": 4,
    "total_race_time": "23:52:22.120",
    "better_time": "1:03.076",
    "average_speed": "44,118"
  },
  {
    "id": "023",
    "name": "Sonic",
    "position": 4,
    "voltas": 4,
    "total_race_time": "23:52:25.975",
    "better_time": "1:04.216",
    "average_speed": "43,335"
  },
  {
    "id": "015",
    "name": "PAPALÉGUA",
    "position": 5,
    "voltas": 4,
    "total_race_time": "23:53:06.741",
    "better_time": "1:07.011",
    "average_speed": "34,763"
  },
  {
    "id": "011",
    "name": "GATOAJATO",
    "position": 6,
    "voltas": 3,
    "total_race_time": "23:54:57.757",
    "better_time": "1:18.097",
    "average_speed": "35,633"
  }
]
```

## Stay in touch

- Author - [Matheus Vargem](https://www.linkedin.com/in/matheusvargem/)

