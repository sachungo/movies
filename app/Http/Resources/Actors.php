<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Actors extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $actors = array_slice($this->resource->get('results'), 0, 10);
        return [
            'results' => array_map(function ($actor) {
                return [
                    'id' => $actor['id'],
                    'name' => $actor['name'],
                    'profile_path' => $actor['profile_path'],
                    'popularity' => $actor['popularity']
                ];
            }, $actors)
        ];
    }
}
