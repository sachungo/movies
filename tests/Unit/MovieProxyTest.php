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
}
