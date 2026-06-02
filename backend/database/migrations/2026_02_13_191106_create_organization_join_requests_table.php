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
        Schema::create('organization_join_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');

            $table->foreignId('reviewed_by')->nullable()->constrained('users'); 
            $table->timestamp('reviewed_at')->nullable();
            $table->string('review_note', 255)->nullable();

            $table->timestamps();

            // 1 fila por (org, user) para manejar re-solicitud vía update
            $table->unique(['organization_id', 'user_id'], 'org_joinreq_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organization_join_requests');
    }
};
