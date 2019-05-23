<?php

use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menus')->insert([
            'title' => 'Menu item 1',
            'parent_id' => 0,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Menu item 2',
            'parent_id' => 0,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Menu item 3',
            'parent_id' => 0,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Sub Menu item 1',
            'parent_id' => 1,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Sub Menu item 1',
            'parent_id' => 3,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Sub Menu item 2',
            'parent_id' => 3,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Sub Menu item 3',
            'parent_id' => 3,
            'visibility' => 'public'
        ]);
    }
}
