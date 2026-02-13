# Playwright QA Portfolio Automation Project 

This repository contains an **automated end-to-end testing suite** for **https://automationexercise.com/** website.  

---

## About the Project
The project is built using **Playwright** with **JavaScript** and follows the **Page Object Model (POM)** design pattern.

It covers key user flows of an e-commerce application such as:
- User registration and login
- Product search
- Adding products to cart
- Checkout and payment
- Contact form and subscription
- Order verification
  
This project was created as a portfolio and learning project to demonstrate practical test automation skills.

## Tech Stack
- JavaScript
- Playwright
- IntelliJ IDEA
- GitHub

## Test Coverage
The automated tests verify:
- User registration and deletion
- Login with valid credentials
- Product browsing and product details
- Search functionality
- Product categories and brands
- Adding random products to cart
- Order placement and invoice download
- Contact Us form submission
- Footer subscription
- Recommended items section

---
## Project Structure

- `data/` → test data and variables;
- `downloads/` → downloaded files (e.g. invoices);
- `pages/` → Page Object Model classes;
- `tests/` → test specifications;
- `utils/` → utility functions;

---
  
## Design Pattern
- Page Object Model (POM) is used to separate test logic from page locators and actions.
- Reusable methods are implemented in `BasePage` and utility functions.
- Test data is stored separately for better maintainability.

---

## About Me

I'm a dedicated QA Engineer with experience in web application testing and data validation using SQL. Skilled in creating, executing, and maintaining manual and semi-automated test cases. Proficient in error analysis, documentation, and tracking throughout the entire error resolution process. 
After a career break, I've refreshed and expanded my skills using **Playwright**, creating **robust automation frameworks**, and improving QA processes to deliver **reliable, bug-free products**.  

### Skills & Tools
- **Test Automation:** Playwright, Selenium WebDriver 
- **Test Management:** Jira 
- **API Testing:** Postman
- **Programming & Scripting:** JavaScript, Python (basic)  
- **Version Control:** Git

### Contact Me
- Email: yarynakushniruk@gmail.com
- LinkedIn: https://www.linkedin.com/in/yaryna-kushniruk-964425b0/

---

## Installation & Running Tests

```bash
1. Clone the repository:
git clone https://github.com/YarynaKu/qa-portfolio.git
cd qa-portfolio

2. Install dependencies:
npm install

3. Install Playwright browsers:
npx playwright install

Run all tests:
npx playwright test

Run tests in UI mode:
npx playwright test --ui

Run a specific test file:
npx playwright test tests/LoginTests.spec.js

View test report:
npx playwright show-report
