<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Movies extends JsonResource
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
            'results' => $this->mapToArray($this->resource->get('results')),
            'total_results' => $this->resource->get('total_results'),
            'page' => $this->resource->get('page')
        ];
    }

    private function mapToArray($array)
    {
        return array_map(function ($item) {
            return [
                'id' => $item['id'],
                'title' => $item['title'],
                'popularity' => $item['popularity'],
                'poster_path' => $item['poster_path'],
                'genre_ids' => $item['genre_ids'],
                'overview' => $item['overview'],
                'release_date' => $item['release_date']
            ];
        }, $array);
    }
}
