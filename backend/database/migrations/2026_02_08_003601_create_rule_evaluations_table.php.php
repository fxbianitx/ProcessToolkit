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
        Schema::create('rule_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('request_code', 64);
            $table->string('source', 20)->default('api');

            $table->json('input_snapshot')->nullable();
            $table->boolean('matched')->default(false);
            $table->json('actions_returned')->nullable();

            $table->unsignedInteger('duration_ms')->default(0);
            $table->timestamp('evaluated_at')->useCurrent();

            $table->timestamps();
            $table->unique(['organization_id', 'request_code']);
            $table->index(['organization_id', 'evaluated_at']);
            $table->index(['user_id', 'evaluated_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rule_evaluations');
    }
};
