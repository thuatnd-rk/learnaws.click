# Base image
FROM python:3.9

# Working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Command to run FastAPI
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "5000"]
