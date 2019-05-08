<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return UserResource::collection(User::all());
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'role' => 'required',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = User::create($data);

        return new UserResource($user);
    }

    public function update(Request $request, User $user)
    {
        if ($user->id === 1 && auth()->user()->id !== 1) {
            return response()->json(['message' => 'Not allowed to edit this user'], 403);
        }

        $data = $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'role' => 'required',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response(null, 204);
    }
}
