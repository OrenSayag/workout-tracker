CREATE TYPE "public"."achievement_id" AS ENUM('first_workout', 'weekly_streak', 'monthly_streak', 'weekend_warrior');--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"achievement_id" "achievement_id" NOT NULL,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;