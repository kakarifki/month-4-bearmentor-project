# Indonesian Cultural Heritage API

This project provides a REST API for accessing and exploring data on Indonesian cultural heritage. It includes information on provinces, ethnic groups, cultural practices, regional songs, and traditional cuisine.

## Features

*   **RESTful API:** Enables easy integration with web applications or other services.
*   **OpenAPI Specification:** Provides a machine-readable documentation of the API endpoints and data structures.
*   **Swagger UI:** Offers an interactive interface for exploring and testing the API.
*   **Detailed Data Model:** Represents various aspects of Indonesian culture.
*   **Tailwind CSS Integration:** Enhances the visual appeal of the welcome page.


## API Documentation

The API is documented using the OpenAPI Specification, which can be accessed at:

*   `/doc`: Machine-readable documentation (JSON)
*   `/api`: Interactive Swagger UI for exploring and testing endpoints

## Welcome Page

The API provides a welcome page accessible at [https://indonesia-heritage-api.rifkiseptiawan.com/](https://indonesia-heritage-api.rifkiseptiawan.com/). This page offers a brief overview of the API's purpose and functionality.

## Data Model

The API utilizes a Prisma data model to define the structure of its data. You can find the model definition in the `schema.prisma` file. It includes the following entities:

*   **Province:** Represents a province in Indonesia, with attributes like `name`, `provinceCode`, `capital_city`, `population`, and `area_size`.
*   **EthnicGroup:** Represents an ethnic group residing in a particular province, with attributes like `name` and `ethnicGroupCode`.
*   **Culture:** Represents a cultural practice associated with a province, with attributes like `name`, `cultureCode`, `category` (DANCE, TRADITIONAL\_CLOTHING, TRADITIONAL\_HOUSE), and `description`.
*   **RegionalSong:** Represents a regional song from a province, with attributes like `title`, `regionalSongCode`, and `composer`.
*   **Cuisine:** Represents a traditional cuisine from a province, with attributes like `name`, `cuisineCode`, and `description`.

## Routes

The API exposes various routes for interacting with the data:

*   `/provinces`: CRUD operations for provinces
*   `/ethnics`: CRUD operations for ethnic groups
*   `/cultures`: CRUD operations for cultures
*   `/songs`: CRUD operations for regional songs
*   `/cuisine`: CRUD operations for cuisines

## Technologies Used

*   Hono
*   Prisma
*   PostgreSQL
*   Tailwind CSS (via CDN for the welcome page)
*   OpenAPI
*   Swagger UI
*   Bun