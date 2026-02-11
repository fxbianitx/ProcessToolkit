<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Código de verificación</title>
</head>

<body style="margin:0;padding:0;background:#f1f5f9;">
    {{-- Preheader --}}
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Tu código de verificación es {{ $otp }}. Vence en {{ $minutes }} minutos.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;">
        <tr>
            <td align="center" style="padding:28px 14px;">

                {{-- Container --}}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:520px;">
                    {{-- Brand --}}
                    <tr>
                        <td align="center" style="padding:0 0 14px 0;">
                            <div
                                style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                          font-size:12px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase;
                          color:#64748b;">
                                Motor de Reglas
                            </div>
                        </td>
                    </tr>

                    {{-- Card --}}
                    <tr>
                        <td
                            style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;
                       box-shadow:0 10px 22px rgba(15,23,42,0.06);">

                            {{-- Header block --}}
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding:22px 22px 10px 22px;">
                                        <div
                                            style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;
                                color:#64748b;">
                                            Verificación de correo
                                        </div>
                                        <div
                                            style="margin-top:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                font-size:22px;line-height:1.2;font-weight:900;color:#0f172a;">
                                            Tu código de verificación
                                        </div>
                                        <div
                                            style="margin-top:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                font-size:13px;line-height:1.7;color:#475569;">
                                            Ingresa este código para confirmar tu correo:
                                            <span style="font-weight:800;color:#0f172a;">{{ $email }}</span>.
                                            <br>
                                            Este código vence en <span
                                                style="font-weight:800;color:#0f172a;">{{ $minutes }}
                                                minutos</span>.
                                        </div>
                                    </td>
                                </tr>

                                {{-- Divider --}}
                                <tr>
                                    <td style="padding:0 22px;">
                                        <div style="height:1px;background:#e2e8f0;"></div>
                                    </td>
                                </tr>

                                {{-- OTP section --}}
                                <tr>
                                    <td style="padding:18px 22px 18px 22px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tr>
                                                <td align="center">

                                                    {{-- OTP box (square + aligned) --}}
                                                    <table role="presentation" cellpadding="0" cellspacing="0"
                                                        border="0"
                                                        style="border:1px solid #0f172a;border-radius:12px;overflow:hidden;">
                                                        <tr>
                                                            <td align="center"
                                                                style="background:#0f172a;padding:14px 18px;">
                                                                <div
                                                                    style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                                            font-size:30px;line-height:1;font-weight:900;letter-spacing:0.22em;color:#ffffff;">
                                                                    {{ $otp }}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <div
                                                        style="margin-top:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                      font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;
                                      color:#64748b;">
                                                        No compartas este código
                                                    </div>

                                                    {{-- Secondary help (copy/paste) --}}
                                                    <div
                                                        style="margin-top:6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                      font-size:12px;line-height:1.6;color:#64748b;">
                                                        Si no puedes copiarlo, escríbelo manualmente en la pantalla de
                                                        verificación.
                                                    </div>

                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                {{-- Divider --}}
                                <tr>
                                    <td style="padding:0 22px;">
                                        <div style="height:1px;background:#e2e8f0;"></div>
                                    </td>
                                </tr>

                                {{-- Footer --}}
                                <tr>
                                    <td style="padding:16px 22px 22px 22px;">
                                        <div
                                            style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                font-size:12px;line-height:1.7;color:#64748b;">
                                            Si no solicitaste este registro, ignora este mensaje.
                                        </div>

                                        <div
                                            style="margin-top:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                font-size:11px;line-height:1.6;color:#94a3b8;">
                                            © {{ date('Y') }} Motor de Reglas · Mensaje automático
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    {{-- Outer spacing --}}
                    <tr>
                        <td style="padding:12px 0 0 0;"></td>
                    </tr>

                    {{-- Tiny note --}}
                    <tr>
                        <td align="center" style="padding:0 8px;">
                            <div
                                style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                    font-size:11px;line-height:1.6;color:#94a3b8;">
                                ¿Problemas? Asegúrate de ingresar el código antes de que expire.
                            </div>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>

</html>
