<?php

namespace App\Http\Controllers\Themoviedb;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

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

            // TODO: use a resource that have only the data I need
            // $response->json();
            return json_decode($response->getBody(), true);

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
            // dd(json_decode($response->getBody(), true));
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle the error
        }
    }

    public function getMovieCast($movie_id)
    {
        $query = $this->constructQueryString();
        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'movie/' . $movie_id . '/credits?' . $query);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle request exceptions
        }
    }

    public function getPopularActors()
    {
        $query = $this->constructQueryString();
        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'person/popular?' . $query);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle request exceptions
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
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle request exceptions
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
