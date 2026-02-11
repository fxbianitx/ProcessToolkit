<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Register\RegisterCompleteRequest;
use App\Http\Requests\Auth\Register\RegisterResendRequest;
use App\Http\Requests\Auth\Register\RegisterStartRequest;
use App\Http\Requests\Auth\Register\RegisterVerifyRequest;
use App\Services\Auth\Register\CompleteRegisterService;
use App\Services\Auth\Register\ResendRegisterService;
use App\Services\Auth\Register\StartRegisterService;
use App\Services\Auth\Register\VerifyRegisterService;

class RegisterController extends Controller
{
    public function __construct(
        protected StartRegisterService $startServ,
        protected VerifyRegisterService $verifyServ,
        protected ResendRegisterService $resendServ,
        protected CompleteRegisterService $completeServ
    ) {}

    public function start(RegisterStartRequest $request)
    {
        $session = $this->startServ->handle(
            $request->input('email'),
            $request->input('password')
        );

        return response()->json([
            'message' => 'Te enviamos un código a tu correo.',
            'data' => [
                'registration_token' => $session->registration_token,
                'email' => $session->email,
                'expires_at' => $session->expires_at,
            ]
        ], 201);
    }

    public function verify(RegisterVerifyRequest $request)
    {
        $session = $this->verifyServ->handle(
            $request->input('registration_token'),
            $request->input('code')
        );

        return response()->json([
            'message' => 'Correo verificado.',
            'data' => [
                'email' => $session->email,
                'verified_at' => $session->verified_at,
            ]
        ]);
    }

    public function resend(RegisterResendRequest $request)
    {
        $session = $this->resendServ->handle(
            $request->input('registration_token')
        );

        return response()->json([
            'message' => 'Te reenviamos un nuevo código a tu correo.',
            'data' => [
                'email' => $session->email,
                'expires_at' => $session->expires_at,
            ]
        ]);
    }

    public function complete(RegisterCompleteRequest $request)
    {
        $data = $request->validated();

        $user = $this->completeServ->handle($data['registration_token'], $data);

        return response()->json([
            'message' => 'Cuenta creada correctamente.',
            'data' => [
                'id' => $user->id,
                'code' => $user->code,
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'username' => $user->username,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
            ]
        ], 201);
    }
}
