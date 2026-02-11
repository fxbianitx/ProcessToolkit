<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisterOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $otp,
        public string $email,
        public int $minutes = 15,
    ) {}

    public function build()
    {
        return $this
            ->subject('Tu código de verificación')
            ->view('emails.auth.register-otp');
    }
}
