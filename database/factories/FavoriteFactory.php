<?php

use Faker\Generator as Faker;

$factory->define(App\Favorite::class, function (Faker $faker) {
    return [
        'movie_id' => $faker->randomNumber(4),
        'title' => $faker->title,
        'poster_path' => $faker->image,
        'user_id' => function () {
            return factory(App\User::class)->create()->id;
        }
    ];
});
