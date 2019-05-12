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
            'title' => 'Menu',
            'parent_id' => 0,
            'visibility' => 'public'
        ]);

        DB::table('menus')->insert([
            'title' => 'Sub Menu',
            'parent_id' => 1,
            'visibility' => 'public'
        ]);
    }
}
