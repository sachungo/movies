<?php

namespace Tests\Unit;

use Tests\TestCase;

use Illuminate\Http\Request;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\Themoviedb\MovieProxy;

class MoviesControllerTest extends TestCase
{
    protected function setUp()
    {
        $this->mock = $this->getMockBuilder(MovieProxy::class)
                           ->disableOriginalConstructor()
                           ->getMock();
        $this->request = $this->createMock(Request::class);
        parent::setUp();
    }

    public function testGetAll()
    {
        $results = [
            'id' => 56789,
            'title' => 'Testing',
            'overview' => 'Testing the getAll method'
        ];
        $this->mock->method('getMoviesList')->willReturn($results);
        $instance = new MoviesController($this->mock);
        $this->assertEquals($results, $instance->getAll($this->request));
    }

    public function testGetAllGenres()
    {
        $results = [
            'genres' => [
                [
                    'id' => 1,
                    'name' => 'Testing'
                ]
            ]
        ];

        $this->mock->method('getGenres')->willReturn($results);
        $instance = new MoviesController($this->mock);
        $this->assertEquals($results, $instance->getAllGenres());
    }

    public function testGetMovieInfo()
    {
        $results = [
            'genres' => [
                [
                    'id' => 12,
                    'name' => 'Adventure'
                ]
            ],
            'id' => 123,
            'title' => 'Testing movie'
        ];
        $this->mock->method('getMovie')->willReturn($results);
        $instance = new MoviesController($this->mock);
        $this->assertEquals($results, $instance->getMovieInfo($this->request));
    }

    public function testGetMovieCast()
    {
        $results = [
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
        $this->mock->method('getMovieCast')->willReturn($results);
        $instance = new MoviesController($this->mock);
        $this->assertEquals($results, $instance->getMovieCast($this->request));
    }
}
