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
}
