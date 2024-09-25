<?php

namespace Database\Factories\Lead;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead\LeadStatus>
 */
class LeadStatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->word,
            'cor' => 'red',
            'ordem' => $this->faker->numberBetween(1, 10),
            'prazo_dias' => $this->faker->numberBetween(1, 10),
        ];
    }
}
