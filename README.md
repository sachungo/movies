[![CircleCI](https://circleci.com/gh/sachungo/movies/tree/master.svg?style=svg)](https://circleci.com/gh/sachungo/movies/tree/master)

A short project using Laravel framework for the backend and ReactJS for the frontend

# Getting Started

Before you get started with the project, ensure you have [composer](https://getcomposer.org/download/) installed.

Note that the commands run by `yarn` can also be executed using `npm`.

## Installation Steps
1. Clone the repository
2. Install packages using `composer install` command
3. Copy the content of `.env.example` into a `.env` file
4. Generate an *Application Key* using `php artisan key:generate` command
5. Follow the installation instructions of [Valet](https://laravel.com/docs/5.6/valet#installation).
   - Window machine users should install [Homestead](https://laravel.com/docs/5.6/homestead) instead of Valet
   - You can now test locally by accessing your app on the browser as `<app-name>.test`
6. Install node packages by running `yarn install`
7. Compile the assets by running either `yarn dev`, `yarn watch` or `yarn watch-poll`
8. If you are not using Valet nor Homestead, then execute `php artisan serve` and access your app at the given port number in the terminal

## Running tests
1. Run PHP tests by executing `./vendor/bin/phpunit`
2. The JavaScript tests can be run by `yarn test`
