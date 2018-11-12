<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Favorite extends JsonResource
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
            'id' => $this->movie_id,
            'favorite_id' => $this->id,
            'title' => $this->title,
            'poster_path' => $this->poster_path
        ];
    }
}
