<?php

namespace Tests\Feature;

use App\User;
use App\Favorite;
use Tests\TestCase;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * TODO: Fix the tests to be more robust
 */
class FavoritesTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $user = factory(User::class)->create();
        $favorite = factory(Favorite::class)->create([
            'user_id' => $user->id,
            'title' => 'Retrieve favorites!'
        ]);
        Passport::actingAs($user);

        $this->get('/api/favorites')
             ->assertStatus(200);
    }

    public function testStore()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user, ['create-servers']);

        $data = [
            'movie_id' => 1256,
            'title' => 'Post favorite',
            'poster_path' => '/testing.jpg',
            'user_id' => $user->id
        ];
        $this->post('/api/favorites', $data)
             ->assertStatus(201)
             ->assertJsonStructure([
                 'favorite_id',
                  'id',
                  'isFavorite',
                  'poster_path',
                  'title'
             ]);
    }

    public function testDestroy()
    {
        $user = factory(User::class)->create();
        $favorite = factory(Favorite::class)->create([
            'user_id' => $user->id
        ]);
        Passport::actingAs($user);
        $this->delete("/api/favorites/{$favorite->id}")
             ->assertStatus(200);
    }

    public function testDestroyByMovieid()
    {
        $user = factory(User::class)->create();
        $favorite = factory(Favorite::class)->create([
            'user_id' => $user->id
        ]);
        Passport::actingAs($user);
        $this->delete("/api/favorites/movie/{$favorite->movie_id}")
             ->assertStatus(200);
    }
}
