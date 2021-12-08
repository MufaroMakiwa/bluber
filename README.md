# [Bluber](https://bluber.herokuapp.com/)

## GangOfFour

### Purpose and Functionality

Bluber is an application that allows users to navigate Cambridge traffic network safely by allowing users to comment on the conditions of roads they would have previously traveled.

### Instructions to Run Locally:

In root folder:

```
Find a file with filename ".env.template" and change the file extension to ".env"
```

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
    Map.vue
  - models (mongo conversion)
  - routes - comment-controller.js - reply-controller.js - user-controller.js - saved-controller.js - rating-controller.js
  - models/ \*
  - routes/ \*

> > > > > > > safety

- **Hophin Kibona**:

  - components
    - LogIn.vue
    - MarksList.vue
    - Navigator.vue
    - MarkCard.vue
    - ImageUploader.vue
  - routes
    - user.js
    - middleware.js
    - user.js
    - util.js
    - user-controller.js
    - mark-controller.js
  - models

    - user.js
    - mark.js
    -

  - bluber-server/

- **Hillary Tamirepi**:

  - src/ \*
  - models/ \*
  - routes/ \*
  - db /\*
  - public/ \*

- **Mufaro Makiwa**:
  - routes/ \*
  - models/ \*
  - srs/ \*
  - app.js
  - API.md
