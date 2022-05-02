using GroceryList.GroceryList;

namespace DlHistoryApi
{
	/// <summary>
	/// A class designed to configure the application on startup.
	/// </summary>
	public class Startup
	{
		private readonly IConfiguration configuration;
		private readonly IWebHostEnvironment hostEnvironment;

		/// <summary>
		/// Create an instance of the <see cref="Startup"/> class.
		/// </summary>
		/// <param name="configuration">Provide an <see cref="IConfiguration"/> object for providing environment
		/// key-value configuration values.</param>
		/// <param name="hostEnvironment">Provide an <see cref="IWebHostEnvironment"/> for determining the current
		/// execution environment type. Mostly used for development or production checks.</param>
		public Startup(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
		{
			this.configuration = configuration;
			this.hostEnvironment = hostEnvironment;
		}

		/// <summary>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// </summary>
		/// <param name="services">An <see cref="IServiceCollection"/> for adding services.</param>
		public void ConfigureServices(IServiceCollection services)
		{
			services
				.AddCors(
					options => options.AddPolicy(
						"CorsPolicy",
						builder => builder.WithOrigins(new[] { "http://localhost:4200" })
							.AllowAnyMethod()
							.AllowAnyHeader()
					)
				)
				.AddSwagger(hostEnvironment.IsDevelopment())
				.AddDbServices()
				.AddAppConfig(configuration, out var appConfig)
				.AddControllers();
		}

		/// <summary>
		/// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		/// </summary>
		/// <param name="app">Provide an <see cref="IApplicationBuilder"/> for configuring application services.</param>
		/// <param name="env">Provide an <see cref="IWebHostEnvironment"/> for determining the current hosting environment.</param>
		/// <param name="context">Provide a <see cref="GroceryListRepository"/> to ensure it's ready for use.</param>
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, GroceryListRepository context)
		{
			// global CORS policy
			app.UseCors("CorsPolicy");

			if (env.IsDevelopment())
			{
				// Make sure the grocery list back-end is ready to be used.
				context.Database.EnsureCreated();

				app
					.UseDeveloperExceptionPage()
					.UseSwagger()
					.UseSwaggerUI(c => c.SwaggerEndpoint("v1/swagger.json", "Grocery List v1"));
			}
			else
			{
				// Won't do anything here just because it's a development project.
			}

			app.UseHttpsRedirection()
				.UseRouting()
				.UseEndpoints(configure => configure.MapControllers());
		}
	}
}