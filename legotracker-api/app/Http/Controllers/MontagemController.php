<?php

namespace App\Http\Controllers;

use App\Models\Montagem;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MontagemController extends Controller
{
    /**
     * Exibe uma lista de montagens.
     */
    public function index()
    {
        return response()->json(Montagem::all());
    }

    /**
     * Armazena uma nova montagem no banco de dados.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nome' => 'required|string|max:255',
                'descricao' => 'nullable|string',
                'url_imagem' => 'nullable|url|max:255',
                'progresso_atual' => 'required|integer|min:0',
                'progresso_total' => 'required|integer|min:1',
                'status' => 'required|string|in:Pendente,Em andamento,Pausado,Finalizado,Desistido',
            ]);

            $montagem = Montagem::create($validatedData);

            return response()->json($montagem, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocorreu um erro ao criar a montagem.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibe uma montagem específica.
     */
    public function show(Montagem $montagem)
    {
        return response()->json($montagem);
    }

    /**
     * Atualiza uma montagem existente no banco de dados.
     */
    public function update(Request $request, Montagem $montagem)
        {
            try {
                $validatedData = $request->validate([
                    'nome' => 'sometimes|required|string|max:255',
                    'descricao' => 'nullable|string',
                    'url_imagem' => 'nullable|url|max:255',
                    'progresso_atual' => 'sometimes|required|integer|min:0',
                    'progresso_total' => 'sometimes|required|integer|min:1',
                    'status' => 'sometimes|required|string|in:Pendente,Em andamento,Pausado,Finalizado,Desistido',
                ]);

                $montagem->update($validatedData);

                // Retorna o modelo atualizado como uma resposta JSON explícita
                return response()->json($montagem); 
            } catch (ValidationException $e) {
                return response()->json([
                    'message' => 'Erro de validação',
                    'errors' => $e->errors()
                ], 422);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Ocorreu um erro ao atualizar a montagem.',
                    'error' => $e->getMessage()
                ], 500);
            }
        }

    /**
     * Remove uma montagem do banco de dados.
     */
    public function destroy(Montagem $montagem)
    {
        $montagem->delete();

        return response()->json(null, 204);
    }
}
