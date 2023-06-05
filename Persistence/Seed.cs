using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                // var activities = new List<Activity>
                // {
                //     new Activity
                //     {
                //         Title = "Past Activity 1",
                //         Date = DateTime.Now.AddMonths(-2),
                //         Description = "Activity 2 months ago",
                //         Category = "drinks",
                //         City = "London",
                //         Venue = "Pub",
                //         Attendees = new List<ActivityAttendee>
                //         {
                //             new ActivityAttendee
                //             {
                //                 AppUser = users[0],
                //                 IsHost = true
                //             }
                //         }
                //     },
                    
                //     new Activity
                //     {
                //         Title = "Future Activity 8",
                //         Date = DateTime.Now.AddMonths(8),
                //         Description = "Activity 8 months in future",
                //         Category = "drinks",
                //         City = "London",
                //         Venue = "Pub",
                //         Attendees = new List<ActivityAttendee>
                //         {
                //             new ActivityAttendee
                //             {
                //                 AppUser = users[2],
                //                 IsHost = true                            
                //             },
                //             new ActivityAttendee
                //             {
                //                 AppUser = users[1],
                //                 IsHost = false                            
                //             },
                //         }
                //     }
                // };

                // await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
