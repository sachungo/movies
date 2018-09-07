<?php

namespace Tests\Unit;

use Tests\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
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
                ],
                [
                    'id' => 65789,
                    'title' => 'Movies testing'
                ]
            ]
        ];
        $this->mockHandler->append(new Response(200, [], json_encode($data)));
        $response = $this->movieProxy->getMoviesList();
        $this->assertEquals($data, $response);
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
        $this->assertEquals($response, $this->movieProxy->getMovie(1));
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
        $this->assertEquals($response, $this->movieProxy->getMovieCast(299536));
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
        $this->assertEquals($data, $response);
    }

    public function testSearchByActorName()
    {
        $results = [
            'results' => [
                'known_for' => [
                    [
                        'id' => 1234,
                        'title' => 'Search Movie'
                    ]
                ]
            ]
        ];

        $this->mockHandler->append(new Response(200, [], json_encode($results)));
        $response = $this->movieProxy->searchByActorName();
        $this->assertEquals($results, $response);
    }
}
