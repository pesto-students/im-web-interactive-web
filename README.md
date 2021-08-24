# **iFlix**

---

### **In one line**,

iFlix is a platform to watch and create interactive movies by utilizing multiple modules offered by the platform.

### **Who is this for?**

| Persona     | Who are they?                                                                               | What is their main goal?                                                                                      |
| :---------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ |
| A Cinephile | A person with a passionate interest in cinema                                               | They want to be able to interact and be part of the story by altering it with their actions                   |
| An Editor   | A film editor controls a film's artistic and dramatic aspects and visualizes the screenplay | They want to be able to add interactivity to movies where a cinephile will have the choice to alter the story |
| An Admin    | A person who is responsible for the administrator tasks                                     | They want to be able to manage the movie lists, have access controls                                          |

### **How do they Benefit?**

iFlix is a platform where viewers can interact with the film and influence the events that unfold in the film.

iFlix allows users to watch interactive movies from any and every device they own, with ease. A user can use the studio module to add interactivity to movies, manage, publish movies on the platform and get statistics for different movies like the number of views etc. As an iFlix admin, the user can perform essential admin tasks like managing movies, users, access rights etc.

### **How is this different?**

In a regular movie/cinematic experience, the viewer lacks the option to alter events unfolding within the film. In video games, the player is given the freedom to interact with the game and alter the storyline.
Interactive movies are a combination of both cinematic experience and altering the storyline as per the user's choice. However, Interactive movie/cinema is a concept that has been around since the ’90s and has remained in the background because of lack of success.
The goal of iFlix is to give the viewer the possibility to alter the story, while still enjoying a cinematic experience.

---

## **Live Link**

- **[OTT Module](https://i-flix-develop.netlify.app/)** [![Netlify Production Status](https://api.netlify.com/api/v1/badges/01521a19-5b5e-4fae-9888-6ab2e0a1677f/deploy-status)](https://app.netlify.com/sites/i-flix/deploys)
- **[Studio Module](https://iflix-studio-develop.netlify.app/dashboard)** [![Netlify Studio Status](https://api.netlify.com/api/v1/badges/4ea58d4f-a4db-4ed5-a899-c1fcbcd9f1f8/deploy-status)](https://app.netlify.com/sites/iflix-studio-develop/deploys)

## **Usage**

This Project has three modules accompanied by backend at <https://github.com/pesto-students/im-interactive-films-back-end>.

1. OTT Module
2. Studio Module
3. Admin Module (Will be developed in phase 3)

Running this project should be very easy, quick and automatic using monorepo.

- Please ensure to run [backend server](https://github.com/pesto-students/im-interactive-films-back-end) first.
- Install [lerna](https://github.com/lerna/lerna) first: `yarn global add lerna`
- Run `yarn bootstrap` to install all dependencies and setup monorepo symlinks using [lerna](https://github.com/lerna/lerna).
- Run `yarn start` to start development server with all packages included, by default you'll run iFlix OTT Module `@im/ott`.
- Run `yarn start-studio` to run iFlix Studio Module
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**NOTE**: _Please checkout `develop` branch to run locally._
## **System Requirements**

Following system requirements need to be met in order for this application to run

- Node.js 12.0 or later
- MacOS, Windows, and Linux are supported

## **Environment**

Following environment variables need to be set for the application to run

- `REACT_APP_NODE_ENV` : Node Environment development|staging|production.
- `REACT_APP_SENTRY_DSN`: A Sentry DSN for error logging.
- `REACT_APP_GRAPH_DEV_API`: GraphQl API Server URL
- `REACT_APP_YOUTUBE_API_KEY`: Youtube API Key to add videos from youtube.
- `REACT_APP_CLOUDINARY_CLOUD_NAME`: Cloudinary Name and Presets.
- `REACT_APP_FB_DEV_API_KEY`: Firebase API Key.


**_NOTE: `.env-sample` in every package has complete list of environment variables used._**
## **Designs**

- **Wireframes v1.0:**
  - **OTT Module:** [Figma Design](https://www.figma.com/file/ZqlEpB2SEv0VWwJlIixVgG/Movie-Player?node-id=0%3A1)
  - **Studio Module:** [Figma Design](https://www.figma.com/file/xv06ZxCn7zTRTQLx6huBPW/iFlix-Studio?node-id=0%3A1)
- **Wireframes v2.0:**
  - **OTT Module:** [Figma Design](https://www.figma.com/file/l0Ge6E4MYTAEaCjSUuSoL7/iFlix-and-iFlix-Studio?node-id=0%3A1)
  - **Studio Module:** [Figma Design](https://www.figma.com/file/l0Ge6E4MYTAEaCjSUuSoL7/iFlix-and-iFlix-Studio?node-id=520%3A3)
- **HLD**
  - **Design Link:** [**HLD**](https://miro.com/app/board/o9J_l5q5tfs=/)
  - **Design Link v2.0**: [**HLD**](https://miro.com/app/board/o9J_l1VQUnw=/)

## **Tech Stack**

1. **Frontend**- React, Redux
2. **Backend**- NodeJS, Express, GraphQL
3. **Deployment**- Netlify, Heroku, CI/CD
4. **Database**- Firebase DB
5. **Authentication**- Firebase
6. **Tools**- Version Control System (GIT), Github, Sentry, Cloudinary

## **Developers**

- [Rohit Ukirde](https://github.com/ukirderohit)
- [Pranay Bajaj](https://github.com/pranay2401)
