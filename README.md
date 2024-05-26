Certainly! Here's the revised README with a more professional tone:
# SD-Project-STPM
Created By: Nkosinathi, Lusanda, Simphile, Katleho, & Mbuyu

**Blocbuddy** is a web application designed to facilitate the day-to-day management of tasks in a Sectional Title Property.

## Getting Started
To use the app locally, follow these steps:

### Prerequisites
Ensure that you have the following software installed on your machine:

- [Node.js](https://nodejs.org)
- npm (Node Package Manager, included with Node.js)

### Installation
1. Clone the repository to your local machine:
   ```
    git clone https://github.com/your-username/SD-Project-STPM.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd SD-Project-STPM/frontend
   ```

### Running Locally
To run the app locally, execute the following command:
```bash
npm run dev
```

Then, open your web browser and navigate to the following URL:
```
http://localhost:5173
```
## Usage

Once the app is running locally, users can log in with different roles, each offering unique functionalities:
**Admin**: Administrators have access to full control over the property management system. They can add or remove staff members, manage resident accounts, and oversee all property-related tasks.
**Staff Member**: Staff members have restricted access compared to admins. They can manage specific tasks assigned to them, update task statuses, and communicate with residents.
**Resident**: Residents can view assigned tasks, submit requests or complaints, and communicate with staff members regarding property-related matters.

Authentication is handled through Auth0, ensuring secure access control and user authentication.
