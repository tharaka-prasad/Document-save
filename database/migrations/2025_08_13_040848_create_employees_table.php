<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->integer('phone_number')->unique();
            $table->string('address');
            $table->string('id_number')->unique();
            $table->string('passport_number')->unique();
            $table->date('date_of_birth');
            $table->string('city');
            $table->string('district');
            $table->string('province');
            $table->string('gender');
            $table->string('agency');
            $table->json('documents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
