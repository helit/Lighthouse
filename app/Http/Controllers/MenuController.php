<?php

namespace App\Http\Controllers;

use App\Menu;
use Illuminate\Http\Request;
use App\Http\Resources\Menu as MenuResource;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        return MenuResource::collection(Menu::all());
    }

    public function show(Menu $menu)
    {
        return new MenuResource($menu);
    }

    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $menu = Menu::create($data);

        return new MenuResource($menu);
    }

    public function update(Request $request, Menu $menu)
    {
        $data = $this->validate($request, [
            'slug' => 'required',
            'title' => 'required',
        ]);

        $menu->update($data);

        return new MenuResource($menu);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return response(null, 204);
    }
}
