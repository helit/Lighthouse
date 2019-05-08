<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Henrik',
            'email' => 'henrik.littke@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 'super_user'
        ]);
    }
}
