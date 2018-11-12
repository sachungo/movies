<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Favorite;
use App\Http\Requests\Favorite as FavoriteRequest;
use App\Http\Resources\Favorite as AlbumResource;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    private $user_id;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->user_id = Auth::guard('api')->id();
        $this->user = Auth::guard('api')->user();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $favorites = Favorite::where('user_id', $this->user_id)->get();
        return AlbumResource::collection($favorites);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Favorite  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FavoriteRequest $request)
    {
        $favorite = $this->user
                         ->favorites()
                         ->create($request->all());

        return new AlbumResource($favorite);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $favorite = Favorite::find($id)->delete();
        return response()->json([
            'deleted' => $favorite,
            'favorite_id' => $id
        ]);
    }
}
