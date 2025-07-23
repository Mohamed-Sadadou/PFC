# PFC - Academic Project Submission Management System

**PFC** (Projet Fin de Cycle) is a comprehensive full-stack web application designed to streamline the submission and evaluation process of academic final year projects (PFE - Projet de Fin d'Études and PFC - Projet Fin de Cycle) in higher education institutions. The system provides complete management of student projects, supervisor assignments, evaluations, and administrative workflows through a modern React frontend and robust Node.js backend.

## Project Overview

This system addresses the complex administrative challenges faced by universities in managing student final year projects by providing a centralized platform for project proposal submission, supervisor assignment, progress tracking, and evaluation management.

## Key Features

### Multi-Role User System
- **Students (Étudiants)**: Project submission, binome management, progress tracking
- **Teachers (Enseignants)**: Project supervision, subject creation, student evaluation
- **Administrators**: Complete system management, user oversight, data analytics
- **Department Heads (Responsables)**: Department-level project management
- **Commission Members**: Project validation and approval workflows
- **Jury Members**: Final project evaluation and grading

### Advanced Student Management
- **Binome System**: Comprehensive student pair/team management with dedicated interface
- **Multi-criteria Filtering**: Advanced search with up to 4 simultaneous filters
- **Academic Profiles**: Complete student information including sections, specializations, and groups
- **Progress Tracking**: Real-time monitoring of project advancement

### Project Management
- **Internal Projects**: University-supervised research projects
- **External Projects**: Industry-partnered projects with external supervision
- **Subject Management**: Complete subject lifecycle from creation to assignment
- **Dynamic Assignment**: Flexible project-to-student assignment system

### Evaluation & Validation System
- **Evaluation Forms**: Structured assessment tools for project grading
- **Validation Workflow**: Multi-step approval process with commission oversight
- **Jury Integration**: Comprehensive jury evaluation interface
- **Progress Monitoring**: Milestone tracking with advancement percentage

### Communication & Notifications
- **Integrated Notification System**: Real-time alerts and updates
- **Role-based Communication**: Targeted messaging based on user roles
- **Dashboard Analytics**: Comprehensive overview dashboards for all user types

## System Architecture

The application follows a full-stack architecture with separated frontend and backend:

### Backend Structure (`/Back`)
```
Back/
├── Controller/
│   ├── Admin.Controller.js          # Administrative operations
│   ├── Binome.Controller.js         # Student pair management
│   ├── Enseignant.Controller.js     # Teacher/supervisor operations
│   ├── Etudiant.Controller.js       # Student management
│   ├── Notification.Controller.js   # Notification system
│   ├── Stock.js                     # Data storage operations
│   ├── Sujet.Controller.js          # Project subject management
│   └── Utilisateur.Controller.js    # User management
├── Models/
│   ├── BD.js                        # Database connection
│   ├── Binome.Model.js              # Student pairs schema
│   ├── Enseignant.Model.js          # Teacher profiles
│   ├── Etudiant.Model.js            # Student profiles
│   ├── FicheEvaluation.Schema.js    # Evaluation forms
│   ├── FicheValidation.Schema.js    # Validation forms
│   ├── Notification.Model.js        # Notifications
│   ├── Role.Schema.js               # System roles
│   ├── RoleUser.Schema.js           # User role assignments
│   ├── Sujet.Schema.js              # Project subjects
│   ├── SujetExterne.Model.js        # External projects
│   ├── SujetInterne.Model.js        # Internal projects
│   └── Utilisateur.Model.js         # User accounts
├── Routes/
│   ├── Admin.routes.js              # Admin endpoints
│   ├── Binome.routes.js             # Binome endpoints
│   ├── Commission.routes.js         # Commission endpoints
│   ├── Enseignant.routes.js         # Teacher endpoints
│   ├── Etudiant.routes.js           # Student endpoints
│   ├── Jury.routes.js               # Jury endpoints
│   ├── ModificationSujet.routes.js  # Subject modification
│   ├── Notification.routes.js       # Notification endpoints
│   ├── Recherche.routes.js          # Search functionality
│   ├── Responsable.routes.js        # Department head endpoints
│   ├── TableauDeBord.routes.js      # Dashboard endpoints
│   └── User.routes.js               # User endpoints
├── middleware/
│   ├── RoleEnseignant.middleware.js # Teacher role middleware
│   └── auth.middleware.js           # Authentication middleware
├── utils/
│   └── errors.utils.js              # Error handling utilities
├── package.json
└── server.js                        # Application entry point
```

### Frontend Structure (`/Front`)
```
Front/
├── public/                          # Static assets
├── src/
│   ├── component/
│   │   ├── Binome-page/            # Student pair interface
│   │   ├── Commun/                 # Shared components
│   │   │   ├── NavBar.js           # Navigation component
│   │   │   ├── Notifications.js   # Notification system
│   │   │   └── FenetrePopUp.js     # Modal components
│   │   ├── Enseignant-page/        # Teacher interface
│   │   ├── Etudiant-page/          # Student interface
│   │   ├── Jury-page/              # Jury evaluation interface
│   │   ├── Profil-Page/            # User profile management
│   │   ├── Responsable-page/       # Department head interface
│   │   ├── admin-page/             # Administrator interface
│   │   ├── commission-page/        # Commission interface
│   │   └── login-page/             # Authentication interface
│   ├── App.js                      # Main application component
│   └── AppContexte.js              # Application context/state
├── package.json
└── README.md
```

## Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Architecture**: MVC (Model-View-Controller) pattern
- **Middleware**: Custom authentication and role-based access control
- **Error Handling**: Centralized error management utilities

### Frontend
- **Framework**: React.js
- **State Management**: React Context API
- **Routing**: React Router (implied from page structure)
- **UI Components**: Custom component library with modular design
- **Styling**: CSS with component-based architecture

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to backend directory
cd Back

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
# - MongoDB connection string
# - JWT secret key
# - Port configuration

# Start the backend server
npm start
# or
node server.js
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd Front

# Install dependencies
npm install

# Start the development server
npm start
```

### Full Application Setup
```bash
# Clone the repository
git clone https://github.com/Mohamed-Sadadou/PFC.git
cd PFC

# Setup backend
cd Back && npm install

# Setup frontend
cd ../Front && npm install

# Start MongoDB service
# mongod (or your MongoDB service command)

# Start backend (in one terminal)
cd Back && npm start

# Start frontend (in another terminal)
cd Front && npm start
```

## API Architecture

### RESTful Endpoints by Module

**Administrative Management**
- `/api/admin/*` - Complete system administration
- `/api/tableaudebord/*` - Dashboard analytics and overview

**User Management**
- `/api/user/*` - General user operations
- `/api/etudiant/*` - Student-specific endpoints
- `/api/enseignant/*` - Teacher management
- `/api/binome/*` - Student pair management

**Project Management**
- `/api/sujet/*` - Project subject operations
- `/api/modificationsujet/*` - Subject modification workflows
- `/api/recherche/*` - Advanced search functionality

**Academic Workflows**
- `/api/commission/*` - Project validation commission
- `/api/jury/*` - Final evaluation jury system
- `/api/responsable/*` - Department head operations

**System Features**
- `/api/notification/*` - Real-time notification system

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Middleware**: Access control for different user types
- **Teacher Role Middleware**: Specialized middleware for teaching staff
- **Error Handling**: Comprehensive error management and logging

## User Interface Overview

### Role-Based Interfaces

**Student Interface (`Etudiant-page`)**
- Project submission and management
- Binome formation and management
- Progress tracking and notifications

**Teacher Interface (`Enseignant-page`)**
- Project supervision dashboard
- Subject creation and modification
- Student assignment and evaluation

**Administrator Interface (`admin-page`)**
- Complete system oversight
- User management (students, teachers, jury members)
- System analytics and reporting
- External project management

**Commission Interface (`commission-page`)**
- Project validation workflows
- Subject approval processes
- Validation form management

**Jury Interface (`Jury-page`)**
- Final project evaluation
- Evaluation form completion
- Grade submission and reporting

**Department Head Interface (`Responsable-page`)**
- Department-level project oversight
- Commission formation and management
- Resource allocation and planning

### Shared Components
- **Navigation System**: Consistent navigation across all interfaces
- **Notification Hub**: Real-time updates and alerts
- **Modal System**: Pop-up forms and information displays
- **Authentication**: Secure login and session management

## Benefits

### Academic Institution Benefits
- **Streamlined Administration**: Reduced paperwork and manual processes
- **Improved Tracking**: Better oversight of student project progress
- **Enhanced Communication**: Improved collaboration between students and supervisors
- **Data Analytics**: Insights into project trends and success rates
- **Document Security**: Secure storage and backup of academic work

### Student Benefits
- **Centralized Platform**: Single point of access for all project-related activities
- **Clear Guidelines**: Structured process with clear expectations
- **Real-time Feedback**: Immediate updates on project status
- **Document Organization**: Organized storage of project materials
- **Progress Visibility**: Clear view of project milestones and deadlines

### Supervisor Benefits
- **Efficient Management**: Streamlined supervision of multiple projects
- **Structured Evaluation**: Standardized evaluation tools and criteria
- **Communication Tools**: Direct communication channels with students
- **Progress Monitoring**: Easy tracking of student progress
- **Report Generation**: Automated generation of evaluation reports

## Future Enhancements

- **Mobile Application**: Native mobile apps for iOS and Android
- **Advanced Analytics**: Detailed reporting and analytics dashboard
- **Integration APIs**: Integration with existing university information systems
- **Automated Workflows**: Enhanced automation for routine administrative tasks
- **Multi-language Support**: Support for multiple languages
- **Advanced Search**: Enhanced search and filtering capabilities

## Contributing

This project was developed as part of an academic initiative to improve university administrative processes. Contributions are welcome to enhance functionality and add new features.

## Author

**Mohamed Sadadou**  
Software Developer | Academic Project Management Systems

## License

This project is developed for academic use and is available under appropriate licensing terms.

---

**Note**: This system is designed to support the academic community by providing efficient tools for managing final year projects and improving the overall educational experience.
