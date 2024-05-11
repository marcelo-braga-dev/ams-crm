<?php

namespace App\src\Chamados\Status;

interface ChamadosStatus
{
    function getStatus(): string;
    function getNomeStatus(): string;
    function getPrazo(): int;
}
