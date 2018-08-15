A short project using Laravel framework for the backend and ReactJS for the frontend

# Getting Started

Before you get started with the project, ensure you have [composer](https://getcomposer.org/download/) installed.

## Installation Steps
1. Clone the repository
2. Install packages using `composer install` command
3. Copy the content of `.env.example` into a `.env` file
4. Generate an *Application Key* using `php artisan key:generate` command
5. Follow the installation instructions of [Valet](https://laravel.com/docs/5.6/valet#installation).
   - Window machine users should install [Homestead](https://laravel.com/docs/5.6/homestead) instead of Valet
   - You can now test locally by accessing your app on the browser as `<app-name>.test`
6. To tell valet to serve your app, run `valet link app-name` in your project's directory
   - You are now ready to go. Access your site in your browser as `http://app-name.test`
