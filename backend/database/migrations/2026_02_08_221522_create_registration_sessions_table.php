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
        Schema::create('registration_sessions', function (Blueprint $table) {
            $table->id();

            $table->string('email')->index();
            $table->string('registration_token', 128)->unique('registration_sessions_token_unique');

            $table->string('password_hash');
            $table->string('code_hash');

            $table->timestamp('expires_at')->index();
            $table->timestamp('verified_at')->nullable()->index();

            $table->unsignedSmallInteger('attempts')->default(0);
            $table->timestamp('last_sent_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_sessions');
    }
};
