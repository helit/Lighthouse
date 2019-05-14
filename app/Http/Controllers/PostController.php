<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return PostResource::collection(Post::all());
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $post = Post::create($data);

        return new PostResource($post);
    }

    public function update(Request $request, Post $post)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $post->update($data);

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response(null, 204);
    }
}
