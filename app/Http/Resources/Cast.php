<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Cast extends JsonResource
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
            'movie_id' => $this->resource->get('id'),
            'cast' => array_map(function ($cast) {
                return [
                    'id' => $cast['id'],
                    'name' => $cast['name'],
                    'profile_path' => $cast['profile_path'],
                    'character' => $cast['character']
                ];
            }, $this->resource->get('cast'))
        ];
    }
}
