<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AccreditationStatusRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AccreditationStatusRepository::class)]
#[ApiResource]
class AccreditationStatus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'accreditationStatus', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Accreditation $acreditation = null;

    #[ORM\Column(length: 45)]
    private ?string $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAcreditation(): ?Accreditation
    {
        return $this->acreditation;
    }

    public function setAcreditation(Accreditation $acreditation): static
    {
        $this->acreditation = $acreditation;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }
}
