# Instructions

## Notes

- Components were created as single file components because the HTML templates were small. I'd usually have a dedicated HTML file if the lines pass a certain threshold.
- I broke out the components a bit more than necessary for this app (in my opinion). I just wanted to demonstrate my understanding of single responsibility principles.
- I removed the grocery-list and item-creator component tests because I didn't write anything extra in there. The notes I received from you were to just demonstrate how I might lay out the tests. I wrote tests for a service and a component to demonstrate different scenarios.
- The GROCERY_LIST injection token isn't really necessary here because you can achieve relatively the same by using the HttpTestingController inside the grocery-list-page tests. I wanted to demonstrate how you could mock more complex services as interfaces.
- I disabled the .Net 6 "Nullable" feature just because it's a new development concept that Microsoft is trying to gear developers towards (explicit nullables for safer development).
- Again, I think some areas are overkill on abstraction but I did it that way to demonstrate testability and more complex scenarios. I tried to document for a scenario where project documentation would be generated from the code. Please let me know if you have any questions regarding anything at all. Thanks!

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
