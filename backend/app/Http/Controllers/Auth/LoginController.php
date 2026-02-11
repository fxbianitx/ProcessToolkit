<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Login\LoginRequest;
use App\Services\Auth\Login\LoginCredentialsService;
use App\Services\Auth\Login\SignOutService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct(
        private LoginCredentialsService $credentialsServ,
        private SignOutService $signOutServ,
    ) {}

    //! Iniciar sesión
    public function login(LoginRequest $request)
    {
        // Validar credenciales
        $credentials = $request->only('email', 'password');

        // Iniciar sesion y obtener token
        $token = $this->credentialsServ->signIn($credentials);

        $cookie = cookie(
            name: 'auth_token',
            value: $token,
            minutes: 60 * 24 * 30,
            path: '/',
            domain: null,
            secure: false, // localhost http
            httpOnly: true,
            sameSite: 'lax'
        );

        return response()->json([
            'ok' => true,
            'token' => $token,
        ])->withCookie($cookie);
    }

    //! Obtener usuario actual
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    //! Cerrar sesión
    public function logout(Request $request)
    {
        $this->signOutServ->logout();

        $cookie = cookie(
            name: 'auth_token',
            value: '',
            minutes: -1,
            path: '/',
            domain: null,
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        );

        return response()->json(['ok' => true])->withCookie($cookie);
    }
}
