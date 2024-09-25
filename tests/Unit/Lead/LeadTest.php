<?php

namespace Tests\Unit\Lead;

use App\Models\Lead\Lead;
use App\Models\Lead\LeadStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;

class LeadTest extends TestCase
{
    use RefreshDatabase;

    public function test_criar_lead_com_cnpj_e_status()
    {
        // Etapa 1: Criação do vendedor (usuário)
//        $vendedor = User::factory()->create();

//        // Etapa 2: Criação de uma coluna no Kanban
//        $status = LeadStatus::factory()->create([
//            'nome' => 'Novo Lead',
//            'ordem' => 1,
//            'prazo_maximo_em_dias' => 10,
//        ]);
//
//        // Etapa 3: Testar o cadastro do lead com CNPJ
//        $leadData = [
//            'cnpj' => '12345678000195',
//            'cpf' => '41121896804',
//            'vendedor_id' => $vendedor->id,
//            'status_id' => $status->id,
//        ];
//
//        // Usando a rota de criação de leads (supondo que a rota exista)
//        $response = $this->post(route('auth.lead.create'), $leadData);
//
//        // Verificar se a resposta foi 201 (Criado)
//        $response->assertStatus(201);
//
//        // Verificar se o lead foi criado no banco de dados
//        $this->assertDatabaseHas('leads', [
//            'cnpj' => '12345678000195',
//            'cpf' => '41121896804',
//            'vendedor_id' => $vendedor->id,
//            'status_id' => $status->id,
//        ]);
    }

//    public function test_mover_lead_para_proxima_coluna()
//    {
//        // Etapa 1: Criação do vendedor
//        $vendedor = User::factory()->create();
//
//        // Etapa 2: Criação das colunas no Kanban
//        $colunaInicial = LeadStatus::factory()->create([
//            'nome' => 'Novo Lead',
//            'ordem' => 1,
//            'prazo_maximo_em_dias' => 10,
//        ]);
//
//        $colunaDestino = LeadStatus::factory()->create([
//            'nome' => 'Contato Realizado',
//            'ordem' => 2,
//            'prazo_maximo_em_dias' => 5,
//        ]);
//
//        // Etapa 3: Criação de um lead
//        $lead = Lead::factory()->create([
//            'nome' => 'Empresa Teste',
//            'cnpj_cpf' => '12345678000195',
//            'coluna_atual_id' => $colunaInicial->id,
//            'vendedor_id' => $vendedor->id,
//        ]);
//
//        // Etapa 4: Mover o lead para a próxima coluna
//        $response = $this->patch("/api/leads/{$lead->id}/move", [
//            'coluna_destino_id' => $colunaDestino->id,
//        ]);
//
//        // Verificar se a resposta foi 200 (OK)
//        $response->assertStatus(200);
//
//        // Verificar se a coluna do lead foi atualizada no banco de dados
//        $this->assertDatabaseHas('leads', [
//            'id' => $lead->id,
//            'coluna_atual_id' => $colunaDestino->id,
//        ]);
//    }
}
