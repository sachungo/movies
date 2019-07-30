<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Favorite;
use App\Http\Requests\Favorite as FavoriteRequest;
use App\Http\Resources\Favorite as AlbumResource;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $favorites = Favorite::where('user_id', Auth::guard('api')->id())
                               ->get();
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
        // return response()->json([
        //     'user' => Auth::guard('api')->user(),
        //     'id' => Auth::guard('api')->id()
        // ]);
        $favorite = Auth::guard('api')
                         ->user()
                         ->favorites()
                         ->create($request->all());

        return new AlbumResource($favorite);

    }

    /**
     * Remove the specified resource from storage by favorite id.
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

    /**
     * Remove the specified resource from storage by movie id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyByMovieId($id)
    {
        $favorite = Favorite::where('movie_id', $id)->first()->delete();
        return response()->json([
            'deleted' => $favorite,
            'id' => $id
        ]);
    }
}
