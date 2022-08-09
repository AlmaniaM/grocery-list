# Instructions

## Getting started

1. Create the DB with the [Docker command](#docker-command)
2. Run the [server](#server-getting-started) app
3. Run the [client](#client-getting-started) app
4. Done

## Client Getting started

### Development

1. CD into the client folder with your favorite terminal app
2. Run `sh npm install`
3. Run `sh ng serve`
4. Open your favorite browser and navigate to `http://localhost:4200`
5. Done

### Testing

1. CD into the client folder with your favorite terminal app
2. Run `npm install` (if you haven't already)
3. Run `ng test`
4. This should run the tests in headless mode
5. Done

## Server Getting started

### Development Visual Studio 2022

1. Open the GroceryList.sln project
2. Run the project as usual

### Development VS Code

1. Navigate to the `grocery-list/server/GroceryList` folder
2. Run `dotnet run`
3. Done

### Testing with Visual Studio 2022

1. Open the GroceryList.sln project
2. Click on the **Test** tab -> **Test Explorer**
3. Run the tests by clicking on the double arrow or right-click on the test project and select **Run**
4. Done

### Testing with VS Code

1. Navigate to the `grocery-list/server/GroceryList.IntegrationTests` folder
2. Run `dotnet test`
3. Done

## DB

### Docker Command

```sh
  docker run --name grocerylistdb -v truxio-grocery-list:/var/opt/mssql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Sup3rPassword" -e "MSSQL_PID=Standard" -p 14330:1433 --hostname mssqldb -d mcr.microsoft.com/mssql/server:2019-latest
```
