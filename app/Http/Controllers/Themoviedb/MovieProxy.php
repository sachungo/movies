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

    public function getMoviesList($pageNumber = 1)
    {
        $query = $this->constructQueryString([
            'sort_by' => 'popularity.desc',
            'include_adult' => false,
            'include_video' => false,
            'page' => $pageNumber
        ]);

        try {
            $response = $this->apiClient->request('GET', $this->baseURI . 'discover/movie?' . $query);

            // TODO: use a resource that have only the data I need
            return json_decode($response->getBody(), true);

        } catch (RequestException $e) {
            // TODO: handle the exception properly
        }
    }

    public function getGenres()
    {
        $query = $this->constructQueryString();
        try{
            $response = $this->apiClient->request('GET', $this->baseURI . 'genre/movie/list?' . $query);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle the error
        }
    }

    public function getMovie($movie_id)
    {
        $query = $this->constructQueryString();
        try{
            $response = $this->apiClient->request('GET', $this->baseURI . 'movie/' . $movie_id . '?' . $query);
            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            // TODO: handle the error
        }
    }

    private function constructQueryString($queryArgs = [])
    {
        $params = array_merge($queryArgs, [
            'api_key' => $this->apiKey
        ]);
        return http_build_query($params);
    }
}
