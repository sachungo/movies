<?php

namespace App\Http\Controllers\Themoviedb;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

use App\Http\Resources\Cast;
use App\Http\Resources\Movie;
use App\Http\Resources\Movies;
use App\Http\Resources\Actors;

class MovieProxy
{
    protected $apiClient;
    protected $apiKey;
    protected $baseURI;

    public function __construct(Client $client)
    {
        $this->apiClient = $client;
        $this->apiKey = env('THEMOVIEDB_API_KEY');
        $this->baseURI = env('THEMOVIEDB_API_URL');
    }

    public function getMoviesList($queryParameters = [])
    {
        $parameters = array_merge($queryParameters, [
            'sort_by' => 'popularity.desc',
            'include_adult' => false,
            'include_video' => false
        ]);
        $query = $this->constructQueryString($parameters);

        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'discover/movie?' . $query);
            $collection = collect(json_decode($response->getBody(), true));
            return new Movies($collection);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    public function getGenres()
    {
        $query = $this->constructQueryString();
        try{
            $response = $this->apiClient->request('GET', $this->baseURI . 'genre/movie/list?' . $query);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    public function getMovie($movie_id)
    {
        $query = $this->constructQueryString([
            'append_to_response' => 'credits'
        ]);
        try{
            $response = $this->apiClient->request('GET', $this->baseURI . 'movie/' . $movie_id . '?' . $query);
            $collection = collect(json_decode($response->getBody(), true));
            return new Movie($collection);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    public function getMovieCast($movie_id)
    {
        $query = $this->constructQueryString();
        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'movie/' . $movie_id . '/credits?' . $query);
            $collection = collect(json_decode($response->getBody(), true));
            return new Cast($collection);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    public function getPopularActors()
    {
        $query = $this->constructQueryString();
        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'person/popular?' . $query);
            $collection = collect(json_decode($response->getBody(), true));
            return new Actors($collection);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    public function searchByMovieName($queryParameters = [])
    {
        $parameters = array_merge($queryParameters, [
            'include_adult' => false
        ]);
        $query = $this->constructQueryString($parameters);
        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'search/movie?' . $query);
            $collection = collect(json_decode($response->getBody(), true));
            return new Movies($collection);
        } catch (RequestException $e) {
            return $this->handleExceptions($e);
        }
    }

    private function constructQueryString($queryArgs = [])
    {
        $params = array_merge($queryArgs, [
            'api_key' => $this->apiKey
        ]);
        return http_build_query($params);
    }

    private function handleExceptions($exception) {
        if ($exception->hasResponse()) {
            $error = json_decode($exception->getResponse()->getBody()->getContents(), true);
            return response()->json(['errors' =>  $error]);
       }
       return response()->json(['errors' => $exception->getRequest()]);
    }
}
