<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pages')->insert([
            'slug' => 'start-page',
            'title' => 'Start Page',
            'body' => 'This is a generated start page.',
            'published' => 1,
            'visibility' => 'public'
        ]);

        DB::table('pages')->insert([
            'slug' => 'example-page',
            'title' => 'Example Page',
            'body' => 'This is a generated example page.',
            'published' => 1,
            'visibility' => 'public'
        ]);
    }
}
