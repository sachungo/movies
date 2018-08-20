<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Http\Request;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\Themoviedb\MovieProxy;

class MoviesControllerTest extends TestCase
{
    protected function setUp()
    {
        $this->mock = $this->getMockBuilder(MovieProxy::class)->getMock();
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
}
