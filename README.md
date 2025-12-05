# VectorShift Pipeline Builder

A modern, interactive web application for building and managing data processing pipelines with a visual interface. The application provides a node-based editor where users can create, connect, and configure processing nodes to build complex data workflows.

## Features

- **Visual Pipeline Editor**: Intuitive drag-and-drop interface for building data processing pipelines
- **Node-based Workflow**: Create and connect different processing nodes to design complex workflows
- **Real-time Validation**: Built-in validation to ensure pipeline integrity and detect cycles
- **Responsive Design**: Works on various screen sizes and devices
- **Modern Tech Stack**: Built with React, React Flow, and FastAPI

## Prerequisites

- Node.js (v14 or later)
- Python (3.7 or later)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart pydantic
   ```

3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The application will open in your default browser at `http://localhost:3000`

## Project Structure

```
vectorshift/
├── backend/               # FastAPI backend
│   ├── main.py           # Main application file with API endpoints
│   └── requirements.txt  # Python dependencies
├── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/              # React components and logic
│       ├── App.js        # Main application component
│       ├── ui.js         # Pipeline UI components
│       └── ...           # Other React components
└── README.md             # This file
```

## Available Scripts

In the frontend directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## API Endpoints

The backend provides the following endpoints:

- `POST /parse-pipeline`: Validates and processes the pipeline configuration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/) and [React Flow](https://reactflow.dev/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Icons from [Lucide](https://lucide.dev/)

---

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
