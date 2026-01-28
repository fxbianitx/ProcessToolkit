<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('type'); // 'discount', 'shipping', 'tax', 'validation', 'notification'
            
            // Condiciones (estructura JSON flexible)
            $table->json('conditions');
            /*
            Ejemplo de estructura:
            [
                {
                    "field": "cart_total",
                    "operator": ">=",
                    "value": 500
                },
                {
                    "field": "customer_type",
                    "operator": "==",
                    "value": "premium"
                }
            ]
            */
            
            // Acciones a ejecutar cuando se cumple
            $table->json('actions');
            /*
            Ejemplo:
            [
                {
                    "type": "apply_discount",
                    "value": 20,
                    "unit": "percentage"
                },
                {
                    "type": "trigger_webhook",
                    "webhook_id": 1
                }
            ]
            */
            
            // Prioridad para reglas conflictivas
            $table->integer('priority')->default(0);
            
            // Metadatos de ejecución
            $table->integer('execution_count')->default(0);
            $table->timestamp('last_executed_at')->nullable();
            
            // Estado y auditoría
            $table->boolean('is_active')->default(true);
            $table->softDeletes();
            $table->timestamps();

            // Índices para optimización
            $table->index(['organization_id', 'type', 'is_active']);
            $table->index(['organization_id', 'priority']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_rules');
    }
};