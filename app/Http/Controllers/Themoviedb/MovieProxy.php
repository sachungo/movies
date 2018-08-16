<?php

namespace App\Http\Controllers\Themoviedb;

use GuzzleHttp\Client;

class MovieProxy
{
    protected $apiClient;
    protected $apiKey;

    public function __construct()
    {
        $this->apiClient = new Client([
            'base_uri' => env('THEMOVIEDB_API_URL')
        ]);
        $this->apiKey = env('THEMOVIEDB_API_KEY');
    }

    public function getMoviesList($pageNumber = 1)
    {
        $query = $this->constructQueryString([
            'sort_by' => 'popularity.desc',
            'include_adult' => false,
            'include_video' => false,
            'page' => $pageNumber
        ]);

        // TODO: put request in a try catch handler for guzzle request errors
        $response = $this->apiClient->get('discover/movie?' . $query);

        // TODO: use a resource that have only the data I need
        return json_decode($response->getBody(), true);
    }

    private function constructQueryString($queryArgs = [])
    {
        $params = array_merge($queryArgs, [
            'api_key' => $this->apiKey
        ]);
        return http_build_query($params);
    }
}
