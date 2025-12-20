<a name="readme-top"></a>

<div align="center">
  <img src="public/logo-dark.png" alt="logo" width="140" height="auto" />
  <br/>
</div>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Login](#login)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [📝 License](#license)

# 📖 RetentionAI – HR Assistant Frontend <a name="about-project"></a>

RetentionAI Frontend is a responsive HR dashboard that allows HR users to authenticate, submit employee profiles, visualize attrition risk predictions, and automatically display AI-generated retention plans when a high risk of departure is detected.

This interface is designed to support data-driven HR decision-making in a clear, intuitive, and business-oriented way.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<ul>
  <li><a href="https://nextjs.org/">Next.js (React)</a></li>
  <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
  <li>JavaScript / TypeScript</li>
  <li>REST API (FastAPI Backend)</li>
</ul>

### Key Features <a name="key-features"></a>

- **JWT-based authentication for HR users**
- **Employee profile input form**
- **Visualization of attrition risk probability**
- **Automatic display of AI-generated retention plans**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- Live demo coming soon (Docker deployment)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Setup

Clone this repository:

```sh
git clone https://github.com/codehass/retention-ai-hr-assistant-frontend.git
```

### Install

Install this project with:

```sh
  cd retention-ai-hr-assistant-frontend
  npm install
```

create `.env` file and add your environment variables. You can copy `.env.example` as a template.

```sh
  cp .env.example .env
```

### Usage

To run the project, execute the following command:

```sh
  npm run dev
```

### Run with Docker Compose

To run the frontend and backend together, clone both repositories into the same parent directory:

```
retention-ai/
├── retention-ai-hr-assistant-frontend/
└── retention-ai-hr-assistant-backend/
```

The [RetentionAI Frontend](https://github.com/codehass/retention-ai-hr-assistant-frontend)

- Then run:

```
docker compose up --build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Author <a name="authors"></a>

👤 **Hassan El Ouardy**

- GitHub: [@codehass](https://github.com/codehass)
- Twitter: [@hassanelourdy](https://twitter.com/hassanelourdy)
- LinkedIn: [@hassanelourdy](https://www.linkedin.com/in/hassanelouardy/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- **MLflow experiment tracking**
- **CI/CD with GitHub Actions**
- **Role-based access control**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/codehass/the-wild-oasis/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

Join us in supporting our project to improve cabin management in hotels! Your help makes a big difference in making stays smoother and guests happier. Let's work together to bring positive change to the hospitality industry!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
```
