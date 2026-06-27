## Project Name

**SkillSwap — Freelance Micro-Task Platform**

## Purpose

SkillSwap is a full-stack freelance micro-task marketplace where clients can post small tasks and freelancers can apply for those tasks through proposals. The platform is built to make short-term freelance work easier to manage for both clients and freelancers.

Clients can create tasks, review proposals, accept a freelancer, and complete payment through Stripe Checkout. Freelancers can browse available tasks, submit proposals, manage their accepted work, submit deliverables, and update their public profile. Admins can manage users, monitor tasks, and view transaction history from a separate admin dashboard.

The project includes role-based dashboards for Clients, Freelancers, and Admins, with protected routes, authentication, payments, task management, proposal management, and review features.

## Live Website Link

https://skillswap-eta-eight.vercel.app/

## Key Features

* Clients can post new micro-tasks with title, category, budget, deadline, and description.
* Freelancers can browse open tasks and send proposals with budget, estimated days, and cover notes.
* A freelancer can apply only once for the same task.
* Clients can accept or reject proposals from their dashboard.
* Stripe Checkout is integrated for secure task payments after accepting a proposal.
* Task status changes based on progress, such as Open, In Progress, and Completed.
* Freelancers can submit deliverable links after finishing the assigned work.
* Clients can leave ratings and reviews after work is completed.
* Separate dashboards are available for Client, Freelancer, and Admin roles.
* Admin can manage users, block or unblock accounts, manage tasks, and view payment history.
* Blocked users are prevented from logging in.
* Browse Tasks page includes title search, category filtering and server-side pagination.
* Home page shows dynamic content such as latest tasks, top freelancers, platform stats and client reviews.
* Fully responsive layout for mobile, tablet and desktop devices.
* Custom 404 page and protected dashboard routing are included.

## NPM Packages Used

### Frontend

* next
* react
* react-dom
* @heroui/react
* better-auth
* stripe
* react-icons
* @iconify/react
* tailwindcss
* postcss
* eslint

### Backend

* express
* cors
* dotenv
* mongodb
* jose-cjs
* stripe
* nodemon
