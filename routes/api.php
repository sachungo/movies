<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/movies', 'MoviesController@getAll');
Route::get('/genres', 'MoviesController@getAllGenres');
Route::get('/movie/{movie_id}', 'MoviesController@getMovieInfo');
Route::get('/movie/{movie_id}/cast', 'MoviesController@getMovieCast');
Route::get('/actors', 'MoviesController@getActors');
Route::get('/search', 'MoviesController@searchByName');

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::get('logout', 'Auth\LoginController@logout');

Route::resource('favorites', 'FavoriteController')->only([
    'index', 'store', 'destroy'
]);
