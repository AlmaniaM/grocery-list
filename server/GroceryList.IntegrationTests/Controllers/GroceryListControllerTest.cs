using GroceryList.Config;
using GroceryList.Controllers;
using GroceryList.GroceryList;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace GroceryList.IntegrationTests.Controllers.GroceryListTests
{
	[TestFixture]
	public class GroceryListControllerTest
	{
		private readonly AppConfig appConfig = new()
		{
			Database = new DbConnectionConfig
			{
				ConnectionString = "",
			}
		};
		private IServiceProvider serviceProvider;

		[SetUp]
		public void SetUp()
		{
			serviceProvider = new ServiceCollection()
				.AddSingleton(appConfig)
				.AddSingleton(appConfig.Database)
				.AddDbContext<IGroceryList, GroceryListRepository>(options => options.UseInMemoryDatabase(Guid.NewGuid().ToString()))
				.BuildServiceProvider();
		}

		[Test]
		public async Task ShouldGetAllGroceryListItems()
		{
			using var context = await getGroceryListWithData();
			using var controller = new GroceryListController(context);

			var response = controller.GetAllGroceryListItems() as OkObjectResult;
			var groceryListItems = response.Value as List<GroceryListItem>;

			Assert.That(groceryListItems.Count, Is.EqualTo(5));
		}

		[Test]
		public async Task ShouldAddNewItem()
		{
			using var context = serviceProvider.GetService<IGroceryList>();
			using var controller = new GroceryListController(context);

			var response = (await controller.AddItemAsync("Item #1", CancellationToken.None)) as OkResult;

			Assert.That(response.StatusCode, Is.EqualTo(200));
			Assert.That(await context.GroceryList.CountAsync(), Is.EqualTo(1));
		}

		[Test]
		public async Task ShouldDeleteItem()
		{
			using var context = await getGroceryListWithData();
			using var controller = new GroceryListController(context);

			var response = (await controller.DeleteItemAsync(1, CancellationToken.None)) as OkResult;

			Assert.That(response.StatusCode, Is.EqualTo(200));
			Assert.That(await context.GroceryList.CountAsync(), Is.EqualTo(4));
		}

		/// <summary>
		/// Create an <see cref="IGroceryList"/> with five items.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> of type <see cref="IGroceryList"/>.</returns>
		private async Task<IGroceryList> getGroceryListWithData()
		{
			var groceryList = serviceProvider.GetService<IGroceryList>();
			Task addItemAsync(string description) => groceryList.AddAsync(description, CancellationToken.None);

			await addItemAsync("Item #1");
			await addItemAsync("Item #2");
			await addItemAsync("Item #3");
			await addItemAsync("Item #4");
			await addItemAsync("Item #5");

			return groceryList;
		}
	}
}
