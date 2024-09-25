<?php

namespace Tests\Feature\Lead;

use App\Models\Lead\LeadStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LeadTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_criar_lead_com_cnpj_e_status(): void
    {
//         Etapa 1: Criação do vendedor (usuário)
        $vendedor = User::factory()->create();

        // Etapa 2: Criação de uma coluna no Kanban
        $status = LeadStatus::factory()->create([
            'nome' => 'Novo Lead',
            'ordem' => 1,
            'prazo_dias' => 10,
        ]);

        // Etapa 3: Testar o cadastro do lead com CNPJ
        $leadData = [
            'cnpj' => '12345678000195',
            'cpf' => '41121896804',
            'vendedor_id' => $vendedor->id,
            'status_id' => $status->id,
        ];

        // Usando a rota de criação de leads (supondo que a rota exista)
        $response = $this->post(route('auth.lead.create'), $leadData);

        // Verificar se a resposta foi 201 (Criado)
//        $response->assertStatus(201);

        // Verificar se o lead foi criado no banco de dados
        $this->assertDatabaseHas('leads', [
            'cnpj' => '12345678000195',
            'cpf' => '41121896804',
            'vendedor_id' => $vendedor->id,
            'status_id' => $status->id,
        ]);
    }
}
