<?php namespace App\Models; 

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Montagem extends Model
{
    use HasFactory;

    // Define os campos que podem ser preenchidos em massa
    protected $fillable = [
        'nome',
        'descricao',
        'url_imagem',
        'progresso_atual',
        'progresso_total',
        'status',
    ];

    protected $table = 'montagens';
}
