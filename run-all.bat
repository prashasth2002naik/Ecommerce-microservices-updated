@echo off
echo Starting E-Commerce Microservices...

start "Eureka Server" cmd /k "cd eureka-server && mvn spring-boot:run"
timeout /t 30

start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
timeout /t 15

start "Product Service" cmd /k "cd product-service && mvn clean install && mvn spring-boot:run"
start "Order Service" cmd /k "cd order-service && mvn clean install && mvn spring-boot:run"
start "User Service" cmd /k "cd user-service && mvn clean install && mvn spring-boot:run"

timeout /t 15

start "Frontend" cmd /k "cd frontend && npm start"

echo All services started!
echo Access the application at http://localhost:3000