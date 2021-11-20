# [Bluber](https://bluber.herokuapp.com/)

## GangOfFour

### Purpose and Functionality

Bluber is an application that allows users to navigate Cambridge traffic network safely by allowing users to comment on the conditions of roads they would have previously traveled.

### Instructions to Run Locally:

In command line:

```console
$ npm i
$ npm run serve
```

In a separate shell:

```console
$ npm start
```

then you will find the application at `localhost:8080` in the browser

### Authorship:

- **Jianna Liu**:
  - src
    - Map.vue
- **Hophin Kibona**:
  - components
    - LogIn.vue
    - Mark.vue
    - MarksList.vue
    - Menu.vue
    - Navigation.vue
  - routes
    -  user.js 
  - models
    - user.js

  - bluber-server/

- **Hillary Tamirepi**:
  - components
    - Map.vue
    - Mark.vue
    - Marking.vue
    - MarksList.vue
    - Navigation.vue

  - routes:
    - mark-controller.js
    - mark.js

  - bluber-server/

- **Mufaro Makiwa**:
  - components:
    - comment.js
    - mark.js
    - rating.js
    - reply.js
    - saved.js
    - user.js
  - routes:
    - comment.js
    - mark-controller.js
    - rating.js
    - mark.js
    - reply.js
    - user.js
    - saved.js
    - middleware.js
    - rating.js
  - bluber-server/