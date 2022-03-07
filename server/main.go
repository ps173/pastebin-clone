package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// TODO : Refactor The code to move models to different file and the route
// handlers to different file
// TODO : Make a update route for the snippets also

type Paste struct {
	ID        string         `json:"id" gorm:"primaryKey"`
	Body      *string        `json:"body" gorm:"not null"`
	Author    *string        `json:"author" gorm:"not null"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt"`
}

func ReadAllPastes(db *gorm.DB) []Paste {
	pastes := []Paste{}
	result := db.Find(&pastes)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	return pastes
}

func ReadPasteById(id string, db *gorm.DB) (Paste, error) {
	paste := Paste{}
	result := db.First(&paste, "id = ?", id)
	var err error
	if result.Error != nil {
		err = result.Error
	}
	return paste, err
}

func main() {
	dbUrl := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	db.AutoMigrate(&Paste{})
	if err != nil {
		fmt.Println(err)
	}
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		pastes := ReadAllPastes(db)
		return c.JSON(pastes)
	})

	app.Get("/:id", func(c *fiber.Ctx) error {
		paste, err := ReadPasteById(c.Params("id"), db)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(paste)
	})

	app.Delete("/:id", func(c *fiber.Ctx) error {
		paste := Paste{}
		result := db.Delete(&paste, "id = ?", c.Params("id"))
		if result.Error != nil {
			return c.Status(400).JSON(fiber.Map{"error": result.Error.Error()})
		}
		return c.JSON(paste)
	})

	app.Post("/", func(c *fiber.Ctx) error {
		paste := Paste{}
		err := c.BodyParser(&paste)
		paste.ID = uuid.New().String()
		result := db.Create(&paste)
		if result.Error != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": result.Error.Error(),
			})
		}
		if err != nil {
			fmt.Println(err)
		}
		return c.JSON(paste)
	})

	log.Fatalln(app.Listen(":6969"))
}
