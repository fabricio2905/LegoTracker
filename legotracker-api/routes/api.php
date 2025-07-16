    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\MontagemController;

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:api');

    // Rotas para as montagens
    Route::apiResource('montagens', MontagemController::class);
    