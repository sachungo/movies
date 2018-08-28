<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Themoviedb\MovieProxy;

class MoviesController extends Controller
{
    public function __construct(MovieProxy $proxy)
    {
        $this->movieProxy = $proxy;
    }

    public function getAll(Request $request)
    {
        return $this->movieProxy->getMoviesList($request->page ?? 1);
    }

    public function getAllGenres()
    {
        return $this->movieProxy->getGenres();
    }

    public function getMovieInfo(Request $request)
    {
        $movie_id = $request->route('movie_id');
        return $this->movieProxy->getMovie($movie_id);
    }

    public function getMovieCast(Request $request)
    {
        $movie_id = $request->route('movie_id');
        return $this->movieProxy->getMovieCast($movie_id);
    }
}
