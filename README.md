# Report Scheduler

This project automates generating and emailing database reports on a weekly and monthly schedule.

---

## Configuration

The report scheduler reads configuration from a JSON file (`servers.json`) that defines database servers, SSH tunnels, email recipients, and SQL queries.

### Configuration Structure

The JSON has two main arrays: `monthly_report` and `weekly_report`. Each contains objects with the following fields:

| Field             | Description                                               | Example                                                  |
| ----------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| `NAME`            | A label for this report/server configuration              | `"MonthlySalesReport"`                                   |
| `DB_HOST`         | Database host IP or hostname                              | `"192.168.1.10"`                                         |
| `DB_PORT`         | Database port (usually `3306` for MySQL)                  | `"3306"`                                                 |
| `DB_USERNAME`     | Database username                                         | `"report_user"`                                          |
| `DB_PASSWORD`     | Database password                                         | `"securepassword123"`                                    |
| `DB_DATABASE`     | Database name                                             | `"sales_db"`                                             |
| `DB_SSH_HOST`     | SSH host IP for tunneling (if applicable)                 | `"203.0.113.15"`                                         |
| `DB_SSH_USERNAME` | SSH username for tunneling                                | `"sshuser"`                                              |
| `DB_SSH_PORT`     | SSH port (default: `"22"`)                                | `"22"`                                                   |
| `MAILS`           | List of email addresses to send the generated reports to  | `["sales-team@example.com"]`                             |
| `SQL_QUERY`       | SQL query with `?` placeholders for date range parameters | `"SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?;"` |

### Create servers.json

```json
{
  "monthly_report": [
    {
      "NAME": "MonthlySalesReport",
      "DB_HOST": "192.168.1.10",
      "DB_PORT": "3306",
      "DB_USERNAME": "report_user",
      "DB_PASSWORD": "securepassword123",
      "DB_DATABASE": "sales_db",
      "DB_SSH_HOST": "203.0.113.15",
      "DB_SSH_USERNAME": "sshuser",
      "DB_SSH_PORT": "22",
      "MAILS": ["sales-team@example.com", "manager@example.com"],
      "SQL_QUERY": "SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?;"
    }
  ],
  "weekly_report": [
    {
      "NAME": "WeeklySalesReport",
      "DB_HOST": "192.168.1.10",
      "DB_PORT": "3306",
      "DB_USERNAME": "report_user",
      "DB_PASSWORD": "securepassword123",
      "DB_DATABASE": "sales_db",
      "DB_SSH_HOST": "203.0.113.15",
      "DB_SSH_USERNAME": "sshuser",
      "DB_SSH_PORT": "22",
      "MAILS": ["sales-team@example.com", "manager@example.com"],
      "SQL_QUERY": "SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?;"
    }
  ]
}
```
