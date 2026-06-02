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
    //! Servicios necesarios para el flujo completo de registro
    public function __construct(
        protected StartRegisterService $startServ,
        protected VerifyRegisterService $verifyServ,
        protected ResendRegisterService $resendServ,
        protected CompleteRegisterService $completeServ
    ) {}

    //! Iniciar proceso de registro generando sesión y OTP
    public function start(RegisterStartRequest $request)
    {
        // Delegar lógica de inicio al servicio correspondiente
        $session = $this->startServ->handle(
            $request->input('email'),
            $request->input('password')
        );

        //? Retornar token de registro y datos básicos de sesión
        return response()->json([
            'message' => 'Te enviamos un código a tu correo.',
            'data' => [
                'registration_token' => $session->registration_token,
                'email' => $session->email,
                'expires_at' => $session->expires_at,
            ]
        ], 201);
    }

    //! Verificar código OTP asociado a la sesión de registro
    public function verify(RegisterVerifyRequest $request)
    {
        // Delegar verificación al servicio correspondiente
        $session = $this->verifyServ->handle(
            $request->input('registration_token'),
            $request->input('code')
        );

        //? Retornar confirmación de verificación
        return response()->json([
            'message' => 'Correo verificado.',
            'data' => [
                'email' => $session->email,
                'verified_at' => $session->verified_at,
            ]
        ]);
    }

    //! Reenviar código OTP respetando reglas de cooldown
    public function resend(RegisterResendRequest $request)
    {
        // Delegar reenvío al servicio correspondiente
        $session = $this->resendServ->handle(
            $request->input('registration_token')
        );

        //? Retornar nueva fecha de expiración del código
        return response()->json([
            'message' => 'Te reenviamos un nuevo código a tu correo.',
            'data' => [
                'email' => $session->email,
                'expires_at' => $session->expires_at,
            ]
        ]);
    }

    //! Completar registro y crear usuario definitivo
    public function complete(RegisterCompleteRequest $request)
    {
        // Obtener datos validados del request
        $data = $request->validated();

        // Delegar creación de usuario al servicio correspondiente
        $user = $this->completeServ->handle($data['registration_token'], $data);

        //? Retornar información básica del usuario creado
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
