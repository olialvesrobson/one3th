# One3th: Small Business Management App

![One3th Logo](images/logo.png)  <!-- Add an actual image path if available -->

## Overview

One3th is a comprehensive small business management application designed to streamline and simplify your business operations. This personal project encompasses various features such as invoicing, expense tracking, appointment scheduling, task management, and more.

## Features

- **Invoicing and Billing**: Create, send, and track invoices.
- **Expense Tracking**: Record and monitor business expenses.
- **Appointment Scheduling**: Manage appointments with a built-in calendar system.
- **Task Management**: Create, assign, and track tasks.
- **Inventory Management**: Track inventory levels and manage stock.
- **Customer Relationship Management (CRM)**: Organize customer contact information and interactions.
- **Reporting and Analytics**: Generate and visualize business reports.
- **User Management**: Manage user roles and permissions.
- **Authentication**: Secure access with user authentication.

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:olialvesrobson/one3th.git
    cd one3th
    ```

2. **Create a virtual environment and activate it:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations:**

    ```bash
    python manage.py migrate
    ```

5. **Create a superuser:**

    ```bash
    python manage.py createsuperuser
    ```

6. **Run the development server:**

    ```bash
    python manage.py runserver
    ```

7. **Access the application:**

    Open your browser and go to `http://127.0.0.1:8000/`.

## Usage

### Invoicing

Create and manage invoices effortlessly.

```python
from .models import Invoice

# Create an invoice
invoice = Invoice.objects.create(customer=customer, amount=500.00, due_date='2024-07-08')
invoice.save()
```

### Expense Tracking

Keep track of all your business expenses.

```python
from .models import Expense

# Record a new expense
expense = Expense.objects.create(category='Office Supplies', amount=100.00, date='2024-07-08')
expense.save()
```

### Appointment Scheduling

Schedule and manage appointments with ease.

```python
from .models import Appointment

# Schedule an appointment
appointment = Appointment.objects.create(client=client, date='2024-07-10', time='10:00:00')
appointment.save()
```

## Contributing

1. **Fork the repository**
2. **Create a new branch**

    ```bash
    git checkout -b feature-branch
    ```

3. **Commit your changes**

    ```bash
    git commit -am 'Add new feature'
    ```

4. **Push to the branch**

    ```bash
    git push origin feature-branch
    ```

5. **Create a new Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
