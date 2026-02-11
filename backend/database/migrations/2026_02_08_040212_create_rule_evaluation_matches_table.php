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
        Schema::create('rule_evaluation_matches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('rule_evaluation_id')
                ->constrained('rule_evaluations')
                ->cascadeOnDelete();

            // FK sin cascade para evitar multiple cascade paths en SQL Server
            $table->unsignedBigInteger('business_rule_id');
            $table->foreign('business_rule_id')
                ->references('id')->on('business_rules')
                ->onDelete('no action'); // o restrictOnDelete()

            $table->string('rule_name_snapshot');
            $table->json('conditions_snapshot')->nullable();
            $table->json('actions_snapshot')->nullable();

            $table->timestamp('matched_at')->useCurrent();
            $table->timestamps();

            $table->unique(['rule_evaluation_id', 'business_rule_id']);
            $table->index(['business_rule_id', 'matched_at']);
            $table->index(['rule_evaluation_id', 'matched_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rule_evaluation_matches');
    }
};
