<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function() {
    Route::post('login', 'AuthController@login');
});

Route::middleware('auth:api')->group(function () {
    Route::post('refresh', 'AuthController@refresh');
    Route::post('logout', 'AuthController@logout');
    Route::post('user', 'AuthController@user');

    // Users
    Route::get('users', 'UserController@index');
    Route::post('users', 'UserController@store');
    Route::get('users/{user}', 'UserController@show');
    Route::put('users/{user}', 'UserController@update');
    Route::delete('users/{user}', 'UserController@destroy');

    // Pages
    Route::get('pages', 'PageController@index');
    Route::post('pages', 'PageController@store');
    Route::get('pages/{page}', 'PageController@show');
    Route::put('pages/{page}', 'PageController@update');
    Route::delete('pages/{page}', 'PageController@destroy');

    // Posts
    Route::get('posts', 'PostController@index');
    Route::post('posts', 'PostController@store');
    Route::get('posts/{post}', 'PostController@show');
    Route::put('posts/{post}', 'PostController@update');
    Route::delete('posts/{post}', 'PostController@destroy');

    // Menus
    Route::get('menus', 'MenuController@index');
    Route::post('menus', 'MenuController@store');
    Route::get('menus/{menu}', 'MenuController@show');
    Route::put('menus/{menu}', 'MenuController@update');
    Route::delete('menus/{menu}', 'MenuController@destroy');
});
