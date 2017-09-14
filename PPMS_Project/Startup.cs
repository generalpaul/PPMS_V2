using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PPMS_Project
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSingleton<IConfiguration>(Configuration);
            //services.AddAuthorization(options =>
            //{
            //  options.AddPolicy("HashPolicy",
            //                    policy => policy.Requirements.Add(new MinimumAgeRequirement(21)));
            //});
            //services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            
        }
    }
    //public class MinimumAgeRequirement : IAuthorizationRequirement
    //{
    //  public int MinimumAge { get; private set; }

    //  public MinimumAgeRequirement(int minimumAge)
    //  {
    //    MinimumAge = minimumAge;
    //  }
    //}

    //public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
    //{
    //  protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
    //  {
    //    if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth &&
    //                               c.Issuer == "http://contoso.com"))
    //    {
    //      // .NET 4.x -> return Task.FromResult(0);
    //      return Task.CompletedTask;
    //    }

    //    var dateOfBirth = Convert.ToDateTime(context.User.FindFirst(
    //        c => c.Type == ClaimTypes.DateOfBirth && c.Issuer == "http://contoso.com").Value);

    //    int calculatedAge = DateTime.Today.Year - dateOfBirth.Year;
    //    if (dateOfBirth > DateTime.Today.AddYears(-calculatedAge))
    //    {
    //      calculatedAge--;
    //    }

    //    if (calculatedAge >= requirement.MinimumAge)
    //    {
    //      context.Succeed(requirement);
    //    }
    //    return Task.CompletedTask;
    //  }
    //}
}
