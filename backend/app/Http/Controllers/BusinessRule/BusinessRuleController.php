<?php

namespace App\Http\Controllers\BusinessRule;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessRule\StoreBusinessRuleRequest;
use App\Services\BusinessRule\BusinessRuleService;

class BusinessRuleController extends Controller
{
    public function __construct(
        protected BusinessRuleService $businessRuleServ
    ) {}

    public function store(StoreBusinessRuleRequest $request)
    {
        $data = $request->validated();

        $rule = $this->businessRuleServ->save($data);

        return response()->json([
            'message' => 'Regla creada',
            'data' => $rule,
        ], 201);
    }
}
