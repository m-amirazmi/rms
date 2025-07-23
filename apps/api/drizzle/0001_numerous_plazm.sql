CREATE TABLE "product_attribute" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_attribute_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"attribute_id" integer NOT NULL,
	"value" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_attribute_value" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"attribute_id" integer NOT NULL,
	"value" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_model" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"brand_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar(100),
	"model_id" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "product_attribute" ADD CONSTRAINT "product_attribute_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_option" ADD CONSTRAINT "product_attribute_option_attribute_id_product_attribute_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."product_attribute"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_value" ADD CONSTRAINT "product_attribute_value_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_value" ADD CONSTRAINT "product_attribute_value_attribute_id_product_attribute_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."product_attribute"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_brands" ADD CONSTRAINT "product_brands_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_model" ADD CONSTRAINT "product_model_brand_id_product_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."product_brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_model_id_product_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."product_model"("id") ON DELETE cascade ON UPDATE no action;