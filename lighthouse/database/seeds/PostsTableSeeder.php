<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            'slug' => 'first-post',
            'title' => 'First Post',
            'body' => 'This is a generated example post.',
            'published' => 1,
            'visibility' => 'public'
        ]);

        DB::table('posts')->insert([
            'slug' => 'second-post',
            'title' => 'Second Post',
            'body' => 'This is a generated example post.',
            'published' => 1,
            'visibility' => 'public'
        ]);
    }
}
