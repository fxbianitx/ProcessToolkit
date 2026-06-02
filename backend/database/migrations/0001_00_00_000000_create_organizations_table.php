<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique('organizations_code_unique'); // 🔎 búsqueda
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('privacy', ['public', 'private'])->default('private');
            $table->string('api_token_hash', 80)->unique();
            $table->json('settings')->nullable();
            $table->enum('status', ['trial', 'active', 'suspended'])->default('active');
            $table->softDeletes();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
