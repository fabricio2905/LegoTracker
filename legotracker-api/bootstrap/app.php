    <?php

    use Illuminate\Foundation\Application;
    use Illuminate\Foundation\Configuration\Exceptions;
    use Illuminate\Foundation\Configuration\Middleware;
    use Illuminate\Support\Facades\Route; // Importe o Facade Route

    return Application::configure(basePath: dirname(__DIR__))
        ->withRouting(
            web: __DIR__.'/../routes/web.php',
            api: __DIR__.'/../routes/api.php', // <--- Certifique-se de que esta linha está presente
            commands: __DIR__.'/../routes/console.php',
            health: '/up',
            // Adicione um prefixo para as rotas da API aqui, se não estiver já no api.php
            apiPrefix: 'api', // <--- Adicione esta linha para prefixar automaticamente com /api
        )
        ->withMiddleware(function (Middleware $middleware) {
            //
        })
        ->withExceptions(function (Exceptions $exceptions) {
            //
        })->create();
    