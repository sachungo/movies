<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Movie extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->get('id'),
            'title' => $this->resource->get('title'),
            'poster_path' => $this->resource->get('poster_path'),
            'popularity' => $this->resource->get('popularity'),
            'release_date' => $this->resource->get('release_date'),
            'overview' => $this->resource->get('overview'),
            'genres' => $this->resource->get('genres'),
            'credits' => [
                'cast' => $this->getCastInfo(
                    $this->resource->get('credits')['cast']
                )
            ]
        ];
    }

    private function getCastInfo($cast)
    {
        return array_map(function ($person) {
            return [
                'id' => $person['id'],
                'name' => $person['name'],
                'profile_path' => $person['profile_path'],
                'character' => $person['character']
            ];
        }, $cast);
    }
}
