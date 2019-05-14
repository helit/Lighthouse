<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;
use App\Http\Resources\Page as PageResource;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return PageResource::collection(Page::all());
    }

    public function show(Page $page)
    {
        return new PageResource($page);
    }

    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $page = Page::create($data);

        return new PageResource($page);
    }

    public function update(Request $request, Page $page)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $page->update($data);

        return new PageResource($page);
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return response(null, 204);
    }
}
