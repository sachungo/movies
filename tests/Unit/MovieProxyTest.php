<?php

namespace Tests\Unit;

use Tests\TestCase;
use GuzzleHttp\Client;
use App\Http\Resources\Cast;
use GuzzleHttp\Psr7\Response;
use App\Http\Resources\Movie;
use App\Http\Resources\Movies;
use App\Http\Resources\Actors;
use GuzzleHttp\Handler\MockHandler;
use App\Http\Controllers\Themoviedb\MovieProxy;

class MovieProxyTest extends TestCase
{
    protected function setUp()
    {
        $this->mockHandler = new MockHandler();
        $apiClient = new Client([
            'handler' => $this->mockHandler,
        ]);
        $this->movieProxy = new MovieProxy($apiClient);

        parent::setUp();
    }

    public function testGetMoviesList()
    {
        $data = [
            'results' => [
                [
                    'id' => 1234,
                    'title' => "testing"
                ]
            ],
            'total_results' => 1,
            'page' => 1
        ];
        $this->mockHandler->append(new Response(200, [], json_encode($data)));
        $resource = new Movies(collect($data));
        $response = $this->movieProxy->getMoviesList();
        $this->assertEquals($resource, $response);
    }

    public function testGetGenres()
    {
        $data = [
            'genres' => [
                [
                    'id' => 6,
                    'name' => 'Get genres'
                ]
            ]
        ];

        $this->mockHandler->append(new Response(200, [], json_encode($data)));
        $response = $this->movieProxy->getGenres();
        $this->assertEquals($data, $response);
    }

    public function testGetMovie()
    {
        $response = [
            'genres' => [
                [
                    'id' => 12,
                    'name' => 'Adventure'
                ]
            ],
            'id' => 123,
            'title' => 'Testing movie'
        ];
        $this->mockHandler->append(new Response(200, [], json_encode($response)));
        $resource = new Movie(collect($response));
        $this->assertEquals($resource, $this->movieProxy->getMovie(1));
    }

    public function testGetMovieCast()
    {
        $response = [
            'id' => 299536,
            'cast' => [
                [
                    'id' => 123,
                    'character' => 'Thanos',
                    'name' => 'Josh Brolin',
                    'profile_path' => '/testing.jpg'
                ]
            ]
        ];
        $this->mockHandler->append(new Response(200, [], json_encode($response)));
        $resource = new Cast(collect($response));
        $this->assertEquals($resource, $this->movieProxy->getMovieCast(299536));
    }

    public function testGetPopularActors()
    {
        $data = [
            'results' => [
                [
                    'id' => 1234,
                    'name' => 'Actor 1'
                ],
                [
                    'id' => 65789,
                    'name' => 'Actor 2'
                ]
            ]
        ];
        $this->mockHandler->append(new Response(200, [], json_encode($data)));
        $response = $this->movieProxy->getPopularActors();
        $resource = new Actors(collect($data));
        $this->assertEquals($resource, $response);
    }

    public function testSearchByMovieName()
    {
        $results = [
            'results' => [
                [
                    'id' => 1234,
                    'title' => 'Search Movie'
                ]
            ],
            'total_pages' => 1,
            'page' => 1
        ];

        $this->mockHandler->append(new Response(200, [], json_encode($results)));
        $response = $this->movieProxy->searchByMovieName();
        $resource = new Movies(collect($results));
        $this->assertEquals($resource, $response);
    }
}
